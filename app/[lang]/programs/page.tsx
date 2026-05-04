import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getPrograms } from "@/lib/markdown";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  return {
    title: dict.programs.metaTitle,
    description: dict.programs.metaDesc,
  };
}

export default async function Programs(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  const programs = await getPrograms(lang);

  return (
    <main className="max-w-7xl mx-auto px-8 pt-32 pb-24">
      {/* Header Section */}
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary font-headline tracking-tighter mb-6">
          {dict.programs.title}
        </h1>
        <p className="text-xl text-on-surface-variant font-body leading-relaxed">
          {dict.programs.desc}
        </p>
      </header>

      {/* Program Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {programs.map((program) => (
          <div key={program.slug} className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row group">
            <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
               <Image
                alt={program.title}
                src={program.image}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8 md:w-3/5 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">{program.category}</span>
                <h3 className="text-2xl font-bold text-primary font-headline mb-4">{program.title}</h3>
                <p className="text-zinc-600 font-body mb-6 leading-relaxed line-clamp-3">
                  {program.description}
                </p>
              </div>
              <Link href={`/${lang}/programs/${program.slug}`}>
                <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors cursor-pointer">
                  {dict.programs.readReport} <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
