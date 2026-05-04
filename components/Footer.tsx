import Link from "next/link";
import Image from "next/image";

interface FooterDict {
  copyright: string;
  privacyPolicy: string;
  contactSupport: string;
  universityPortal: string;
}

interface CommonDict {
  programName: string;
  groupName: string;
  university: string;
  universityCity: string;
  supervisorLabel: string;
  groupVillageLabel: string;
}

export default function Footer({
  dict,
  common,
  lang,
}: {
  dict: FooterDict;
  common: CommonDict;
  lang: string;
}) {
  return (
    <footer className="bg-[#201a1c] w-full py-16 px-8 border-t border-primary/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-xl font-black text-white uppercase tracking-tighter font-headline">
              {common.programName}
            </div>
            <p className="font-body text-xs font-bold text-primary uppercase tracking-[0.2em]">
              {common.groupVillageLabel}
            </p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
              {common.supervisorLabel}
            </div>
            <Link 
              href="https://lppm.nusaputra.ac.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <Image
                src="/rcsu-logo.png"
                alt="Research Community Services Unit Logo"
                width={280}
                height={80}
                className="h-10 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>

          <p className="font-body text-sm leading-relaxed text-zinc-500/80 max-w-sm">
            {dict.copyright}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-10">
          <div className="flex flex-wrap gap-x-12 gap-y-6 font-headline font-bold text-sm tracking-tight">
            <Link
              className="text-zinc-400 hover:text-primary transition-all flex items-center gap-2"
              href={`/${lang}/programs`}
            >
              {dict.privacyPolicy}
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </Link>
            <Link
              className="text-zinc-400 hover:text-primary transition-all flex items-center gap-2"
              href={`/${lang}/contact`}
            >
              {dict.contactSupport}
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </Link>
            <Link
              className="text-zinc-400 hover:text-primary transition-all flex items-center gap-2"
              href={`/${lang}/team`}
            >
              {dict.universityPortal}
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">
                language
              </span>
            </div>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {common.university} <br />
              <span className="text-zinc-600">{common.universityCity}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
