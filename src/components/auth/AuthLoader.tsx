/** Minimal auth loading - no full-screen flash */
export default function AuthLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-green-500/60 border-t-green-400 rounded-full animate-spin" />
    </div>
  );
}
