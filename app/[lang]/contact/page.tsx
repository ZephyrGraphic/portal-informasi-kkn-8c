import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDesc,
  };
}

export default async function Contact(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as "en" | "id";
  const dict = await getDictionary(lang);

  return (
    <main className="max-w-7xl mx-auto px-8 pt-32 pb-24">
      {/* Editorial Header */}
      <header className="mb-20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-primary"></div>
          <span className="text-primary font-semibold tracking-widest text-xs uppercase">{dict.contact.tag}</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-on-surface tracking-tighter max-w-3xl leading-[1.1] font-headline">
          {dict.contact.title1} <br />{dict.contact.title2}
        </h1>
        <p className="mt-8 text-xl text-on-surface-variant max-w-xl leading-relaxed">
          {dict.contact.desc}
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Form Section */}
        <section className="lg:col-span-7">
          <ContactForm dict={dict.contact} />
        </section>
        {/* Information Section */}
        <aside className="lg:col-span-5 space-y-16">
          {/* University Contact */}
          <div className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary-container text-on-secondary-container rounded-lg">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <h3 className="text-2xl font-bold font-headline">{dict.contact.universityContact}</h3>
            </div>
            <div className="space-y-4 text-on-surface-variant">
              <p className="font-medium text-on-surface">{dict.common.university}</p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">call</span>
                {dict.common.phone}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">mail</span>
                {dict.common.email}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {dict.common.address}
              </p>
            </div>
          </div>
          {/* Village Posko */}
          <div className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-container text-on-primary-container rounded-lg">
                <span className="material-symbols-outlined">bungalow</span>
              </div>
              <h3 className="text-2xl font-bold font-headline">{dict.contact.basecamp}</h3>
            </div>
            <div className="space-y-4 text-on-surface-variant">
              <p className="font-medium text-on-surface">{dict.common.groupName} Basecamp</p>
              <p className="flex items-start gap-3">
                <span className="material-symbols-outlined text-sm mt-1">location_on</span>
                {dict.common.location}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">person</span>
                {dict.common.coordinator}
              </p>
            </div>
          </div>
          {/* Impact Badge */}
          <div className="inline-flex items-center gap-3 bg-primary-container/10 border border-primary-container/20 px-6 py-3 rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-bold text-primary uppercase tracking-widest">{dict.common.officeHours}</span>
          </div>
        </aside>
      </div>
      {/* Placeholder Map View */}
      <section className="mt-20 overflow-hidden rounded-xl bg-surface-container-high aspect-[21/9] relative group">
        <Image
          alt="Minimalist top-down map view of a rural village surrounded by lush green forests and organic farmland with clean typography labels"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ysLR-BrxTg2gbqyGMaUu4oXKVx6UApt-qwWOwdJscF99q3iyZdvbTRfmwA23T3C02bAHQ7rSLe-IyRMpE4gBcuThqsTmaqYKYWyHKfWPD8-LsFPE8l7BbIINIjY2HfLxdYxHKoNGpU13hEN-Wlwn72A0SCvbs_ZNTdBn3FaUsO1sEt7K5OFFHR5spJN8CJ7346FhoC8v72UogyfTCXg7rC-QddhDikqC1Z12LdzrWxy0pBTuAh4MEYXKQc4V9PRxjLKg1J0I8hc"
          fill
          sizes="100vw"
          className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
        />
        {/* Map Overlay UI */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-4 shadow-2xl rounded-lg flex items-center gap-4 border border-outline-variant/20 backdrop-blur-sm">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-tighter text-secondary">Posko {dict.common.groupName}</p>
              <p className="text-sm font-semibold">{dict.common.programName}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
