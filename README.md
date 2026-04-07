# DualCore — Early Access Preview

> Summarize any video or audio in seconds.

DualCore is a pre-release tool that lets users paste a YouTube/video URL or upload a media file and instantly receive an AI-generated summary with key takeaways. This repository contains the early access frontend, built in React + TypeScript.

---

## What it does

- Accepts a YouTube or direct video URL, or a local file upload (`.mp4`, `.mp3`, `.wav`, `.mov`, `.ape`)
- Processes the content and returns a structured summary with key takeaways
- Lets users export the summary as plain text or transform it into an infographic
- Collects lightweight product feedback (use case survey + pricing willingness) to inform the roadmap

---

## Screens

### Welcome
The landing screen where users submit a URL or upload a file. A quick survey at the bottom asks what they'd use the tool for — meeting notes, lecture recaps, podcast highlights, content research, or other.

### Loading
A transitional screen shown while the content is being analyzed. Lasts ~2 seconds in the current prototype.

### Results
Displays the summary, a mock audio player, and action buttons to copy or download the output. A pricing survey at the bottom gauges willingness to pay.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Plain CSS (BEM-style `.ea-` prefix) |
| Fonts | DM Sans · Instrument Serif (Google Fonts) |
| State | Local `useState` — no external store |
| Routing | None — single-page screen state machine |

---

## Project structure

```
src/
├── EarlyAccessComponent.tsx   # Main component (Nav, Welcome, Loading, Results)
└── EarlyAccessComponent.css   # All styles
```

---

## Running locally

```bash
npm install
npm run dev
```

No environment variables are required for the frontend prototype. The loading delay and mock summary are hardcoded — replace with real API calls when the backend is ready.

---

## Design decisions

- **Full-screen layout** — no max-width container. Content uses `10%` horizontal padding to breathe at any viewport size.
- **Dark theme only** — background `#050505`, card surface `#0a0a0a`. The accent color throughout is `#aeffc7` (mint green).
- **Two typefaces** — DM Sans for UI text, Instrument Serif (italic) for display headings.
- **Screen transitions** — `fadeUp` animation on each screen change for a polished feel without a heavy animation library.

---

## Roadmap

- [ ] Connect URL input to a real transcription + summarization API
- [ ] Wire up file upload to backend processing
- [ ] Persist survey responses to a database
- [ ] Build out the infographic export feature
- [ ] Add authentication for returning users
- [ ] Mobile responsiveness pass

---

## Feedback

This is an early access preview. If you're a tester, use the in-app survey to share what you'd use DualCore for and whether you'd pay for it. All responses directly shape what gets built next.

---

Built by DualCore · 2026