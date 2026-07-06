import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string | null;
  created_at: string;
}

export default function UserAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("id, title, content, priority, created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch {
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayContent = (content: string) => {
    return content.replace(/\n\[Audience:.*\]$/, "").trim();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">Stay updated with gym news</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground rounded-xl bg-card border border-border">
            No announcements at the moment.
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                      {announcement.priority || "General"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 whitespace-pre-wrap">
                    {getDisplayContent(announcement.content)}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
