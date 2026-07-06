# send-whatsapp Edge Function

WhatsApp Cloud API se broadcast messages bhejne ke liye. Admin panel → Broadcast se invoke hota hai.

## Required secrets (Supabase Dashboard → Project → Edge Functions → Secrets)

| Secret | Description |
|--------|-------------|
| `WHATSAPP_ACCESS_TOKEN` | Meta System User token (WhatsApp permissions) |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp "Phone number ID" (API Setup page) |

Setup steps: `docs/WHATSAPP_SUPABASE_SETUP.md`

## Deploy

```bash
npx supabase functions deploy send-whatsapp
```

## Request body

```json
{
  "messages": [
    { "to": "9876543210", "message": "Hello!", "name": "Guest" }
  ]
}
```

`to` Indian 10-digit ya international format (with/without +) dono chalega; function andar normalize karta hai.
