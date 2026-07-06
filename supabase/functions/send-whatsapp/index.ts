import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface WhatsAppMessage {
  to: string;
  message: string;
  name?: string;
}

interface RequestBody {
  messages: WhatsAppMessage[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const WHATSAPP_ACCESS_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');

    if (!WHATSAPP_ACCESS_TOKEN) {
      throw new Error('WHATSAPP_ACCESS_TOKEN is not configured');
    }

    if (!WHATSAPP_PHONE_NUMBER_ID) {
      throw new Error('WHATSAPP_PHONE_NUMBER_ID is not configured');
    }

    const { messages }: RequestBody = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('No messages provided');
    }

    // Meta API expects "to" as digits only (no +), with country code e.g. 919876543210
    function normalizePhoneForWhatsApp(input: string): string {
      const digits = input.replace(/\D/g, '');
      if (digits.length >= 12) return digits; // already has country code
      if (digits.length === 10 && /^[6-9]/.test(digits)) return '91' + digits; // Indian 10-digit
      if (digits.length === 11 && digits.startsWith('0')) return '91' + digits.slice(1);
      return digits.startsWith('91') ? digits : '91' + digits;
    }

    const results: { phone: string; success: boolean; error?: string; messageId?: string }[] = [];
    const whatsappUrl = `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    for (const msg of messages) {
      const toDigits = normalizePhoneForWhatsApp(msg.to);

      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: toDigits,
        type: 'text',
        text: {
          preview_url: false,
          body: msg.message
        }
      };

      try {
        const response = await fetch(whatsappUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          const errMsg = data?.error?.message || data?.error?.error_user_msg || 'Failed to send message';
          results.push({ phone: msg.to, success: false, error: errMsg });
        } else {
          results.push({
            phone: msg.to,
            success: true,
            messageId: data.messages?.[0]?.id
          });
        }
      } catch (error) {
        results.push({
          phone: msg.to,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          total: messages.length,
          sent: successCount,
          failed: failCount
        },
        results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('WhatsApp broadcast error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
