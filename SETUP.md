# Gym Power Hub - Production Setup Guide

**Live:** https://gympowerhealth.com  
**Login:** https://gympowerhealth.com/login  
**Signup:** https://gympowerhealth.com/signup  
**Admin:** https://gympowerhealth.com/admin  

## 0. Login/Signup Nahi Chal Raha? → [SUPABASE_AUTH_FIX.md](./SUPABASE_AUTH_FIX.md)

Supabase me `https://gympowerhealth.com` add karo (Redirect URLs).

## 1. Supabase Setup

### Run SQL Migrations

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → **SQL Editor**
2. Run these files in order:
   - `supabase/migrations/00001_initial_schema.sql` - Full schema, RLS, triggers
   - `supabase/migrations/00002_seed_admin.sql` - Grant admin to gympowerhealthinfo@gmail.com

### Admin Login

- **Email:** `gympowerhealthinfo@gmail.com`
- Sign up first at `/signup` with this email
- The trigger will **auto-assign admin role** on signup
- If you already have an account, run `00002_seed_admin.sql` to grant admin

### Environment Variables

Create `.env` in project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
# or VITE_SUPABASE_ANON_KEY
```

## 2. WhatsApp Broadcast (Optional)

For broadcast to work, set these in **Supabase → Edge Functions → send-whatsapp → Secrets**:

- `WHATSAPP_ACCESS_TOKEN` - From Meta WhatsApp Business API
- `WHATSAPP_PHONE_NUMBER_ID` - Your WhatsApp Business phone number ID

Without these, broadcast will show an error. CSV upload and DB member loading still work.

## 3. Deploy Edge Function

```bash
supabase functions deploy send-whatsapp
```

## 4. Build & Host

```bash
npm install
npm run build
```

Output: `dist/` folder

### Deploy to Vercel
1. Push to GitHub, connect repo to Vercel
2. Set env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
3. Build command: `npm run build` | Output: `dist`
4. `vercel.json` handles SPA routing (refresh on /admin, /dashboard works)

### Deploy to Netlify
1. Connect repo, set env vars
2. Build: `npm run build` | Publish: `dist`
3. `netlify.toml` + `_redirects` handle SPA routing

## 5. Tables Overview

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (name, phone, avatar) |
| `user_roles` | admin / moderator / user |
| `members` | Gym members (admin manages) |
| `announcements` | Gym announcements |
| `broadcast_messages` | Broadcast logs |
| `gym_settings` | Gym config (email, phone, etc.) |

## 6. Default Admin Email

Settings page default: **gympowerhealthinfo@gmail.com**
