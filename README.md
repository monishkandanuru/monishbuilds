# Monish Kandanuru — Portfolio

A responsive Next.js portfolio with an ivory identity section, a dark project gallery, an original chrome monogram, and orange accents. The homepage brings together selected work, services, an introduction, and a contact invitation. Dedicated work, about, services, and contact routes remain available.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` to check the production build, including TypeScript validation.

## Editing content

- `components/Projects.tsx`: five project descriptions, live links, category filters, expandable details, and image covers.
- `components/Hero.tsx` and `components/Trust.tsx`: introduction and biography.
- `components/Services.tsx`: services.
- `components/ContactForm.tsx`: existing Web3Forms integration and contact options.
- `app/globals.css`: responsive design, typography, and motion preferences.

ThermoWatch, NewGen Technologies, and SpendWise use screenshots captured from their public websites in `public/projects/`. SpendWise shows its public sign-in screen. FitAI and VaultEye use clearly labelled graphic identity explorations, without invented dashboards or metrics. The original AI-generated chrome monogram lives at `public/monish-chrome.png`; it is decorative and rendered through Next Image. The hero responds gently to mouse movement and respects reduced-motion preferences.

## Project references

Reviewed against public GitHub documentation on 14 September 2026:

- [ThermoWatch](https://github.com/monishkandanuru/thermowatch-sih26083): README and package manifest. Its [Vercel entry point](https://thermowatch-sih26083.vercel.app/) returned HTTP 200. The README identifies it as an SIH26083 heatwave early-warning and decision-support prototype. Notification demonstrations are not represented as production notification delivery.
- [FitAI](https://github.com/monishkandanuru/FitAI): current README describes a Python/Flask fitness journal with authentication, adult BMI measurement history, workouts, and meals. AI coaching and automated meal recognition are explicitly unimplemented. No public production URL was established, so the card links to GitHub.
- [VaultEye](https://github.com/monishkandanuru/VaultEye): current public README describes an Android privacy and finance intelligence project. This differs from the previous portfolio's security-camera description, which was removed. No unverified technical features or download status are claimed.
- NewGen Technologies and SpendWise retain the existing portfolio's live URLs, and their public interfaces were inspected. NewGen is credited as collaborative work, matching the live site footer.

## Verification

The production build performs type checking. Browser checks cover responsive layouts, mobile navigation, category-filter results, expandable project details, image loading, labelled contact fields, and submit-button enablement. Form delivery requires a live Web3Forms submission; preview verification does not send messages.

The existing deleted `next.config.mjs` and `SETUP_GUIDE.md` were left untouched.
