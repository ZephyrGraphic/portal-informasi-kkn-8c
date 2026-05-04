"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface TeamMember {
  name: string;
  role: string;
  faculty: string;
  image: string;
  bio: string;
}

interface TeamGridProps {
  members: TeamMember[];
  closeLabel: string;
}

export default function TeamGrid({ members, closeLabel }: TeamGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const focusTrapRef = useFocusTrap(selectedMember !== null);

  const closeModal = useCallback(() => setSelectedMember(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedMember) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember, closeModal]);

  return (
    <>
      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <button
            key={index}
            onClick={() => setSelectedMember(member)}
            className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 text-left cursor-pointer"
          >
            <div className="relative h-80 w-full overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all z-10 mix-blend-multiply"></div>
              <Image
                alt={`Portrait of ${member.name}`}
                src={member.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 relative bg-white">
              <div className="absolute -top-6 right-8 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="material-symbols-outlined text-xl">arrow_outward</span>
              </div>
              <h3 className="text-2xl font-bold text-primary font-headline mb-1">{member.name}</h3>
              <p className="text-secondary font-bold text-sm tracking-widest uppercase mb-4">{member.role}</p>
              <div className="flex items-center gap-2 text-zinc-500 text-sm font-body">
                <span className="material-symbols-outlined text-lg">school</span>
                {member.faculty}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedMember && (
        <div ref={focusTrapRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-[scaleIn_300ms_ease-out]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined text-primary">close</span>
            </button>

            {/* Photo */}
            <div className="relative h-72 w-full">
              <Image
                alt={`Portrait of ${selectedMember.name}`}
                src={selectedMember.image}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8 text-white">
                <p className="text-secondary-fixed-dim font-bold text-xs tracking-widest uppercase mb-2">{selectedMember.role}</p>
                <h2 id="modal-title" className="text-3xl font-extrabold font-headline tracking-tight">{selectedMember.name}</h2>
              </div>
            </div>

            {/* Info */}
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary">school</span>
                <span className="font-semibold">{selectedMember.faculty}</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed font-body">
                {selectedMember.bio}
              </p>
              <button
                onClick={closeModal}
                className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] hover:shadow-lg"
              >
                {closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
