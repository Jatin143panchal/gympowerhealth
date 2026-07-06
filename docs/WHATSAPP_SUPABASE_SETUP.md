# Supabase par WhatsApp API Setup – Step by Step

Is guide me bataya gaya hai ki **Meta WhatsApp Business API** ko **Supabase Edge Function** ke saath kaise connect karein, taaki app se broadcast messages **+91 9217640317** number se ja sakein.

---

## 1. Meta Developer Account & App Banana

1. **Meta for Developers** pe jao: https://developers.facebook.com/
2. Login karo (Facebook account se).
3. **My Apps** → **Create App** → **Business** type choose karo.
4. App name do (e.g. "Power Health Gym") aur **Create App** pe click karo.

---

## 2. WhatsApp Product Add karna

1. App dashboard me **Add Products** pe jao.
2. **WhatsApp** ke saamne **Set up** pe click karo.
3. **WhatsApp** → **API Setup** section open karo.
4. Yahan pe dikhenge:
   - **Temporary access token** (testing ke liye)
   - **Phone number** (test number) aur
   - **Phone number ID** (ye important hai – baad me Supabase me use hoga)

---

## 3. Permanent Access Token (Production ke liye)

Testing ke liye **temporary token** kaam karega, lekin wo 24 hours me expire ho jata hai. Production ke liye **System User** token chahiye:

1. **Meta Business Suite** → https://business.facebook.com/
2. **Business Settings** → **Users** → **System Users**.
3. **Add** se naya System User banao, role **Admin** do.
4. **Generate New Token** pe click karo:
   - App: jo app banaya (e.g. Power Health Gym)
   - Permissions: **whatsapp_business_messaging**, **whatsapp_business_management**
   - Token ko copy karke safe rakho – ye **WHATSAPP_ACCESS_TOKEN** banega.

---

## 4. Phone Number ID Nikalna

1. **Meta for Developers** → apni app → **WhatsApp** → **API Setup**.
2. **From** dropdown me jo number dikh raha hai (e.g. +91 9217640317) uske saath **Phone number ID** likha hota hai (long number, e.g. `123456789012345`).
3. Is ID ko copy karo – ye **WHATSAPP_PHONE_NUMBER_ID** banega.

Agar number abhi add nahi hai:
- **Add phone number** se apna business number add karo (SMS/call se verify).
- Us number ka **Phone number ID** same API Setup page pe dikh jayega.

---

## 5. Supabase me Edge Function Secrets Set karna

1. **Supabase Dashboard** kholo: https://supabase.com/dashboard  
2. Apna project select karo (Gym Power Hub).
3. Left sidebar me **Edge Functions** pe jao.
4. **send-whatsapp** function open karo (ya create karo agar nahi hai).
5. **Secrets** / **Environment variables** section dhundo:
   - Supabase me: **Project Settings** → **Edge Functions** → **Secrets**  
   ya  
   - Function ke **Settings** / **Manage secrets**.
6. Do secrets add karo:

| Name | Value |
|------|--------|
| `WHATSAPP_ACCESS_TOKEN` | Step 3 me jo token copy kiya (System User token) |
| `WHATSAPP_PHONE_NUMBER_ID` | Step 4 me jo Phone number ID copy kiya |

**Add / Save** karke dono store kar do.

---

## 6. Edge Function Deploy karna

Agar **send-whatsapp** function pehle se deploy hai to sirf secrets set karna kaam hai. Naya deploy karna ho to:

```bash
# Project root se
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase functions deploy send-whatsapp
```

Secrets CLI se bhi set kar sakte ho:

```bash
npx supabase secrets set WHATSAPP_ACCESS_TOKEN="your_token_here"
npx supabase secrets set WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id_here"
```

---

## 7. Verify karna

1. App me **Admin** → **Broadcast** kholo.
2. **Load from Members Database** ya CSV se recipients load karo.
3. Message type (Expiry reminder / Custom message) choose karke **Send** karo.
4. Agar setup sahi hai to messages **+91 9217640317** number se jaenge aur recipients ko WhatsApp pe aayenge.

Agar error aaye to **Supabase** → **Edge Functions** → **send-whatsapp** → **Logs** check karo. Wahan `WHATSAPP_ACCESS_TOKEN is not configured` jaisa error dikhe to secrets dubara set karo.

---

## 8. Summary – Kya chahiye

| Cheez | Kahan se | Kahan use |
|--------|----------|-----------|
| **WHATSAPP_ACCESS_TOKEN** | Meta Business → System User → Generate Token | Supabase Edge Function secret |
| **WHATSAPP_PHONE_NUMBER_ID** | Meta WhatsApp → API Setup → From → Phone number ID | Supabase Edge Function secret |

Dono secrets set hote hi **send-whatsapp** Edge Function in values ko use karke WhatsApp API ko call karti hai, aur messages **9217640317** (jo bhi number aapne Meta me is ID se link kiya hai) se jaate hain.

---

## 9. Common Errors

- **"WHATSAPP_ACCESS_TOKEN is not configured"** → Supabase me secret name exactly `WHATSAPP_ACCESS_TOKEN` hona chahiye, value me token.
- **"WHATSAPP_PHONE_NUMBER_ID is not configured"** → Same, secret name `WHATSAPP_PHONE_NUMBER_ID`, value me Phone number ID (number khud nahi, ID).
- **Message not sending / 401** → Token expire ho gaya ho sakta hai; naya System User token generate karke secret update karo.
- **Wrong number se ja raha hai** → Meta API Setup me jo number is **Phone number ID** se linked hai, wahi se jayega. 9217640317 ke liye us number ko Meta me add karke usi ka Phone number ID use karo.

Is process se Supabase par WhatsApp API ka setup complete ho jata hai; ab app se broadcast sab isi number (9217640317) se ja sakta hai.
