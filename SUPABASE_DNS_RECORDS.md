# Supabase Custom Domain DNS Configuration

## Domain: hushh.ai
## Custom Hostname: auth.hushh.ai
## Project Ref: ibsisfnjxeowvdtvgzff

---

## ✅ Step 1: CNAME Record (Already Done)
```
Type: CNAME Record
Host: auth
Value: ibsisfnjxeowvdtvgzff.supabase.co
TTL: Automatic
```

---

## 📝 Step 2: TXT Record (REQUIRED - Add this now!)

Go to **Namecheap → Domain List → hushh.ai → Advanced DNS** and add:

```
Type: TXT Record
Host: _acme-challenge.auth
Value: Q_p8mcpIRNtgemsw4BlkyX2PNqvcf0Lw4duyeU-Xqcc
TTL: Automatic (or 5 min if available)
```

### ⚠️ IMPORTANT:
- **Host field:** Enter ONLY `_acme-challenge.auth` (NOT the full `_acme-challenge.auth.hushh.ai`)
- **Why?** Namecheap automatically appends `.hushh.ai` to the end
- **Value field:** Copy-paste exactly: `Q_p8mcpIRNtgemsw4BlkyX2PNqvcf0Lw4duyeU-Xqcc`
- **No extra spaces or characters!**

---

## 🔄 Next Steps (After adding TXT record):

1. Wait 2-5 minutes for DNS propagation
2. Tell me when you've added the TXT record
3. I'll run verification command
4. Once verified, I'll activate the domain
5. Update `.env.local` with `NEXT_PUBLIC_SUPABASE_URL=https://auth.hushh.ai`

---

## 📸 Final DNS Configuration (What you should have):

In Namecheap Advanced DNS, you should see:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | auth | ibsisfnjxeowvdtvgzff.supabase.co | Automatic |
| TXT Record | _acme-challenge.auth | Q_p8mcpIRNtgemsw4BlkyX2PNqvcf0Lw4duyeU-Xqcc | Automatic |

---

## 🚀 Status: Waiting for TXT Record Addition
**Once you add the TXT record to Namecheap, let me know and I'll continue with verification!**
