# Creator & Social Tools — Project Blueprint & SEO Strategy

Page: adindairawan.github.io/toolscreators

An ad-free, 100% client-side micro-tool suite designed for video creators, social media managers, and video editors to solve common platform friction points without popups, paywalls, or server uploads.

---

## 1. Executive Summary & Why This Ranks

* **Core Problem:** Existing tools are buried under aggressive banner ads, slow server-side video uploads, fake download buttons, or monthly paywalls for simple features.
* **The Opportunity:** Search queries in this space have **low Keyword Difficulty (KD 5–18)**, steady search volume (30,000–60,000+ monthly searches across the cluster), and high intent from creators looking for quick, clean browser utilities.
* **Technical Advantage:** Running everything **100% client-side (HTML5 Canvas / Web APIs)** means:
  * Zero server video upload time (instant preview).
  * High user privacy (files never leave their device).
  * Near-zero hosting costs (can be hosted for free on Cloudflare Pages, Vercel, or GitHub Pages).
  * Blazing fast Core Web Vitals (a major Google ranking factor).

---

## 2. Core Tool Suite Features

### Tool 1: Multi-Platform Safe Zone Previewer & Checker
Allows creators to drop an image or video and toggle real UI overlays to ensure captions, CTAs, and faces aren't covered by platform interface elements.

* **Supported Platforms:**
  * **TikTok:** For You Page (FYP) UI, Following tab, search bar, side action rail (like, comment, bookmark, share), caption block, sound ticker.
  * **Instagram Reels:** Profile header, bottom caption area, audio label, right-side action buttons.
  * **YouTube Shorts:** Channel bar, subscribe button, description overlay, like/dislike column.
* **Key Features:**
  * Drag-and-drop video/image playback with scrubbing.
  * Exact 1080x1920 pixel-accurate overlay guides (toggle on/off, opacity slider).
  * Export safe-zone guide PNG templates (1080x1920) for Premiere Pro, Final Cut, and CapCut.

### Tool 2: Instagram & LinkedIn Seamless Carousel Splitter
* Upload a wide panorama/infographic (e.g., 3240x1080 for 3 slides).
* Auto-split into seamless 1080x1080 (1:1) or 1080x1350 (4:5) cards.
* Client-side ZIP download with 1-click.

### Tool 3: Discord Dynamic Timestamp Generator
* Pick a date/time and timezone.
* Instantly generate Discord markdown timestamp tags (`<t:1700000000:R>`, `<t:1700000000:F>`).
* Live preview showing how it renders to other Discord users worldwide in real time.
* One-click copy button.

---

## 3. SEO Keyword Map & Landing Page Architecture

To capture organic traffic effectively, each tool and specific use case should have its own dedicated URL while linking back into the common suite.

| Route / Slug | Primary Target Keyword | Est. Monthly Searches | Est. KD (0–100) | Search Intent |
| :--- | :--- | :--- | :--- | :--- |
| `/tiktok-safe-zone` | `tiktok safe zone checker` / `tiktok safe zone template` | 15,000 – 30,000 | 8 – 14 | Practical tool & PNG download |
| `/reels-safe-zone` | `instagram reels safe zone` | 8,000 – 15,000 | 7 – 12 | Visual overlay preview |
| `/shorts-safe-zone` | `youtube shorts safe zone guide` | 5,000 – 10,000 | 5 – 10 | Dimension guide & overlay |
| `/carousel-splitter` | `instagram carousel splitter online` | 3,000 – 7,000 | 10 – 15 | Quick image cutting & ZIP export |
| `/discord-timestamps` | `discord timestamp generator` | 5,000 – 12,000 | 6 – 11 | Direct generator utility |

---

## 4. Technical Architecture & Tech Stack

```mermaid
flowchart TD
    User([Creator / Editor]) -->|Drops MP4 / MOV / PNG| Browser[Browser Window]
    
    subgraph Client-Side Engine [Zero Server Uploads]
        HTML5Video[HTML5 Video / Canvas Element]
        OverlayEngine[SVG UI Overlay Engine]
        ZIPEngine[JSZip / Canvas Exporter]
    end
    
    Browser --> Client-Side Engine
    Client-Side Engine -->|Instant Preview| Screen[Interactive Screen with Toggleable UI Guides]
    Client-Side Engine -->|1-Click Download| Output[PNG Overlay / Split Slides / Timestamp Code]
```

* **Frontend:** Clean Vanilla HTML/Tailwind CSS + TypeScript (or Next.js/Astro for static SEO generation).
* **Canvas / Media:** Native HTML5 `<canvas>` and `<video>` API for video manipulation and overlays.
* **Packaging:** `JSZip` for client-side multi-image bundling.
* **Hosting:** Static hosting (Cloudflare Pages or Vercel). Cost: **$0/month**.

---

## 5. UI/UX Principles (Why Users Will Prefer This)

1. **Zero Ads, Zero Popups:** No cookie consent walls, no banner shifts, no fake "Download Now" buttons.
2. **Zero Sign-Up Required:** Use the tool immediately upon landing on the page.
3. **Instant Performance:** No progress bar waiting for video to upload to a remote server.
4. **Dark Mode by Default:** Styled for creative pros, video editors, and designers.
5. **Keyboard Shortcuts:** `Space` for play/pause, `Left/Right` for frame stepping.

---

## 6. Implementation Milestones

- [ ] **Milestone 1: MVP Core (Safe Zone Checker)**
  - Setup base project structure.
  - Implement canvas video/image upload & playback scrubber.
  - Create accurate SVG UI overlays for TikTok, IG Reels, and YouTube Shorts.
- [ ] **Milestone 2: Export & Templates**
  - Add download buttons for transparent PNG overlay templates (CapCut / Premiere / FCPX).
  - Add carousel splitter canvas utility.
- [ ] **Milestone 3: Discord Timestamp Utility**
  - Add date/time picker with standard Discord format codes and live preview.
- [ ] **Milestone 4: SEO & On-Page Optimization**
  - Add structured data (`SoftwareApplication` schema).
  - Include quick FAQ and dimensions cheat sheet below the fold on each tool page.
