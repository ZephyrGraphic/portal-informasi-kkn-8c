# 🌍 KKN Pangkalan Village Portal

<div align="center">
  <br />
  <p>
    <strong>A robust, accessible, and high-performance web platform built for the KKN (Kuliah Kerja Nyata) program in Pangkalan Village.</strong>
  </p>
  <p>
    Powered by modern web technologies to serve village profiles, gallery, work programs, and community engagement.
  </p>
</div>

## ✨ Key Features

- **🌐 Internationalization (i18n):** Native support for English (`en`) and Indonesian (`id`) out of the box, ensuring broader accessibility for both locals and international visitors.
- **🛡️ Data Integrity:** Implements robust file-system locking mechanisms (`proper-lockfile`) for API routes like the Newsletter subscription, eliminating data race conditions and ensuring 100% data integrity for local JSON databases.
- **🎨 Modern Design System:** Fully customized theme leveraging Tailwind CSS, inspired by Material Design 3 principles. It uses dynamic color tokens and customized typography (`Manrope` and `Inter`) for a highly polished, aesthetic, and responsive UI.
- **♿ Web Accessibility First:** Built with accessibility in mind. Includes semantic HTML, dynamic keyboard focus traps, and screen-reader optimized navigation to ensure the web is usable by everyone.
- **📝 Markdown-Driven Content:** Work programs (`/programs`) are managed seamlessly using Markdown and `gray-matter` for frontmatter parsing. This allows easy content updates without touching the React codebase.
- **🔒 Security Hardened:** Out-of-the-box strict HTTP security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) configured directly in Next.js to protect users.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing across the entire codebase)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- **Content Rendering:** `react-markdown` & `remark-gfm`
- **Data Management:** File-based JSON state management (`data/subscribers.json`)
- **Icons:** Google Material Symbols

## 📂 Project Architecture

```bash
kknpangkalan/
├── app/
│   ├── [lang]/           # Internationalized pages (id, en)
│   │   ├── contact/      # Contact Us page
│   │   ├── gallery/      # Village image gallery
│   │   ├── logbook/      # Daily KKN logbook
│   │   ├── programs/     # Work programs list and detail views
│   │   ├── team/         # KKN Team profiles
│   │   └── village-profile/ # In-depth details about Pangkalan
│   └── api/newsletter/   # API route with file-lock handling
├── components/           # Reusable UI components (Navbar, Footer, Cards)
├── content/programs/     # Markdown files representing individual programs
├── data/                 # Local JSON databases
├── dictionaries/         # Translation JSON files (id.json, en.json)
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kknpangkalan.git
   cd kknpangkalan
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📝 Managing Content

### Adding a New Program
Programs are managed using simple Markdown files. To add a new program, create a new `.md` file inside `content/programs/`:

```markdown
---
title: "Program Title"
date: "2026-05-01"
author: "Author Name"
image: "/path-to-image.jpg"
summary: "A brief summary of the program."
---

Your full program details go here...
```

### Updating Translations
To modify or add new translation keys, edit the JSON files located in the `dictionaries/` directory:
- `dictionaries/en.json` (English)
- `dictionaries/id.json` (Indonesian)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/kknpangkalan/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
