import { Calendar, Clock, CreditCard, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function UserDashboard() {
  const { user } = useAuth();
  const [memberData, setMemberData] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchAnnouncements();
    }
  }, [user]);

  const fetchUserData = async () => {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", user!.id)
      .single();
    if (data) setMemberData(data);
  };

  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(3);
    if (data) setAnnouncements(data);
  };

  const userName = user?.user_metadata?.full_name || "Member";
  const daysRemaining = memberData 
    ? Math.max(0, Math.ceil((new Date(memberData.membership_expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const upcomingWorkouts = [
    { day: "Monday", workout: "Chest & Triceps", time: "6:00 AM" },
    { day: "Tuesday", workout: "Back & Biceps", time: "6:00 AM" },
    { day: "Wednesday", workout: "Rest Day", time: "-" },
    { day: "Thursday", workout: "Legs & Core", time: "6:00 AM" },
    { day: "Friday", workout: "Shoulders & Arms", time: "6:00 AM" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="text-green-400">{userName}</span>
        </h1>
        <p className="text-gray-400">Here's your fitness overview</p>
      </div>

      {/* Membership Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-green-600 to-green-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-80">Membership Status</p>
          <h2 className="text-2xl font-bold mt-1">{memberData?.membership_type || "No Active Plan"}</h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm opacity-80">Expires On</p>
              <p className="font-semibold">{memberData?.membership_expiry || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Days Remaining</p>
              <p className="font-semibold">{daysRemaining} days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: "Member Since", value: memberData?.membership_start || "N/A" },
          { icon: Target, label: "This Week", value: "4 Workouts" },
          { icon: Clock, label: "Avg Session", value: "1.5 hrs" },
          { icon: CreditCard, label: "Plan", value: memberData?.membership_type || "N/A" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-black border border-green-500/20">
            <stat.icon className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Workouts */}
        <div className="p-6 rounded-xl bg-black border border-green-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">This Week's Plan</h2>
            <Link to="/dashboard/workouts">
              <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingWorkouts.map((workout) => (
              <div
                key={workout.day}
                className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/10"
              >
                <div>
                  <p className="font-medium text-white">{workout.day}</p>
                  <p className="text-sm text-gray-400">{workout.workout}</p>
                </div>
                <span className="text-sm text-green-400">{workout.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="p-6 rounded-xl bg-black border border-green-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Announcements</h2>
            <Link to="/dashboard/announcements">
              <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {announcements.length > 0 ? announcements.map((a) => (
              <div key={a.id} className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{a.title}</h3>
                  <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-400">{a.content}</p>
              </div>
            )) : (
              <p className="text-gray-400 text-sm">No announcements at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
