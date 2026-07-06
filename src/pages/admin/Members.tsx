 import { useState, useEffect, useCallback } from "react";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog";
 import { Label } from "@/components/ui/label";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Plus, Search, Pencil, Trash2, Upload, Loader2 } from "lucide-react";
import { MEMBERSHIP_TYPES, normalizeMembershipType, getMembershipPrice, formatPrice } from "@/lib/membership";

const PHONE_REGEX = /^\+?[\d\s-]{10,15}$/;
function normalizePhone(value: string): string {
  return value.replace(/\s+/g, "").replace(/^0+/, "").trim();
}
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && PHONE_REGEX.test(phone);
}

interface Member {
   id: string;
   name: string;
   email: string | null;
   phone: string;
   membership_type: string;
   membership_expiry: string;
   status: string;
 }
 
 export default function MembersPage() {
   const [members, setMembers] = useState<Member[]>([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [editingMember, setEditingMember] = useState<Member | null>(null);
   const [loading, setLoading] = useState(true);
   const { toast } = useToast();
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     membership_type: "3 Months",
     membership_expiry: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formError, setFormError] = useState<{ name?: string; phone?: string; expiry?: string }>({});

   const fetchMembers = useCallback(async () => {
     try {
       const { data, error } = await supabase
         .from("members")
         .select("*")
         .order("created_at", { ascending: false });
       if (error) throw error;
       setMembers(data || []);
     } catch (error) {
       console.error("Error fetching members:", error);
       toast({ title: "Error", description: "Failed to load members", variant: "destructive" });
     } finally {
       setLoading(false);
     }
   }, []);

   useEffect(() => {
     fetchMembers();
   }, [fetchMembers]);

   // Real-time: sync members list on INSERT/UPDATE/DELETE
   useEffect(() => {
     const channel = supabase
       .channel("members-realtime")
       .on(
         "postgres_changes",
         { event: "*", schema: "public", table: "members" },
         () => {
           fetchMembers();
         }
       )
       .subscribe();
     return () => {
       supabase.removeChannel(channel);
     };
   }, [fetchMembers]);
 
   const filteredMembers = members.filter(
     (member) =>
       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (member.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
       member.phone.includes(searchQuery)
   );
 
   const validateAddForm = (): boolean => {
     const err: { name?: string; phone?: string; expiry?: string } = {};
     if (!formData.name.trim()) err.name = "Name is required";
     if (!formData.phone.trim()) err.phone = "Phone is required";
     else if (!isValidPhone(formData.phone)) err.phone = "Enter a valid 10+ digit phone number";
     if (!formData.membership_expiry) err.expiry = "Expiry date is required";
     setFormError(err);
     return Object.keys(err).length === 0;
   };

   const handleAddMember = async () => {
     setFormError({});
     if (!validateAddForm()) return;
     setIsSubmitting(true);
     try {
       const phone = normalizePhone(formData.phone);
       const { error } = await supabase.from("members").insert({
         name: formData.name.trim(),
         email: formData.email?.trim() || null,
         phone,
         membership_type: normalizeMembershipType(formData.membership_type),
         membership_start: new Date().toISOString().split("T")[0],
         membership_expiry: formData.membership_expiry,
         status: "active",
       });
       if (error) throw error;
       toast({ title: "Success", description: "Member added successfully" });
       setFormData({ name: "", email: "", phone: "", membership_type: "3 Months", membership_expiry: "" });
       setIsAddDialogOpen(false);
       fetchMembers();
     } catch (error: unknown) {
       const msg = error instanceof Error ? error.message : "Failed to add member";
       toast({ title: "Error", description: msg, variant: "destructive" });
     } finally {
       setIsSubmitting(false);
     }
   };
 
   const handleEditMember = async () => {
     if (!editingMember) return;
     try {
       const { error } = await supabase
         .from("members")
         .update({
           name: formData.name,
           email: formData.email || null,
           phone: formData.phone,
           membership_type: normalizeMembershipType(formData.membership_type),
           membership_expiry: formData.membership_expiry,
         })
         .eq("id", editingMember.id);
 
       if (error) throw error;
 
       toast({ title: "Success", description: "Member updated successfully" });
       setEditingMember(null);
       setFormData({ name: "", email: "", phone: "", membership_type: "3 Months", membership_expiry: "" });
       fetchMembers();
     } catch (error: any) {
       toast({ title: "Error", description: error.message, variant: "destructive" });
     }
   };
 
   const handleDeleteMember = async (id: string) => {
     try {
       const { error } = await supabase.from("members").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "Success", description: "Member deleted" });
       fetchMembers();
     } catch (error: any) {
       toast({ title: "Error", description: error.message, variant: "destructive" });
     }
   };
 
  const openEditDialog = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email || "",
      phone: member.phone,
      membership_type: normalizeMembershipType(member.membership_type),
      membership_expiry: member.membership_expiry,
    });
  };
 
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        toast({ title: "Invalid File", description: "File must have headers and at least one data row.", variant: "destructive" });
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const nameIdx = headers.findIndex(h => h.includes('name'));
      const phoneIdx = headers.findIndex(h => h.includes('phone'));
      const membershipIdx = headers.findIndex(h => h.includes('membership'));
      const expiryIdx = headers.findIndex(h => h.includes('expir') || h.includes('date'));
      const emailIdx = headers.findIndex(h => h.includes('email'));

      if (phoneIdx === -1 || nameIdx === -1) {
        toast({ title: "Missing Columns", description: "File must have Name and Phone columns.", variant: "destructive" });
        return;
      }

      let importedCount = 0;
      let failedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (!values[phoneIdx] || !values[nameIdx]) continue;

        try {
          const expiryDate = expiryIdx >= 0 && values[expiryIdx] ? values[expiryIdx] : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          const { error } = await supabase.from("members").insert({
            name: values[nameIdx],
            phone: values[phoneIdx],
            email: emailIdx >= 0 ? values[emailIdx] || null : null,
            membership_type: normalizeMembershipType(membershipIdx >= 0 ? values[membershipIdx] : "3 Months"),
            membership_start: new Date().toISOString().split('T')[0],
            membership_expiry: expiryDate,
            status: "active",
          });
          if (error) { failedCount++; } else { importedCount++; }
        } catch { failedCount++; }
      }

      toast({
        title: "Import Complete",
        description: `Imported: ${importedCount}, Failed: ${failedCount}`,
      });
      fetchMembers();
    };
    reader.readAsText(file);
  };
 
   return (
     <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between gap-4">
         <div>
           <h1 className="font-display text-3xl font-bold">Members</h1>
           <p className="text-muted-foreground">Manage your gym members</p>
         </div>
         <div className="flex gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 border border-green-500/40 text-green-400 bg-black hover:bg-green-500/10 cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                Import Excel
              </div>
            </label>
           <Dialog
             open={isAddDialogOpen}
             onOpenChange={(open) => {
               setIsAddDialogOpen(open);
               if (!open) {
                 setFormError({});
                 setFormData({ name: "", email: "", phone: "", membership_type: "3 Months", membership_expiry: "" });
               }
             }}
           >
             <DialogTrigger asChild>
               <Button variant="hero">
                 <Plus className="w-4 h-4 mr-2" />
                 Add Member
               </Button>
             </DialogTrigger>
             <DialogContent>
               <DialogHeader>
                 <DialogTitle>Add New Member</DialogTitle>
               </DialogHeader>
               <div className="space-y-4 pt-4">
                 <div className="space-y-2">
                   <Label>Full Name</Label>
                   <Input
                     value={formData.name}
                     onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormError((prev) => ({ ...prev, name: undefined })); }}
                     placeholder="John Doe"
                     className={formError.name ? "border-destructive" : ""}
                   />
                   {formError.name && <p className="text-sm text-destructive">{formError.name}</p>}
                 </div>
                 <div className="space-y-2">
                   <Label>Email (optional)</Label>
                   <Input
                     type="email"
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     placeholder="john@example.com"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label>Phone Number</Label>
                   <Input
                     value={formData.phone}
                     onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFormError((prev) => ({ ...prev, phone: undefined })); }}
                     placeholder="+91 92174 41307"
                     className={formError.phone ? "border-destructive" : ""}
                   />
                   {formError.phone && <p className="text-sm text-destructive">{formError.phone}</p>}
                 </div>
                 <div className="space-y-2">
                   <Label>Membership Type</Label>
                   <Select
                     value={normalizeMembershipType(formData.membership_type)}
                     onValueChange={(value) => setFormData({ ...formData, membership_type: value })}
                   >
                     <SelectTrigger>
                       <SelectValue placeholder="Select plan" />
                     </SelectTrigger>
                     <SelectContent>
                       {MEMBERSHIP_TYPES.map((t) => (
                         <SelectItem key={t} value={t}>{t} (₹{getMembershipPrice(t).toLocaleString("en-IN")})</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label>Expiry Date</Label>
                   <Input
                     type="date"
                     value={formData.membership_expiry}
                     onChange={(e) => { setFormData({ ...formData, membership_expiry: e.target.value }); setFormError((prev) => ({ ...prev, expiry: undefined })); }}
                     className={formError.expiry ? "border-destructive" : ""}
                   />
                   {formError.expiry && <p className="text-sm text-destructive">{formError.expiry}</p>}
                 </div>
                 <Button onClick={handleAddMember} variant="hero" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...</> : "Add Member"}
                 </Button>
               </div>
             </DialogContent>
           </Dialog>
         </div>
       </div>
 
       {/* Search */}
       <div className="relative max-w-md">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
         <Input
           placeholder="Search members..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="pl-10"
         />
       </div>
 
       {/* Members Table */}
       <div className="rounded-xl bg-card border border-border overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-secondary">
               <tr>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Name</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Phone</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Email</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Plan</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Price</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Expiry</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Status</th>
                 <th className="text-left px-6 py-3 text-sm font-semibold">Actions</th>
               </tr>
             </thead>
             <tbody>
               {filteredMembers.map((member) => (
                 <tr key={member.id} className="border-b border-border last:border-0">
                   <td className="px-6 py-4 font-medium">{member.name}</td>
                   <td className="px-6 py-4 text-muted-foreground">{member.phone}</td>
                   <td className="px-6 py-4 text-muted-foreground">{member.email || "-"}</td>
                   <td className="px-6 py-4">
                     <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                       {normalizeMembershipType(member.membership_type)}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-muted-foreground">{formatPrice(getMembershipPrice(member.membership_type))}</td>
                   <td className="px-6 py-4 text-muted-foreground">{member.membership_expiry}</td>
                   <td className="px-6 py-4">
                     <span
                       className={`px-2 py-1 rounded-full text-xs font-medium ${
                         member.status === "active"
                           ? "bg-green-500/10 text-green-500"
                           : member.status === "expiring"
                           ? "bg-yellow-500/10 text-yellow-500"
                           : "bg-red-500/10 text-red-500"
                       }`}
                     >
                       {member.status}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex gap-2">
                       <Dialog open={editingMember?.id === member.id} onOpenChange={(open) => !open && setEditingMember(null)}>
                         <DialogTrigger asChild>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => openEditDialog(member)}
                           >
                             <Pencil className="w-4 h-4" />
                           </Button>
                         </DialogTrigger>
                         <DialogContent>
                           <DialogHeader>
                             <DialogTitle>Edit Member</DialogTitle>
                           </DialogHeader>
                           <div className="space-y-4 pt-4">
                             <div className="space-y-2">
                               <Label>Full Name</Label>
                               <Input
                                 value={formData.name}
                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                               />
                             </div>
                             <div className="space-y-2">
                               <Label>Email</Label>
                               <Input
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                               />
                             </div>
                             <div className="space-y-2">
                               <Label>Phone Number</Label>
                               <Input
                                 value={formData.phone}
                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                               />
                             </div>
                             <div className="space-y-2">
                               <Label>Membership Type</Label>
                               <Select
                                 value={normalizeMembershipType(formData.membership_type)}
                                 onValueChange={(value) => setFormData({ ...formData, membership_type: value })}
                               >
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select plan" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   {MEMBERSHIP_TYPES.map((t) => (
                                     <SelectItem key={t} value={t}>{t} (₹{getMembershipPrice(t).toLocaleString("en-IN")})</SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                             </div>
                             <div className="space-y-2">
                               <Label>Expiry Date</Label>
                               <Input
                                 type="date"
                                 value={formData.membership_expiry}
                                 onChange={(e) => setFormData({ ...formData, membership_expiry: e.target.value })}
                               />
                             </div>
                             <Button onClick={handleEditMember} variant="hero" className="w-full">
                               Save Changes
                             </Button>
                           </div>
                         </DialogContent>
                       </Dialog>
                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={() => handleDeleteMember(member.id)}
                         className="text-destructive hover:text-destructive"
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
           {filteredMembers.length === 0 && !loading && (
             <div className="p-8 text-center text-muted-foreground">
               No members found. Add your first member above.
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }