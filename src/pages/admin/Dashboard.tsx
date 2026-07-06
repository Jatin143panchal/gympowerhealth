import { Users, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getMembershipPrice } from "@/lib/membership";

interface Member {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  membership_type: string;
  status: string;
  membership_expiry: string;
}

const defaultStats = [
  { title: "Total Members", value: "0", change: "+0%", icon: Users, positive: true },
  { title: "Total Revenue", value: "₹0", change: "From active members", icon: DollarSign, positive: true },
  { title: "Active Members", value: "0", change: "+0%", icon: TrendingUp, positive: true },
  { title: "Expiring Soon", value: "0", change: "Next 7 days", icon: Calendar, positive: false },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(defaultStats);
  const [recentMembers, setRecentMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: members, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const allMembers = members || [];
      const activeMembers = allMembers.filter(m => m.status === "active");
      const totalRevenue = activeMembers.reduce((sum, m) => sum + getMembershipPrice(m.membership_type), 0);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expiringSoon = allMembers.filter(m => {
        const expiry = new Date(m.membership_expiry);
        return expiry >= today && expiry <= nextWeek;
      });

      setStats([
        { ...defaultStats[0], value: allMembers.length.toString() },
        { ...defaultStats[1], value: `₹${totalRevenue.toLocaleString("en-IN")}` },
        { ...defaultStats[2], value: activeMembers.length.toString() },
        { ...defaultStats[3], value: expiringSoon.length.toString() },
      ]);

      setRecentMembers(allMembers.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Power Health Gym - Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-6 rounded-xl bg-black border border-green-500/20 hover:border-green-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-green-400" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.positive ? "text-green-400" : "text-gray-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm text-gray-400 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Members */}
      <div className="rounded-xl bg-black border border-green-500/20 overflow-hidden">
        <div className="p-6 border-b border-green-500/20">
          <h2 className="text-xl font-bold text-white">Recent Members</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-500/5">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-green-400">Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-green-400">Contact</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-green-400">Plan</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-green-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMembers.map((member) => (
                <tr key={member.id} className="border-b border-green-500/10 last:border-0">
                  <td className="px-6 py-4 font-medium text-white">{member.name}</td>
                  <td className="px-6 py-4 text-gray-400">{member.email || member.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                      {member.membership_type || "3 Months"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentMembers.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-400">
              No members yet. Add members from the Members page.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
