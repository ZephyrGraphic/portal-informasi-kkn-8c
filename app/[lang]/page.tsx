import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import NewsletterForm from "@/components/NewsletterForm";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* Cinematic Hero Section */}
      <section className="relative h-[100svh] min-h-[600px] max-h-[921px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover filter brightness-50"
            alt="Wide cinematic shot of a misty mountain village in Indonesia at sunrise with lush green rice terraces and soft morning light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjHNf8vPoaHiREXrclZdKfje2HonAX1lgBO5xEZyt5VLjZLP8GSl-966t7lv02CQTRJU6srhCLAdhJ8WyLjoAcZx2sZat0xfd5xRKUr_9ScKNFBfqknWrRM25T_9nnVsBcY6H_FQb3hXB6DHbYfpScaEhaQObDSDkiDWiG046eawMrvzGDQ8HmEdX72wFhK6EPHgsZKRzCrHzRzqb4RNUoOt-Uzstl1UpPxmYnnkamv7l8z7kPCrAo2vx8PZcfCwSjt6rvxvDZDhU"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/30 text-secondary text-xs font-bold tracking-widest uppercase">
              {dict.home.heroTag}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-8 font-headline">
              {dict.home.heroTitle1} <br />
              {dict.home.heroTitle2}
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-10 font-body leading-relaxed max-w-xl">
              {dict.home.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/programs`}>
                <button className="bg-secondary text-on-secondary px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg flex items-center gap-3 transition-all hover:shadow-xl hover:-translate-y-1">
                  {dict.home.explorePrograms}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <Link href={`/${lang}/team`}>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all hover:bg-white/20">
                  {dict.home.meetTheTeam}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick About & Stats Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-primary font-headline">
                {dict.home.aboutTitle1} <span className="text-secondary">{dict.home.aboutTitle2}</span>
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
                {dict.home.aboutDesc}
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1 font-headline">45+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{dict.home.daysActive}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1 font-headline">12</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{dict.home.keyProjects}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1 font-headline">850+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{dict.home.impactedLives}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-2 relative">
                <Image
                  className="w-full h-full object-cover"
                  alt="Group of university students collaborating with village elders under a traditional wooden gazebo in a sunlit garden"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlaQXWlB4aVWPt5e9QEB_9pxGx_9Y9n19ic4ZSQRSTQVU7n99ltfTKX8GTjwiol013he1iao39mvg1Qz2NppTwIGw0ijkbhNg8i21JL1AZdoaCvM65IMiO3UXWj1t4jJWm1KUfEc1jDfJ9Oj5PWJY7kgbowuZmobqr8M0BAk2OAF_f6yLhq3R9jGQ2jk83pQttVIIa4V1vUNFzpkiaRbaPliAR9qTuhmkNn58-CLFBXTQi76vYFRlqjr5_u-_jVvltQbhfT84tXfo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-8 -left-4 md:-left-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-xs -rotate-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full signature-gradient flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                  </div>
                  <div className="text-sm font-bold text-primary">{dict.home.communityFirst}</div>
                </div>
                <p className="text-sm text-zinc-600 italic">{dict.home.communityQuote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Areas Section */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4 font-headline">{dict.programs.title}</h2>
              <p className="text-on-surface-variant text-lg">{dict.programs.desc}</p>
            </div>
            <div className="flex gap-2">
              <div className="h-1 w-20 bg-secondary rounded-full"></div>
              <div className="h-1 w-4 bg-zinc-300 rounded-full"></div>
              <div className="h-1 w-4 bg-zinc-300 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Education Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-lg bg-primary-container/10 flex items-center justify-center mb-8 group-hover:signature-gradient group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary font-headline">{dict.programs.education}</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                {dict.home.educationDesc}
              </p>
              <Link className="inline-flex items-center gap-2 font-bold text-secondary text-sm group-hover:underline" href={`/${lang}/programs`}>
                {dict.home.viewCurriculum}
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </Link>
            </div>

            {/* Digitalization Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-lg bg-primary-container/10 flex items-center justify-center mb-8 group-hover:signature-gradient group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">devices</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary font-headline">{dict.programs.tech}</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                {dict.home.techDesc}
              </p>
              <Link className="inline-flex items-center gap-2 font-bold text-secondary text-sm group-hover:underline" href={`/${lang}/programs`}>
                {dict.home.exploreSystems}
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </Link>
            </div>

            {/* Health Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-lg bg-primary-container/10 flex items-center justify-center mb-8 group-hover:signature-gradient group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">health_and_safety</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary font-headline">{dict.programs.health}</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                {dict.home.healthDesc}
              </p>
              <Link className="inline-flex items-center gap-2 font-bold text-secondary text-sm group-hover:underline" href={`/${lang}/programs`}>
                {dict.home.ourImpact}
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Contact CTA */}
      <NewsletterForm dict={dict.home} />
    </main>
  );
}
