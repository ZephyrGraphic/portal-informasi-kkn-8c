import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import "material-symbols/outlined.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";

  const title = lang === "id"
    ? "KKN Pangkalan 2026 — Dokumentasi Kegiatan KKN Tematik"
    : "KKN Pangkalan 2026 — Thematic Community Service Documentation";
  const description = lang === "id"
    ? "Dokumentasi Kegiatan KKN Tematik Desa Pangkalan, Kecamatan Cikidang, Universitas Nusa Putra 2026"
    : "Documentation of Thematic Community Service in Pangkalan Village, Cikidang District, Nusa Putra University 2026";

  return {
    title: {
      default: title,
      template: `%s | KKN Pangkalan 2026`,
    },
    description,
    metadataBase: new URL("https://kkn-pangkalan.vercel.app"),
    openGraph: {
      title,
      description,
      siteName: "KKN Pangkalan 2026",
      locale: lang === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${manrope.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-surface text-on-surface font-body antialiased">
        {/* Accessibility: Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
        >
          {lang === "id" ? "Langsung ke konten" : "Skip to content"}
        </a>
        <Navbar lang={lang} dict={dict.nav} common={dict.common} />
        <div id="main-content">
          {props.children}
        </div>
        <Footer lang={lang} dict={dict.footer} common={dict.common} />
      </body>
    </html>
  );
}
