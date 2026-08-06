import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import TeamGrid from "@/components/TeamGrid";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  return {
    title: dict.team.metaTitle,
    description: dict.team.metaDesc,
  };
}

export default async function Team(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  const teamMembers = [
    {
      name: "M. Z. HAIKAL HAMDANI",
      role: lang === "id" ? "Ketua" : "Chairman",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/haikal.jpg",
      bio: lang === "id"
        ? "Sebagai ketua kelompok, Haikal bertanggung jawab memimpin koordinasi seluruh program kerja dan memastikan kolaborasi yang efektif antara tim dan masyarakat Desa Pangkalan."
        : "As group chairman, Haikal is responsible for leading the coordination of all work programs and ensuring effective collaboration between the team and the people of Pangkalan Village.",
    },
    {
      name: "RAHMANDA PUTRI KUSWARA",
      role: lang === "id" ? "Sekretaris" : "Secretary",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/manda.jpg",
      bio: lang === "id"
        ? "Rahmanda mengelola seluruh administrasi dan dokumentasi resmi kelompok, memastikan setiap kegiatan tercatat dengan baik dan laporan tersampaikan tepat waktu."
        : "Rahmanda manages all group administration and official documentation, ensuring every activity is well-recorded and reports are delivered on time.",
    },
    {
      name: "DESVIA MAHARANI",
      role: lang === "id" ? "Bendahara" : "Treasurer",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/desvia.jpg",
      bio: lang === "id"
        ? "Desvia bertanggung jawab atas pengelolaan keuangan kelompok, termasuk pencatatan pengeluaran operasional dan pelaporan keuangan program kerja."
        : "Desvia is responsible for managing group finances, including recording operational expenses and financial reporting for work programs.",
    },
    {
      name: "FERDYAS MAHENDRA",
      role: lang === "id" ? "Humas" : "Public Relations",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/ferdyas.jpg",
      bio: lang === "id"
        ? "Ferdyas menjadi jembatan komunikasi antara tim KKN dan masyarakat desa, serta berkoordinasi dengan pihak-pihak terkait untuk kelancaran program."
        : "Ferdyas serves as the communication bridge between the KKN team and the village community, coordinating with relevant parties for smooth program execution.",
    },
    {
      name: "MUHAMAD RIPALDI",
      role: lang === "id" ? "Humas" : "Public Relations",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/ripaldi.jpg",
      bio: lang === "id"
        ? "Ripaldi aktif membangun relasi dengan tokoh masyarakat dan pemuda desa untuk memperkuat keterlibatan warga dalam setiap program kerja yang dilaksanakan."
        : "Ripaldi actively builds relationships with community leaders and village youth to strengthen community involvement in every work program.",
    },
    {
      name: "DIPA CAHARA RAKHMAN",
      role: lang === "id" ? "Logistik" : "Logistics",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/dipa.jpg",
      bio: lang === "id"
        ? "Dipa mengatur seluruh kebutuhan logistik dan perlengkapan operasional tim, memastikan setiap program berjalan dengan dukungan material yang memadai."
        : "Dipa manages all logistics and operational equipment needs, ensuring every program runs with adequate material support.",
    },
    {
      name: "IFTAH SYARIFATUNNISA",
      role: lang === "id" ? "PDD" : "Pub, Dec & Doc",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/iftah.jpg",
      bio: lang === "id"
        ? "Iftah bertanggung jawab atas publikasi, dekorasi, dan dokumentasi kegiatan, menciptakan konten visual yang menarik untuk menyebarkan dampak program."
        : "Iftah is responsible for publication, decoration, and activity documentation, creating engaging visual content to spread program impact.",
    },
    {
      name: "DEA PURINTIKA HURUL'AIN",
      role: lang === "id" ? "PDD" : "Pub, Dec & Doc",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/dea.jpg",
      bio: lang === "id"
        ? "Dea membantu dalam pengelolaan media sosial dan pembuatan materi publikasi untuk mendokumentasikan setiap momen penting selama pelaksanaan KKN."
        : "Dea assists in social media management and creating publication materials to document every important moment during KKN implementation.",
    },
    {
      name: "SITI NURMALASARI",
      role: lang === "id" ? "Acara" : "Events",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/mala.jpg",
      bio: lang === "id"
        ? "Siti merancang dan mengoordinasikan seluruh acara dan kegiatan lapangan, dari perencanaan hingga pelaksanaan, memastikan setiap event berjalan lancar."
        : "Siti designs and coordinates all events and field activities, from planning to execution, ensuring every event runs smoothly.",
    },
    {
      name: "KHAIRUNISA",
      role: lang === "id" ? "Acara" : "Events",
      faculty: "Universitas Nusa Putra",
      image: "/team_v4/ica.jpg",
      bio: lang === "id"
        ? "Khairunisa mendukung koordinasi acara dan kegiatan bersama masyarakat, membantu membangun antusiasme warga dalam setiap program yang diadakan."
        : "Khairunisa supports event coordination and community activities, helping build community enthusiasm for every program held.",
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-24">
      {/* Header Section */}
      <header className="mb-16 md:mb-24 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest mb-6">
            {dict.team.crew}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary font-headline tracking-tighter leading-tight mb-6">
            {dict.team.title1} <br />
            <span className="text-secondary italic">{dict.team.title2}</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body leading-relaxed">
            {dict.team.desc}
          </p>
        </div>
        <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl max-w-sm border-l-4 border-secondary shadow-lg">
          <p className="text-zinc-600 font-body italic mb-4">&quot;{dict.team.quote}&quot;</p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full signature-gradient"></div>
            <div>
              <div className="font-bold text-primary font-headline">{dict.common.groupName}</div>
              <div className="text-xs text-secondary font-bold uppercase tracking-widest">{dict.team.mandate}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Grid */}
      <TeamGrid members={teamMembers} closeLabel={dict.team.close} />
    </main>
  );
}
