import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Calendar, CreditCard } from "lucide-react";

// Example: user info fetch from API or Auth context
// replace this with your actual auth/user context
const fetchUserProfile = () => {
  return {
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1995-08-20",
    emergencyContact: "+91 91234 56789",
    membership: {
      plan: "Gold",
      startDate: "March 1, 2026",
      expiryDate: "Feb 28, 2027",
      status: "Active",
    },
  };
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // fetch user data from API or context
    const userData = fetchUserProfile();
    setProfile(userData);
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  const handleSave = () => {
    console.log("Profile saved:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-6 p-6 rounded-xl bg-card border border-border">
        <div className="w-20 h-20 rounded-full gym-gradient-bg flex items-center justify-center text-3xl font-bold text-primary-foreground">
          {profile.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">{profile.name}</h2>
          <p className="text-muted-foreground">{profile.membership.plan} Member</p>
        </div>
      </div>

      {/* Membership Card */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Membership Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-medium">{profile.membership.plan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
              {profile.membership.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-medium">{profile.membership.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expiry Date</p>
            <p className="font-medium">{profile.membership.expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </h2>
        
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date of Birth
          </Label>
          <Input
            type="date"
            value={profile.dateOfBirth}
            onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Emergency Contact
          </Label>
          <Input
            value={profile.emergencyContact}
            onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
          />
        </div>

        <Button variant="hero" onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
