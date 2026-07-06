import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GymSettings {
  id: string;
  gym_name: string;
  email: string;
  phone: string;
  address: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  auto_reminder_days: number;
}

const defaultSettings: GymSettings = {
  id: "",
  gym_name: "Power Health Gym & Wellness",
  email: "gympowerhealthinfo@gmail.com",
  phone: "+91 92174 41307",
  address: "10-11 Floor, Opposite City Plaza, Gaur City 1, Greater Noida West",
  email_notifications: true,
  sms_notifications: true,
  auto_reminder_days: 7,
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<GymSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("gym_settings")
        .select("*")
        .limit(1)
        .single();

      if (!error && data) {
        setSettings({
          id: data.id,
          gym_name: data.gym_name || defaultSettings.gym_name,
          email: data.email || "gympowerhealthinfo@gmail.com",
          phone: data.phone || defaultSettings.phone,
          address: data.address || defaultSettings.address,
          email_notifications: data.email_notifications ?? true,
          sms_notifications: data.sms_notifications ?? true,
          auto_reminder_days: data.auto_reminder_days ?? 7,
        });
      }
    } catch {
      // Use defaults if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settings.id) {
        const { error } = await supabase
          .from("gym_settings")
          .update({
            gym_name: settings.gym_name,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            email_notifications: settings.email_notifications,
            sms_notifications: settings.sms_notifications,
            auto_reminder_days: settings.auto_reminder_days,
            updated_at: new Date().toISOString(),
          })
          .eq("id", settings.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("gym_settings")
          .insert({
            gym_name: settings.gym_name,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            email_notifications: settings.email_notifications,
            sms_notifications: settings.sms_notifications,
            auto_reminder_days: settings.auto_reminder_days,
          })
          .select("id")
          .single();

        if (error) throw error;
        if (data?.id) setSettings((s) => ({ ...s, id: data.id }));
      }

      toast({ title: "Settings Saved", description: "Your settings have been updated." });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your gym settings</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="p-6 rounded-xl bg-black border border-green-500/20 space-y-4">
          <h2 className="font-semibold text-lg text-green-400">General Information</h2>
          
          <div className="space-y-2">
            <Label className="text-gray-300">Gym Name</Label>
            <Input
              value={settings.gym_name}
              onChange={(e) => setSettings({ ...settings, gym_name: e.target.value })}
              className="bg-black border-green-500/30 text-white focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Admin Email</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="bg-black border-green-500/30 text-white focus:border-green-400"
              placeholder="gympowerhealthinfo@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Phone</Label>
            <Input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="bg-black border-green-500/30 text-white focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Address</Label>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="bg-black border-green-500/30 text-white focus:border-green-400"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-6 rounded-xl bg-black border border-green-500/20 space-y-4">
          <h2 className="font-semibold text-lg text-green-400">Notifications</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Email Notifications</p>
              <p className="text-sm text-gray-400">Send email reminders for membership expiry</p>
            </div>
            <Switch
              checked={settings.email_notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, email_notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">SMS Notifications</p>
              <p className="text-sm text-gray-400">Send SMS reminders for membership expiry</p>
            </div>
            <Switch
              checked={settings.sms_notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, sms_notifications: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Auto-Reminder Days Before Expiry</Label>
            <Input
              type="number"
              value={settings.auto_reminder_days}
              onChange={(e) => setSettings({ ...settings, auto_reminder_days: parseInt(e.target.value) || 7 })}
              min={1}
              max={30}
              className="bg-black border-green-500/30 text-white focus:border-green-400"
            />
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-green-500 text-black hover:bg-green-600 font-bold shadow-[0_0_25px_rgba(34,197,94,0.5)]"
        >
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
