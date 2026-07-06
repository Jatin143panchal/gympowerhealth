import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl text-white font-bold mb-4">Password Reset Successful!</h1>
        <p className="text-gray-400 mb-6">You can now log in with your new password.</p>
        <Button onClick={() => navigate("/login")} className="bg-green-500 text-black hover:bg-green-600">Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-white">Set New Password</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="h-12 bg-black border-green-500/30 text-white"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-12 bg-black border-green-500/30 text-white"
          />
          <Button type="submit" className="w-full bg-green-500 text-black hover:bg-green-600" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        <Link to="/login" className="text-gray-400 hover:text-green-400 mt-4 inline-block">Back to Login</Link>
      </div>
    </div>
  );
}
