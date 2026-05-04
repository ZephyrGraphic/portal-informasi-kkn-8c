import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  return {
    title: dict.profile.metaTitle,
    description: dict.profile.metaDesc,
  };
}

export default async function VillageProfile(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* Editorial Header */}
      <section className="pt-28 md:pt-32 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 mb-6 rounded-full bg-primary-container/20 text-primary text-xs font-bold tracking-widest uppercase">
                {dict.common.location.split(',')[0]}
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary tracking-tighter leading-[1.1] font-headline">
                {dict.profile.title1} <br />
                <span className="text-secondary italic">{dict.profile.title2}</span>
              </h1>
            </div>
            <div className="max-w-md pb-4">
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-body border-l-4 border-secondary pl-6">
                {dict.profile.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Spread */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Image
            alt="panoramic mountain landscape of the village during sunset with golden clouds and rolling hills"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBan4fb8m9L5uLtC_IYA8dtNHVXp9uAOTS2uWUUyBfx56WABqtf1cecmbiGhgDgwFyX-twpkqjnukpq4Rn8zZcYgbVbsMnNHWQPrQ5nREW3UzvI5ZT2jxV8yuhjqzXub6-WBbJVZ0dJlWil94vZ5GUUH_tugMJARVRUcPPIGq0vRJResIJpo0jESwjQgpcy8f_GqVqsRBSW_NTCLj-ni5mCvuXv3bIIcPcc8zvIM5Sb-uEumYxotC6Qcr-Y_bU4neMohc3HGLpJIjw"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6 md:p-12">
            <div className="text-white">
              <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">{dict.common.location}</div>
              <div className="text-xl md:text-3xl font-headline font-bold">{dict.common.villageElevation}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demographics & Economy */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 md:mb-6">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2 font-headline">4,250</div>
                <div className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">{dict.profile.population}</div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow mt-0 md:mt-12">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4 md:mb-6">
                  <span className="material-symbols-outlined">landscape</span>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2 font-headline">85%</div>
                <div className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">{dict.profile.agrarian}</div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow mt-0 md:-mt-12">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary mb-4 md:mb-6">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2 font-headline">3</div>
                <div className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">{dict.profile.schools}</div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 md:mb-6">
                  <span className="material-symbols-outlined">water_drop</span>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2 font-headline">12</div>
                <div className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">{dict.profile.waterSources}</div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-primary font-headline">
                {dict.profile.economyTitle}
              </h2>
              <div className="prose prose-lg text-on-surface-variant font-body">
                <p>{dict.profile.economyDesc1}</p>
                <p>{dict.profile.economyDesc2}</p>
              </div>
              <Link href={`/${lang}/programs`}>
                <button className="mt-10 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-transform active:scale-95 hover:shadow-lg">
                  {dict.profile.exploreData}
                  <span className="material-symbols-outlined">data_exploration</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
