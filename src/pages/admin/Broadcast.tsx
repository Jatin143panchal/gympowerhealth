import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Send, FileSpreadsheet, Users, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { normalizeMembershipType } from "@/lib/membership";

const BATCH_SIZE = 30;
const BROADCAST_FROM_NUMBER = "+91 9217640317";
const MESSAGE_TEMPLATES = {
  expiry: "Hello {Name}, your Gym Power Health membership expires on {Expiry Date}. Renew now to continue enjoying our premium facilities!",
  custom: "",
} as const;
type ResultItem = { phone: string; success: boolean; error?: string };

interface UploadedContact {
  name: string;
  phone: string;
  membership: string;
  expiryDate: string;
}

export default function BroadcastPage() {
  const [uploadedContacts, setUploadedContacts] = useState<UploadedContact[]>([]);
  const [messageType, setMessageType] = useState<"expiry" | "custom">("expiry");
  const [message, setMessage] = useState(MESSAGE_TEMPLATES.expiry);
  const [customMessage, setCustomMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [sendProgress, setSendProgress] = useState<{ current: number; total: number; batchIndex: number } | null>(null);
  const [useDbMembers, setUseDbMembers] = useState(false);
  const [dbMembers, setDbMembers] = useState<UploadedContact[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (useDbMembers) {
      fetchMembersFromDb();
    }
  }, [useDbMembers]);

  const fetchMembersFromDb = async () => {
    try {
      const { data, error } = await supabase
        .from("members")
        .select("name, phone, membership_type, membership_expiry")
        .eq("status", "active");

      if (error) throw error;

      const contacts: UploadedContact[] = (data || []).map((m) => ({
        name: m.name,
        phone: m.phone,
        membership: normalizeMembershipType(m.membership_type),
        expiryDate: m.membership_expiry,
      }));

      setDbMembers(contacts);
      setUploadedContacts(contacts);
      setResults([]);
      toast({
        title: "Members Loaded",
        description: `${contacts.length} active members loaded from database.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load members from database",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUseDbMembers(false);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter((line) => line.trim());

      if (lines.length < 2) {
        toast({
          title: "Invalid File",
          description: "File must have headers and at least one data row.",
          variant: "destructive",
        });
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
      const nameIdx = headers.findIndex((h) => h.includes('name'));
      const phoneIdx = headers.findIndex((h) => h.includes('phone'));
      const membershipIdx = headers.findIndex((h) => h.includes('membership'));
      const expiryIdx = headers.findIndex((h) => h.includes('expir') || h.includes('date'));

      if (phoneIdx === -1) {
        toast({
          title: "Missing Phone Column",
          description: "File must have a phone number column.",
          variant: "destructive",
        });
        return;
      }

      const contacts: UploadedContact[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim());
        if (values[phoneIdx]) {
          contacts.push({
            name: nameIdx >= 0 ? values[nameIdx] || "Unknown" : "Unknown",
            phone: values[phoneIdx],
            membership: normalizeMembershipType(membershipIdx >= 0 ? values[membershipIdx] : "3 Months"),
            expiryDate: expiryIdx >= 0 ? values[expiryIdx] || "N/A" : "N/A",
          });
        }
      }

      setUploadedContacts(contacts);
      setResults([]);
      toast({
        title: "File Loaded",
        description: `${contacts.length} contacts imported successfully.`,
      });
    };

    reader.readAsText(file);
  };

  const handleSendBroadcast = async () => {
    if (uploadedContacts.length === 0) {
      toast({
        title: "No Contacts",
        description: "Please upload a contact list or load members from database first.",
        variant: "destructive",
      });
      return;
    }
    const textToSend = messageType === "custom" ? customMessage : message;
    if (!textToSend.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter or select a message to send.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    setResults([]);

    const allMessages = uploadedContacts.map((contact) => ({
      to: contact.phone,
      message: textToSend
        .replace(/\{Name\}/g, contact.name)
        .replace(/\{Expiry Date\}/g, contact.expiryDate),
      name: contact.name,
    }));

    const batches: typeof allMessages[] = [];
    for (let i = 0; i < allMessages.length; i += BATCH_SIZE) {
      batches.push(allMessages.slice(i, i + BATCH_SIZE));
    }

    const totalBatches = batches.length;
    let allResults: ResultItem[] = [];
    let totalSent = 0;
    let totalFailed = 0;

    const { data: { user } } = await supabase.auth.getUser();
    const { data: broadcastRow } = await supabase
.from("broadcast_messages")
        .insert({
          message_template: textToSend,
        recipients_count: uploadedContacts.length,
        status: "sending",
        sent_by: user?.id ?? null,
      })
      .select("id")
      .single();

    try {
      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        setSendProgress({ current: batchIndex + 1, total: totalBatches, batchIndex });

        const { data, error } = await supabase.functions.invoke("send-whatsapp", {
          body: { messages: batch },
        });

        const batchResults: ResultItem[] = error
          ? batch.map((m) => ({ phone: m.to, success: false, error: error.message }))
          : (data?.results ?? []);
        allResults = [...allResults, ...batchResults];
        setResults(allResults);

        totalSent += batchResults.filter((r) => r.success).length;
        totalFailed += batchResults.filter((r) => !r.success).length;
      }

      if (broadcastRow?.id) {
        await supabase
          .from("broadcast_messages")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", broadcastRow.id);
      }

      toast({
        title: "Broadcast Complete",
        description: `Sent: ${totalSent}, Failed: ${totalFailed}`,
      });
    } catch (error) {
      console.error("Broadcast error:", error);
      if (broadcastRow?.id) {
        await supabase
          .from("broadcast_messages")
          .update({ status: "failed", sent_at: new Date().toISOString() })
          .eq("id", broadcastRow.id);
      }
      toast({
        title: "Broadcast Failed",
        description:
          error instanceof Error ? error.message : "Failed to send messages. Ensure WhatsApp credentials are set in Supabase.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
      setSendProgress(null);
    }
  };

  const activeMessage = messageType === "custom" ? customMessage : message;
  const previewMessage = (contact: UploadedContact) => {
    return activeMessage
      .replace(/\{Name\}/g, contact.name)
      .replace(/\{Expiry Date\}/g, contact.expiryDate);
  };

  const contactsToShow = uploadedContacts;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="font-display text-3xl font-bold">Broadcast Messages</h1>
        <p className="text-muted-foreground">Send bulk messages to members via WhatsApp</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload / Load Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              Load Recipients
            </h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setUseDbMembers(true);
                  fetchMembersFromDb();
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Load from Members Database
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or upload CSV</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload CSV with columns: Name, Phone, Membership, Expiry Date
              </p>
              <motion.label
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </span>
              </motion.label>
            </div>

            <AnimatePresence>
              {contactsToShow.length > 0 && (
                <motion.div
                  className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="text-green-500 font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {contactsToShow.length} contacts loaded
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contacts Preview */}
          <AnimatePresence>
            {contactsToShow.length > 0 && (
              <motion.div
                className="p-6 rounded-xl bg-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="font-semibold mb-4">Uploaded Contacts</h2>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {contactsToShow.slice(0, 20).map((contact, index) => {
                    const result = results.find((r) => r.phone === contact.phone);
                    return (
                      <motion.div
                        key={index}
                        className="p-3 rounded-lg bg-secondary flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <p className="text-sm text-primary">{contact.membership}</p>
                            <p className="text-xs text-muted-foreground">
                              Expires: {contact.expiryDate}
                            </p>
                          </div>
                          {result &&
                            (result.success ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-destructive" />
                            ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {contactsToShow.length > 20 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    +{contactsToShow.length - 20} more
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message Composer */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Compose Message
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Message type</Label>
                <select
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value as "expiry" | "custom")}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm mt-1"
                >
                  <option value="expiry">Expiry reminder (with Name & Expiry Date)</option>
                  <option value="custom">Custom message</option>
                </select>
              </div>
              {messageType === "expiry" ? (
                <div>
                  <Label>Template</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Use {"{Name}"} and {"{Expiry Date}"} as placeholders
                  </p>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-32"
                    placeholder="Type your message..."
                  />
                </div>
              ) : (
                <div>
                  <Label>Custom message</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Optional: use {"{Name}"} and {"{Expiry Date}"} for personalisation
                  </p>
                  <Textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-32"
                    placeholder="Type your custom broadcast message..."
                  />
                </div>
              )}

              <AnimatePresence>
                {contactsToShow.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label>Message Preview</Label>
                    <div className="p-4 rounded-lg bg-secondary mt-2">
                      <p className="text-sm">{previewMessage(contactsToShow[0])}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleSendBroadcast}
                  disabled={contactsToShow.length === 0 || sending}
                >
                  {sending ? (
                    <motion.span
                      className="flex items-center justify-center gap-2"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      {sendProgress
                        ? `Sending batch ${sendProgress.current}/${sendProgress.total}...`
                        : "Sending Messages..."}
                    </motion.span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send to {contactsToShow.length} Contacts via WhatsApp
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="p-4 rounded-xl bg-primary/10 border border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-primary font-medium">
              All broadcast messages are sent from: {BROADCAST_FROM_NUMBER}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID in Supabase Edge Function secrets for this number.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
