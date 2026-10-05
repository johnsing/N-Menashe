# N-MENASHE

> A modern, bilingual (Hebrew/English) digital library and media platform for Jewish heritage, art, and scripture.

![N-MENASHE](https://img.shields.io/badge/N--MENASHE-Heritage%20Library-ffd700?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Styled Components](https://img.shields.io/badge/styled--components-6-DB7093?style=flat-square&logo=styled-components)

---

## 📖 About

**N-MENASHE** is a beautifully designed web application that brings together:

- 📚 **Sacred Texts** — Torah, Nevi'im, Ketuvim, and Apocrypha with bilingual Hebrew/English reader
- 🎨 **Art Gallery** — Curated collections of Jewish art and photography
- 🎥 **Video Library** — Educational videos, lectures, and visual content
- 🎵 **Audio Collection** — Music, prayers, and recitations

The platform features a modern dark theme with gold accents, fully responsive layouts, and a polished reading experience for Hebrew scripture.

---

## ✨ Features

### 📚 Library & Reader
- **Category → Book → Chapter → Verse** navigation hierarchy
- **Bilingual reader** — Toggle between Hebrew (RTL) and English
- **Font size controls** — Small / Medium / Large
- **Chapter selector** — Jump to any chapter instantly
- **Verse highlighting** — Click any verse to highlight
- **Search across all texts** — Find words or phrases

### 🎥 Video System
- **Multi-source support** via `react-player`:
  - YouTube
  - Vimeo
  - Local MP4/WebM files
  - HLS / DASH streams
- **YouTube-style home** — Trending row + category filters
- **Watch page** — Player, back button, breadcrumb, like/dislike, share, download
- **"Up Next" sidebar** — Related videos

### 🎨 Design
- **Dark theme** with gold (`#ffd700`) accents
- **Glassmorphism** navigation drawer
- **Floating navbar** — Auto-hides on scroll
- **Smooth animations** — Fade, slide, float
- **Fully responsive** — Desktop, tablet, mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [styled-components](https://styled-components.com/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Icons** | [react-icons](https://react-icons.github.io/react-icons/) |
| **Video** | [react-player](https://github.com/cookpete/react-player) |
| **Backend** | [Supabase](https://supabase.com/) *(auth + storage)* |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/n-menashe.git
cd n-menashe

# Install dependencies
npm install

# Start dev server
npm run dev
