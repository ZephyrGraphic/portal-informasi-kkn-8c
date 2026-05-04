import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import GalleryGrid from "@/components/GalleryGrid";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  return {
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDesc,
  };
}

export default async function Gallery(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  const galleryItems = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9OxwhtGwfjIyHVuujYRLkfe3DNcbX6OUW0QEosTiqWK1Gc9ohQJj1_El7r3jCd9HP5QaavLxQkOIX81Y7bnLWzIiIwVRzEtKVn9_34wtyoC1ddBzaCAcUB_3K0OEvsjBTS_CWOckF82rb8xT3FSkwrNHanEjeBtjWGfaVlmIq2yWff9G46xVeu09GbgJ5sT2SaRYYdzMArX4hcX8SbsovY1MAyHt1_Pu0NJCKZAbouxBNm_HAl2E8EOxo9OTMjqcetcGZQKBSQGQ",
      alt: "wide shot of university students working with local farmers in a bright green rice field under soft morning sunlight",
      category: "programs",
      title: lang === "id" ? "Workshop Pertanian Berkelanjutan" : "Sustainable Agriculture Workshop",
      description: lang === "id" ? "Sesi kolaboratif teknik irigasi organik modern dengan tetua desa." : "Collaborative session on modern organic irrigation techniques with village elders.",
      span: "md:col-span-8",
      aspectClass: "aspect-[16/9]",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyO5mN9orgNY5dpUzl_0B4sa_dRcg82RLOC0opoJHAIeHb94DIvLt69Rs9L_M-aGiDGdMT6ReDC93xayoqILn8p3s5HqLz9dgk158HS4_JI91wGaqaxoQI5C98fQO2NnzYCCASPxX_da70cnwvhFYxtTKx8sFngAIiq_nKSBYZkYb2D-CC874BEeeDCHeduQmr545CVzfvlaQ-rA31gPIbyw8u9gofDQD6eFH3DmKNK955A-WvcLXnCQKXV9gbk2UXCfQP8lm_uHk",
      alt: "portrait of an elderly smiling village resident holding a traditional craft in warm indoor lighting",
      category: "community",
      title: lang === "id" ? `Wajah ${dict.common.location.split(',')[0]}` : `The Face of ${dict.common.location.split(',')[0]}`,
      description: lang === "id" ? "Kebijaksanaan dan kehangatan yang dibagikan selama malam pertukaran budaya." : "Wisdom and warmth shared during the cultural exchange evening.",
      span: "md:col-span-4",
      aspectClass: "aspect-[3/4]",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE3GEGOyQjlrOcZlxE8ejPZD5W2wgoBFE7wVM2laqtCJkPbyFP7JpZ5eERJtASIId3K8YVEBUE6e2xFDOvU52E5VRKPmRGL3KFrRyDQjcPvwiiwFoKW3MoIc6geH5uwZFRG-f2nylXrkh0kOVdVVkOlZxNoM3e-hJLNMKbYhAdAgCsPxNnm5po8wg438HI9TnFirO6UDgFQhpPhkDYQZDCnGFuhLrWvtUuykIf-48pN1V7wbXAdla4uWtcsBqvRASJ6m8brNYLCc4",
      alt: "close-up of student hands planting a small tree sapling in rich dark soil during reforestation event",
      category: "environment",
      title: lang === "id" ? "Inisiatif Hijau" : "Green Initiative",
      description: lang === "id" ? "Menanam 500+ bibit pohon asli di lembah." : "Planting 500+ native saplings in the valley.",
      span: "md:col-span-4",
      aspectClass: "aspect-square",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMp_f6ewMb5W6JzrG1MgR9hN3VG2ircAI7IX6jAleLyLG2UOVKCABZy8Mjj9-rzzxdRzaTy0ZatsxOHBJhvJKn53-yFYUTF52PbUbRCBpfZaeFZ2XQwVFZ1bLdxp0VF7OnPOuVW43NWTSg3G_hNxjTGCdxIVdi8mGFjsdu-uEurfSEn2YGUCHHurtFJIE-d6i6KZ8K3uqVh80BG39WF8ngLmwmu2vaSH2--P3lEAsAEhJNCd7sMsRfF9ZiNYdIIK6DMhkgvzxL__g",
      alt: "group of children and students laughing and drawing together in a bright outdoor community classroom",
      category: "programs",
      title: lang === "id" ? "Hari Pendidikan" : "Education Day",
      description: lang === "id" ? "Sesi terapi seni kreatif di sekolah lokal." : "Creative art therapy session at the local school.",
      span: "md:col-span-4",
      aspectClass: "aspect-square",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBan4fb8m9L5uLtC_IYA8dtNHVXp9uAOTS2uWUUyBfx56WABqtf1cecmbiGhgDgwFyX-twpkqjnukpq4Rn8zZcYgbVbsMnNHWQPrQ5nREW3UzvI5ZT2jxV8yuhjqzXub6-WBbJVZ0dJlWil94vZ5GUUH_tugMJARVRUcPPIGq0vRJResIJpo0jESwjQgpcy8f_GqVqsRBSW_NTCLj-ni5mCvuXv3bIIcPcc8zvIM5Sb-uEumYxotC6Qcr-Y_bU4neMohc3HGLpJIjw",
      alt: "panoramic mountain landscape of Pangkalan village during sunset with golden clouds and rolling hills",
      category: "environment",
      title: lang === "id" ? "Lembah Emas" : "The Golden Valley",
      description: lang === "id" ? "Pemandangan golden hour dari pos observasi base camp." : "Golden hour views from the base camp observatory.",
      span: "md:col-span-4",
      aspectClass: "aspect-square",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvX8121LNiIHI559MnqMD07aJC71wTM4eAVcw6oP56VoHJ93tQQqErkmdrCSp_lbwOsVCeOvtxMblCm68tEEAhKyysNTUggphDq_uPc9B8Blo7VUOVMzYjL6Lxk4U-GQL7Z1aap7jZql15JXbAQL19LPHGHGdhjUhrTKIjMxWIygLQUBTrkVs8SW8nAJbCf-_fFlQ5wJ1gXpTJmKWdD3VTwVOstA7wUsOlVDyIXjlMTqW-K82rG2PYIRs8CrajItR50e0_rsiwpuk",
      alt: "long table of community feast with traditional Indonesian food and many people sitting together happily",
      category: "community",
      title: lang === "id" ? "Makan Malam Persatuan" : "Unity Dinner",
      description: lang === "id" ? "Pesta penutupan dengan lebih dari 200 warga desa dan peserta mahasiswa." : "Closing ceremony feast with over 200 village residents and student participants.",
      span: "md:col-span-12",
      aspectClass: "h-64 md:h-80",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv4DjOozRDISiHAFptBDhPSRVRurhLfViie7EJbqF34kRUEuti2qIHi-o22ZLk6rg2JuMXIrAiSpBakJc654mUjbcRmJfBC5lqUB3GPvHwGXR3sb6WeucGQilabdQ6plSh6UAjRtAYsvUXjPBdGmNXojFrkXL1GyscdaDOnKbPVtTNyb0OkMGUgUqktq6UkN_zMpOY9LsNK3gsnEBpTbpZqSHb0x1l14hURzwZHe_uJN2Q9HRK41uG16zbAxuXMu3wcR3H8rX-Ly0",
      alt: "students documenting activities with cameras and laptops in the village",
      category: "programs",
      title: lang === "id" ? "Tim Dokumentasi" : "Documentation Team",
      description: lang === "id" ? "Mendokumentasikan setiap momen berharga selama program KKN." : "Documenting every precious moment during the KKN program.",
      span: "md:col-span-6",
      aspectClass: "aspect-[4/3]",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_c0Q9aDPDxHUee5hMorFn-EsydjGDUka1ItfZnqxYGwbY2GMnx4x4t2Xl5nQvsN30EyUEE-sM9JLNiG4ot-FB_sjaypw9L1OcFRsPBuHqRjaBJCxjPwYhWkyTDQUPcYl7Zx4UxXSOZ-cHPLZcIwB4zF7OHq9I4fjYg5J4MarcIlujrdyt2PbCKEKqgXVP4cGNkl_LFVC3HLEt_1XMmRQ6KBZ2-6FlNPitZOA6P7xK5W95AIRt5OH0NJsEgaSgOoPbprLGCJl7G_o",
      alt: "village children playing traditional games in the schoolyard",
      category: "community",
      title: lang === "id" ? "Permainan Tradisional" : "Traditional Games",
      description: lang === "id" ? "Anak-anak desa bermain permainan tradisional di halaman sekolah." : "Village children playing traditional games in the schoolyard.",
      span: "md:col-span-6",
      aspectClass: "aspect-[4/3]",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-24">
      {/* Header Section */}
      <header className="mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              {dict.gallery.tag}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tight leading-none mb-6">
              {dict.gallery.title1} <span className="text-secondary">{dict.gallery.title2}</span>
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-body">
              {dict.gallery.desc}
            </p>
          </div>
        </div>
      </header>

      {/* Interactive Gallery Grid */}
      <GalleryGrid items={galleryItems} dict={dict.gallery} programsDict={dict.programs} />
    </main>
  );
}
