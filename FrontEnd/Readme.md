# Sanika Barguje — Personal Portfolio

A responsive personal portfolio website built with vanilla HTML5, CSS3, and JavaScript.

## Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/     (add profile/project images here)
│   ├── icons/       (add custom icons here)
│   └── resume/      (add resume PDF here, then update [RESUME_LINK])
└── README.md
```

## Before you publish

Search the project for the following placeholders and replace them with real values:

- `[RESUME_LINK]` — path or URL to your resume PDF
- `[GITHUB_LINK]` / `[GITHUB_URL]` — your GitHub profile and per-project repo links
- `[LIVE_DEMO_LINK]` — live deployment links for projects, where available
- `[LINKEDIN_URL]` — your LinkedIn profile
- `[YOUTUBE_URL]` — your YouTube channel

## Running locally

No build step is required. Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Notes

- The contact form is connected to Formspree (`https://formspree.io/f/mqpabkjk`). It validates fields in the browser, then POSTs to Formspree, which forwards submissions to the email you set up on your Formspree account.
- **First submission needs confirming:** Formspree emails you a one-time confirmation link the first time your form receives a submission. Open that email and click confirm, or messages won't go through after that point.
- Colors, type, and spacing are controlled through CSS variables at the top of `style.css` — adjust the `:root` block to retheme the whole site.
