import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import LogbookTimeline from "@/components/LogbookTimeline";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  return {
    title: dict.logbook.metaTitle,
    description: dict.logbook.metaDesc,
  };
}

export default async function Logbook(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  const logEntries = [
    {
      week: "Week 04",
      dateRange: "Oct 24 - Oct 30, 2026",
      title: lang === "id" ? "Restorasi Sistem Irigasi Fase II" : "Irrigation System Restoration Phase II",
      description: lang === "id"
        ? "Menyelesaikan konstruksi tembok utama untuk saluran pengalihan air. Tim kami berkolaborasi dengan petani lokal untuk membersihkan 2km endapan di saluran utama, memastikan aliran air berkelanjutan untuk musim panen mendatang."
        : "Completed the structural masonry for the main water diversion channel. Our team collaborated with local farmers to clear 2km of sedimentary buildup in the primary arteries, ensuring sustainable water flow for the upcoming harvest season.",
      images: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv4DjOozRDISiHAFptBDhPSRVRurhLfViie7EJbqF34kRUEuti2qIHi-o22ZLk6rg2JuMXIrAiSpBakJc654mUjbcRmJfBC5lqUB3GPvHwGXR3sb6WeucGQilabdQ6plSh6UAjRtAYsvUXjPBdGmNXojFrkXL1GyscdaDOnKbPVtTNyb0OkMGUgUqktq6UkN_zMpOY9LsNK3gsnEBpTbpZqSHb0x1l14hURzwZHe_uJN2Q9HRK41uG16zbAxuXMu3wcR3H8rX-Ly0",
          alt: "students and local farmers working together on a stone irrigation canal in a lush green rural landscape",
        },
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOXA0fGO_p4Qv7HsahJ3rdB2vK_sNvbm6pV1504Q8PcdRi3LLoSmyukxSyRezgTBkmvrqPta8BNqQMhtY41Ho5AwsdEUpihxAPrE6D1JtmC_XhamRt5Nra2oJAR8gMaZWGdArEajHEe9-gAoqru-xGq7aWNMsre2CVefWCfb3COoSrHbfWyM-VvTYEsfk9jkqODzVY-ns-dIKWW6isBIG9tMKpNNreuQS5kpn9okZqks73aQEX8h1SkTxwy35HkqNa075YYVanw4I",
          alt: "close up of flowing water in a newly restored stone irrigation channel in a sunny village field",
        },
      ],
      extraPhotos: 3,
      tags: [
        { label: lang === "id" ? "Infrastruktur" : "Infrastructure", color: "bg-primary/5 text-primary" },
        { label: lang === "id" ? "Komunitas" : "Community", color: "bg-secondary/5 text-secondary" },
      ],
      isLatest: true,
    },
    {
      week: "Week 03",
      dateRange: "Oct 17 - Oct 23, 2026",
      title: lang === "id" ? "Workshop Literasi Digital untuk Pendidik" : "Digital Literacy Workshop for Educators",
      description: lang === "id"
        ? "Mengadakan workshop intensif tiga hari di SDN 01 Pangkalan. Memperkenalkan alat pengajaran berbasis cloud dan kurikulum digital interaktif kepada 12 guru lokal untuk menjembatani kesenjangan pendidikan kota-desa."
        : "Conducted a three-day intensive workshop at SDN 01 Pangkalan. Introduced cloud-based teaching tools and interactive digital curricula to 12 local teachers to bridge the urban-rural education gap.",
      images: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_c0Q9aDPDxHUee5hMorFn-EsydjGDUka1ItfZnqxYGwbY2GMnx4x4t2Xl5nQvsN30EyUEE-sM9JLNiG4ot-FB_sjaypw9L1OcFRsPBuHqRjaBJCxjPwYhWkyTDQUPcYl7Zx4UxXSOZ-cHPLZcIwB4zF7OHq9I4fjYg5J4MarcIlujrdyt2PbCKEKqgXVP4cGNkl_LFVC3HLEt_1XMmRQ6KBZ2-6FlNPitZOA6P7xK5W95AIRt5OH0NJsEgaSgOoPbprLGCJl7G_o",
          alt: "students teaching elderly teachers how to use tablets and laptops in a bright traditional classroom",
        },
      ],
      tags: [
        { label: dict.programs.education, color: "bg-primary/5 text-primary" },
        { label: dict.programs.tech, color: "bg-tertiary/5 text-tertiary" },
      ],
    },
    {
      week: "Week 02",
      dateRange: "Oct 10 - Oct 16, 2026",
      title: lang === "id" ? "Pemeriksaan Kesehatan Masyarakat" : "Community Health Screening",
      description: lang === "id"
        ? "Bekerja sama dengan Puskesmas Cikidang untuk menyelenggarakan pemeriksaan kesehatan gratis bagi 150+ warga. Meliputi pemeriksaan tekanan darah, gula darah, dan konsultasi gizi untuk ibu hamil dan balita."
        : "Partnered with Puskesmas Cikidang to organize free health screenings for 150+ residents. Included blood pressure checks, blood sugar tests, and nutrition consultations for pregnant women and toddlers.",
      images: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyO5mN9orgNY5dpUzl_0B4sa_dRcg82RLOC0opoJHAIeHb94DIvLt69Rs9L_M-aGiDGdMT6ReDC93xayoqILn8p3s5HqLz9dgk158HS4_JI91wGaqaxoQI5C98fQO2NnzYCCASPxX_da70cnwvhFYxtTKx8sFngAIiq_nKSBYZkYb2D-CC874BEeeDCHeduQmr545CVzfvlaQ-rA31gPIbyw8u9gofDQD6eFH3DmKNK955A-WvcLXnCQKXV9gbk2UXCfQP8lm_uHk",
          alt: "health workers examining village residents in a community health clinic setting",
        },
      ],
      tags: [
        { label: dict.programs.health, color: "bg-secondary/5 text-secondary" },
        { label: lang === "id" ? "Komunitas" : "Community", color: "bg-primary/5 text-primary" },
      ],
    },
    {
      week: "Week 01",
      dateRange: "Oct 3 - Oct 9, 2026",
      title: lang === "id" ? "Survei Awal & Sosialisasi Program" : "Initial Survey & Program Socialization",
      description: lang === "id"
        ? "Melaksanakan survei awal kondisi desa dan sosialisasi program kerja kepada aparatur desa dan masyarakat. Mengidentifikasi kebutuhan prioritas dan membangun relasi awal dengan tokoh masyarakat setempat."
        : "Conducted initial village condition surveys and socialized work programs with village officials and the community. Identified priority needs and built initial relationships with local community leaders.",
      images: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvX8121LNiIHI559MnqMD07aJC71wTM4eAVcw6oP56VoHJ93tQQqErkmdrCSp_lbwOsVCeOvtxMblCm68tEEAhKyysNTUggphDq_uPc9B8Blo7VUOVMzYjL6Lxk4U-GQL7Z1aap7jZql15JXbAQL19LPHGHGdhjUhrTKIjMxWIygLQUBTrkVs8SW8nAJbCf-_fFlQ5wJ1gXpTJmKWdD3VTwVOstA7wUsOlVDyIXjlMTqW-K82rG2PYIRs8CrajItR50e0_rsiwpuk",
          alt: "team presenting to village officials in a meeting room with projector",
        },
      ],
      tags: [
        { label: lang === "id" ? "Sosialisasi" : "Socialization", color: "bg-primary/5 text-primary" },
        { label: lang === "id" ? "Survei" : "Survey", color: "bg-tertiary/5 text-tertiary" },
      ],
    },
  ];

  return (
    <main className="pt-28 md:pt-32 pb-24 px-6 md:px-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4 leading-none font-headline">{dict.logbook.title}</h1>
        <p className="text-zinc-500 max-w-xl text-base md:text-lg font-body">{dict.logbook.desc}</p>
      </header>

      {/* Interactive Timeline */}
      <LogbookTimeline entries={logEntries} dict={dict.logbook} />
    </main>
  );
}
