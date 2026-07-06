# Login/Signup Fix - gympowerhealth.com

## Sign in nahi ho raha? Yeh steps follow karo:

### 1. Supabase Dashboard → Authentication → URL Configuration

1. Open: https://supabase.com/dashboard → Your Project (cehewvuctyctpqfmpoqs)
2. **Authentication** → **URL Configuration**
3. Set these values:

| Setting | Value |
|---------|-------|
| **Site URL** | `https://gympowerhealth.com` |
| **Redirect URLs** | Add these (comma separated or one per line): |
| | `https://gympowerhealth.com` |
| | `https://gympowerhealth.com/**` |
| | `https://gympowerhealth.com/login` |
| | `https://gympowerhealth.com/signup` |
| | `https://gympowerhealth.com/reset-password` |

### 2. Email Confirmation (Optional)

Agar sign **up** ke baad login nahi ho raha:
- **Authentication** → **Providers** → **Email**
- "Confirm email" **OFF** karo (immediate login ke liye)

### 3. Hosting Par Env Variables

Vercel/Netlify par ensure karo:
- `VITE_SUPABASE_URL` = `https://cehewvuctyctpqfmpoqs.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (your anon key)

### 4. Rebuild & Deploy

URL config change ke baad **rebuild** karo:
```bash
npm run build
```
Phir deploy.
