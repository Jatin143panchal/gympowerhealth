import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Bell, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string | null;
  is_active: boolean | null;
  created_at: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    sentTo: "All Members",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load announcements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("announcements").insert({
        title: formData.title,
        content: formData.content + (formData.sentTo ? `\n\n[Audience: ${formData.sentTo}]` : ""),
        priority: "normal",
        is_active: true,
        created_by: user?.id ?? null,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Announcement created successfully" });
      setFormData({ title: "", content: "", sentTo: "All Members" });
      setIsAddDialogOpen(false);
      fetchAnnouncements();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create announcement",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (announcement: Announcement) => {
    try {
      const { error } = await supabase
        .from("announcements")
        .update({ is_active: !announcement.is_active })
        .eq("id", announcement.id);

      if (error) throw error;
      fetchAnnouncements();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Create and manage gym announcements</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your announcement..."
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label>Send To</Label>
                <select
                  value={formData.sentTo}
                  onChange={(e) => setFormData({ ...formData, sentTo: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3"
                >
                  <option value="All Members">All Members</option>
                  <option value="Basic">Basic Members</option>
                  <option value="Premium">Premium Members</option>
                  <option value="Elite">Elite Members</option>
                  <option value="Premium, Elite">Premium & Elite</option>
                </select>
              </div>
              <Button onClick={handleCreateAnnouncement} variant="hero" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground rounded-xl bg-card border border-border">
            No announcements yet. Create your first announcement above.
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{announcement.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 whitespace-pre-wrap">
                      {announcement.content.replace(/\n\[Audience:.*\]$/, "").trim()}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          announcement.is_active ? "bg-green-500/10 text-green-500" : "bg-secondary"
                        }`}
                      >
                        {announcement.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleActive(announcement)}
                >
                  {announcement.is_active ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
