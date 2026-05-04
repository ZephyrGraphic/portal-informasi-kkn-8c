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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMs7rS3XvIrtgS1O43zPzT2rD1jPzQe1E6w_q8z1_r6Qc1Q6M9G2LwV1w9E_VqI8vQeK2E9Q_Qo7C9u9q4kH9Pq8K4_tV3c7E8O4vQZ9Y9q0P_xW0I5R2u5W9E0N4q_x0F9K9T_rK9_w5C2V4V_g",
      bio: lang === "id"
        ? "Sebagai ketua kelompok, Haikal bertanggung jawab memimpin koordinasi seluruh program kerja dan memastikan kolaborasi yang efektif antara tim dan masyarakat Desa Pangkalan."
        : "As group chairman, Haikal is responsible for leading the coordination of all work programs and ensuring effective collaboration between the team and the people of Pangkalan Village.",
    },
    {
      name: "RAHMANDA PUTRI KUSWARA",
      role: lang === "id" ? "Sekretaris" : "Secretary",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9E9_K2C7K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4Q9J9E4K9K9J4",
      bio: lang === "id"
        ? "Rahmanda mengelola seluruh administrasi dan dokumentasi resmi kelompok, memastikan setiap kegiatan tercatat dengan baik dan laporan tersampaikan tepat waktu."
        : "Rahmanda manages all group administration and official documentation, ensuring every activity is well-recorded and reports are delivered on time.",
    },
    {
      name: "DESVIA MAHARANI",
      role: lang === "id" ? "Bendahara" : "Treasurer",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9OxwhtGwfjIyHVuujYRLkfe3DNcbX6OUW0QEosTiqWK1Gc9ohQJj1_El7r3jCd9HP5QaavLxQkOIX81Y7bnLWzIiIwVRzEtKVn9_34wtyoC1ddBzaCAcUB_3K0OEvsjBTS_CWOckF82rb8xT3FSkwrNHanEjeBtjWGfaVlmIq2yWff9G46xVeu09GbgJ5sT2SaRYYdzMArX4hcX8SbsovY1MAyHt1_Pu0NJCKZAbouxBNm_HAl2E8EOxo9OTMjqcetcGZQKBSQGQ",
      bio: lang === "id"
        ? "Desvia bertanggung jawab atas pengelolaan keuangan kelompok, termasuk pencatatan pengeluaran operasional dan pelaporan keuangan program kerja."
        : "Desvia is responsible for managing group finances, including recording operational expenses and financial reporting for work programs.",
    },
    {
      name: "FERDYAS MAHENDRA",
      role: lang === "id" ? "Humas" : "Public Relations",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyO5mN9orgNY5dpUzl_0B4sa_dRcg82RLOC0opoJHAIeHb94DIvLt69Rs9L_M-aGiDGdMT6ReDC93xayoqILn8p3s5HqLz9dgk158HS4_JI91wGaqaxoQI5C98fQO2NnzYCCASPxX_da70cnwvhFYxtTKx8sFngAIiq_nKSBYZkYb2D-CC874BEeeDCHeduQmr545CVzfvlaQ-rA31gPIbyw8u9gofDQD6eFH3DmKNK955A-WvcLXnCQKXV9gbk2UXCfQP8lm_uHk",
      bio: lang === "id"
        ? "Ferdyas menjadi jembatan komunikasi antara tim KKN dan masyarakat desa, serta berkoordinasi dengan pihak-pihak terkait untuk kelancaran program."
        : "Ferdyas serves as the communication bridge between the KKN team and the village community, coordinating with relevant parties for smooth program execution.",
    },
    {
      name: "MUHAMAD RIPALDI",
      role: lang === "id" ? "Humas" : "Public Relations",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE3GEGOyQjlrOcZlxE8ejPZD5W2wgoBFE7wVM2laqtCJkPbyFP7JpZ5eERJtASIId3K8YVEBUE6e2xFDOvU52E5VRKPmRGL3KFrRyDQjcPvwiiwFoKW3MoIc6geH5uwZFRG-f2nylXrkh0kOVdVVkOlZxNoM3e-hJLNMKbYhAdAgCsPxNnm5po8wg438HI9TnFirO6UDgFQhpPhkDYQZDCnGFuhLrWvtUuykIf-48pN1V7wbXAdla4uWtcsBqvRASJ6m8brNYLCc4",
      bio: lang === "id"
        ? "Ripaldi aktif membangun relasi dengan tokoh masyarakat dan pemuda desa untuk memperkuat keterlibatan warga dalam setiap program kerja yang dilaksanakan."
        : "Ripaldi actively builds relationships with community leaders and village youth to strengthen community involvement in every work program.",
    },
    {
      name: "DIPA CAHARA RAKHMAN",
      role: lang === "id" ? "Logistik" : "Logistics",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMp_f6ewMb5W6JzrG1MgR9hN3VG2ircAI7IX6jAleLyLG2UOVKCABZy8Mjj9-rzzxdRzaTy0ZatsxOHBJhvJKn53-yFYUTF52PbUbRCBpfZaeFZ2XQwVFZ1bLdxp0VF7OnPOuVW43NWTSg3G_hNxjTGCdxIVdi8mGFjsdu-uEurfSEn2YGUCHHurtFJIE-d6i6KZ8K3uqVh80BG39WF8ngLmwmu2vaSH2--P3lEAsAEhJNCd7sMsRfF9ZiNYdIIK6DMhkgvzxL__g",
      bio: lang === "id"
        ? "Dipa mengatur seluruh kebutuhan logistik dan perlengkapan operasional tim, memastikan setiap program berjalan dengan dukungan material yang memadai."
        : "Dipa manages all logistics and operational equipment needs, ensuring every program runs with adequate material support.",
    },
    {
      name: "IFTAH SYARIFATUNNISA",
      role: lang === "id" ? "PDD" : "Pub, Dec & Doc",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv4DjOozRDISiHAFptBDhPSRVRurhLfViie7EJbqF34kRUEuti2qIHi-o22ZLk6rg2JuMXIrAiSpBakJc654mUjbcRmJfBC5lqUB3GPvHwGXR3sb6WeucGQilabdQ6plSh6UAjRtAYsvUXjPBdGmNXojFrkXL1GyscdaDOnKbPVtTNyb0OkMGUgUqktq6UkN_zMpOY9LsNK3gsnEBpTbpZqSHb0x1l14hURzwZHe_uJN2Q9HRK41uG16zbAxuXMu3wcR3H8rX-Ly0",
      bio: lang === "id"
        ? "Iftah bertanggung jawab atas publikasi, dekorasi, dan dokumentasi kegiatan, menciptakan konten visual yang menarik untuk menyebarkan dampak program."
        : "Iftah is responsible for publication, decoration, and activity documentation, creating engaging visual content to spread program impact.",
    },
    {
      name: "DEA PURINTIKA HURUL'AIN",
      role: lang === "id" ? "PDD" : "Pub, Dec & Doc",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOXA0fGO_p4Qv7HsahJ3rdB2vK_sNvbm6pV1504Q8PcdRi3LLoSmyukxSyRezgTBkmvrqPta8BNqQMhtY41Ho5AwsdEUpihxAPrE6D1JtmC_XhamRt5Nra2oJAR8gMaZWGdArEajHEe9-gAoqru-xGq7aWNMsre2CVefWCfb3COoSrHbfWyM-VvTYEsfk9jkqODzVY-ns-dIKWW6isBIG9tMKpNNreuQS5kpn9okZqks73aQEX8h1SkTxwy35HkqNa075YYVanw4I",
      bio: lang === "id"
        ? "Dea membantu dalam pengelolaan media sosial dan pembuatan materi publikasi untuk mendokumentasikan setiap momen penting selama pelaksanaan KKN."
        : "Dea assists in social media management and creating publication materials to document every important moment during KKN implementation.",
    },
    {
      name: "SITI NURMALASARI",
      role: lang === "id" ? "Acara" : "Events",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlaQXWlB4aVWPt5e9QEB_9pxGx_9Y9n19ic4ZSQRSTQVU7n99ltfTKX8GTjwiol013he1iao39mvg1Qz2NppTwIGw0ijkbhNg8i21JL1AZdoaCvM65IMiO3UXWj1t4jJWm1KUfEc1jDfJ9Oj5PWJY7kgbowuZmobqr8M0BAk2OAF_f6yLhq3R9jGQ2jk83pQttVIIa4V1vUNFzpkiaRbaPliAR9qTuhmkNn58-CLFBXTQi76vYFRlqjr5_u-_jVvltQbhfT84tXfo",
      bio: lang === "id"
        ? "Siti merancang dan mengoordinasikan seluruh acara dan kegiatan lapangan, dari perencanaan hingga pelaksanaan, memastikan setiap event berjalan lancar."
        : "Siti designs and coordinates all events and field activities, from planning to execution, ensuring every event runs smoothly.",
    },
    {
      name: "KHAIRUNISA",
      role: lang === "id" ? "Acara" : "Events",
      faculty: "Universitas Nusa Putra",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_c0Q9aDPDxHUee5hMorFn-EsydjGDUka1ItfZnqxYGwbY2GMnx4x4t2Xl5nQvsN30EyUEE-sM9JLNiG4ot-FB_sjaypw9L1OcFRsPBuHqRjaBJCxjPwYhWkyTDQUPcYl7Zx4UxXSOZ-cHPLZcIwB4zF7OHq9I4fjYg5J4MarcIlujrdyt2PbCKEKqgXVP4cGNkl_LFVC3HLEt_1XMmRQ6KBZ2-6FlNPitZOA6P7xK5W95AIRt5OH0NJsEgaSgOoPbprLGCJl7G_o",
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
