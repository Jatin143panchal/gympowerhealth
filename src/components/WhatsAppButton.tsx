import { MessageCircle } from "lucide-react";

/** Primary business number – broadcast messages go from this; chat button opens this */
export const WHATSAPP_PRIMARY_NUMBER = "919217451307";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_PRIMARY_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-all hover:scale-110"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-black" />
    </a>
  );
}
