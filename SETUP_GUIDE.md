# 🚀 Portfolio Setup & Deployment Guide

## Prerequisites
- Node.js 18+ installed → [nodejs.org](https://nodejs.org)
- A Vercel account → [vercel.com](https://vercel.com) (free)
- Git installed

---

## 1. Installation & Running Locally

```bash
# Step 1: Navigate to the project folder
cd portfolio

# Step 2: Install all dependencies
npm install

# Step 3: Start local dev server
npm run dev

# Open in browser: http://localhost:3000
```

---

## 2. Before You Launch — Update These Files

### A) WhatsApp Number
Search for `WHATSAPP_NUMBER` in these 3 files and replace `91XXXXXXXXXX` with your real number (include country code, no `+` sign):

| File | Line to change |
|------|----------------|
| `components/Navbar.tsx` | `const WHATSAPP_NUMBER = "91XXXXXXXXXX"` |
| `components/ContactForm.tsx` | `const WHATSAPP_NUMBER = "91XXXXXXXXXX"` |
| `components/FloatingWhatsApp.tsx` | `const WHATSAPP_NUMBER = "91XXXXXXXXXX"` |

**Example:** If your number is `+91 98765 43210`, use `"919876543210"`

### B) Contact Email
In `components/ContactForm.tsx`, update:
```ts
const YOUR_EMAIL = "your@email.com";
```

### C) Your Name / Branding
In `app/layout.tsx`, update the metadata title and description.
In `app/page.tsx` footer, the name is "Monish Kandanuru" — update if needed.
In `components/Navbar.tsx`, the logo shows "MK" — change to your initials.

---

## 3. Editing Projects

Open `components/Projects.tsx` and find the `projects` array at the top.

Each project has these editable fields:

```ts
{
  title: "NewGen Technologies",       // Project name
  tagline: "...",                     // One-line hook
  problem: "...",                     // What problem it solved
  solution: "...",                    // How you solved it
  tech: ["Next.js", "Tailwind CSS"],  // Tech stack badges
  liveUrl: "https://...",             // Set null if no live URL
  apkUrl: "#",                        // Set to APK download URL or null
  githubUrl: "https://github.com/...",// GitHub repo link
}
```

To add a new project, copy one of the existing objects in the array and update the fields.

---

## 4. Updating Services

Open `components/Services.tsx` and edit the `services` array.
Each service has `title`, `description`, `category`, and `outcomes[]`.

---

## 5. Deployment on Vercel (Free)

### Option A: Via Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project folder
vercel

# Follow the prompts. Your site will be live in ~60 seconds.
# For production deployment:
vercel --prod
```

### Option B: Via GitHub (No CLI needed)
1. Push your project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Click **Deploy** — done ✅

### Custom Domain (GoDaddy)
1. In Vercel: go to your project → **Settings → Domains**
2. Add your domain (e.g. `monishkandanuru.com`)
3. Vercel will give you DNS records
4. In GoDaddy DNS settings, add those records
5. Wait 5–30 minutes for propagation

---

## 6. Adding a Backend Form (Optional)

The form currently uses `mailto:` as a fallback. For a proper backend:

### Option A: Formspree (Easiest — no backend needed)
1. Create a free account at [formspree.io](https://formspree.io)
2. Get your form endpoint: `https://formspree.io/f/XXXXXXXX`
3. In `ContactForm.tsx`, replace the `handleSubmit` function:

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  const res = await fetch("https://formspree.io/f/XXXXXXXX", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  
  setLoading(false);
  if (res.ok) setSubmitted(true);
};
```

### Option B: Your Own Nodemailer API (Same as NewGen)
Add an API route at `app/api/contact/route.ts` using Nodemailer + Gmail (same pattern as newgenprojects.in).

---

## 7. Performance Checklist Before Launch

- [ ] Update all WhatsApp numbers (3 files)
- [ ] Update email in ContactForm.tsx
- [ ] Update APK download links in Projects.tsx
- [ ] Add real GitHub links in Projects.tsx
- [ ] Add favicon: place `favicon.ico` in `/public/`
- [ ] Add OG image: place `og-image.png` (1200×630) in `/public/` and update layout.tsx metadata
- [ ] Test on mobile (responsive check)
- [ ] Test all links open correctly

---

## 8. Folder Structure Reference

```
portfolio/
├── app/
│   ├── globals.css        ← All CSS variables, animations, base styles
│   ├── layout.tsx         ← Root layout + SEO metadata
│   └── page.tsx           ← Main page (imports all sections)
├── components/
│   ├── CustomCursor.tsx   ← Cursor dot + glow effect
│   ├── Navbar.tsx         ← Nav + WhatsApp CTA
│   ├── Hero.tsx           ← Hero section + floating cards
│   ├── Projects.tsx       ← ✏️ Edit your projects here
│   ├── Services.tsx       ← ✏️ Edit your services here
│   ├── Trust.tsx          ← "Why clients choose me"
│   ├── ContactForm.tsx    ← ✏️ Edit email + WhatsApp here
│   ├── FinalCTA.tsx       ← Bottom CTA section
│   └── FloatingWhatsApp.tsx ← ✏️ Edit WhatsApp number here
├── public/                ← Add favicon.ico, og-image.png here
├── tailwind.config.ts     ← Color tokens, fonts, animations
├── package.json
└── tsconfig.json
```

---

## 9. Common Issues

**"Module not found: framer-motion"**  
→ Run `npm install` again

**Custom cursor not showing on mobile**  
→ Expected — mobile has no cursor. The CSS `cursor: none` only affects desktop.

**WhatsApp button shows "Invalid number"**  
→ Make sure your number has no spaces, dashes, or + sign. Just digits: `919876543210`

**Form doesn't send email**  
→ The default `mailto:` fallback opens your mail app. For automatic sending, use Formspree (Section 6).

---

Built with Next.js 14 · Tailwind CSS · Framer Motion  
Design System: Glassmorphism · Dark premium · Brand gradient #7C5CFF → #00D4FF
