import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getProgramBySlug, getPrograms } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const locales = ["en", "id"];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    const programs = await getPrograms(lang);
    for (const program of programs) {
      params.push({ lang, slug: program.slug });
    }
  }

  return params;
}

export default async function ProgramDetail(props: { params: Promise<{ lang: string; slug: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  const program = await getProgramBySlug(params.lang, params.slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-24">
      {/* Back Button */}
      <Link 
        href={`/${params.lang}/programs`}
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-12 group"
      >
        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        {dict.programDetail.backToPrograms}
      </Link>

      <header className="mb-12">
        <span className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold tracking-widest uppercase">
          {program.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight mb-8 font-headline">
          {program.title}
        </h1>
        <div className="flex items-center gap-4 text-zinc-500 text-sm">
          <span className="material-symbols-outlined">calendar_today</span>
          <time>{program.date}</time>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-xl">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <article className="prose prose-lg max-w-none prose-primary prose-headings:font-headline prose-headings:text-primary prose-p:text-on-surface-variant prose-p:leading-relaxed prose-strong:text-primary prose-a:text-secondary hover:prose-a:underline">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {program.content}
        </ReactMarkdown>
      </article>

      {/* Footer CTA */}
      <div className="mt-20 pt-12 border-t border-surface-container-high text-center">
        <h3 className="text-2xl font-bold text-primary font-headline mb-4">{dict.programDetail.interestedTitle}</h3>
        <p className="text-on-surface-variant mb-8">{dict.programDetail.interestedDesc}</p>
        <Link href={`/${params.lang}/contact`}>
          <button className="bg-primary text-on-primary px-10 py-4 rounded-lg font-bold transition-all hover:shadow-xl active:scale-95">
            {dict.programDetail.getInTouch}
          </button>
        </Link>
      </div>
    </main>
  );
}
