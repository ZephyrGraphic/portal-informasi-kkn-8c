/**
 * Type definitions for the i18n dictionary system.
 * Ensures type-safety across all components consuming dictionary data.
 */

export interface CommonDict {
  programName: string;
  groupName: string;
  university: string;
  location: string;
  membersCount: string;
  contact: string;
  universityCity: string;
  supervisorLabel: string;
  groupVillageLabel: string;
  phone: string;
  email: string;
  address: string;
  coordinator: string;
  officeHours: string;
  villageElevation: string;
  photos: string;
}

export interface NavDict {
  home: string;
  villageProfile: string;
  programs: string;
  team: string;
  logbook: string;
  gallery: string;
}

export interface FooterDict {
  copyright: string;
  privacyPolicy: string;
  contactSupport: string;
  universityPortal: string;
}

export interface HomeDict {
  heroTag: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  explorePrograms: string;
  meetTheTeam: string;
  aboutTitle1: string;
  aboutTitle2: string;
  aboutDesc: string;
  daysActive: string;
  keyProjects: string;
  impactedLives: string;
  communityFirst: string;
  communityQuote: string;
  educationDesc: string;
  viewCurriculum: string;
  techDesc: string;
  exploreSystems: string;
  healthDesc: string;
  ourImpact: string;
  stayUpdated: string;
  stayUpdatedDesc: string;
  emailPlaceholder: string;
  joinUs: string;
  subscribedSuccess: string;
  subscribedError: string;
}

export interface ContactDict {
  tag: string;
  title1: string;
  title2: string;
  desc: string;
  formTitle: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  successTitle: string;
  successDesc: string;
  errorDesc: string;
  universityContact: string;
  basecamp: string;
  metaTitle: string;
  metaDesc: string;
}

export interface Dictionary {
  common: CommonDict;
  nav: NavDict;
  footer: FooterDict;
  home: HomeDict;
  profile: {
    title1: string;
    title2: string;
    desc: string;
    exploreData: string;
    population: string;
    agrarian: string;
    schools: string;
    waterSources: string;
    economyTitle: string;
    economyDesc1: string;
    economyDesc2: string;
    metaTitle: string;
    metaDesc: string;
  };
  programs: {
    title: string;
    desc: string;
    all: string;
    education: string;
    tech: string;
    health: string;
    environment: string;
    readReport: string;
    metaTitle: string;
    metaDesc: string;
  };
  programDetail: {
    backToPrograms: string;
    interestedTitle: string;
    interestedDesc: string;
    getInTouch: string;
  };
  team: {
    crew: string;
    title1: string;
    title2: string;
    desc: string;
    quote: string;
    mandate: string;
    close: string;
    metaTitle: string;
    metaDesc: string;
  };
  logbook: {
    title: string;
    desc: string;
    search: string;
    loadMore: string;
    noResults: string;
    allLoaded: string;
    photos: string;
    metaTitle: string;
    metaDesc: string;
  };
  gallery: {
    tag: string;
    title1: string;
    title2: string;
    desc: string;
    exploreMore: string;
    allPhotos: string;
    community: string;
    allLoaded: string;
    close: string;
    prevPhoto: string;
    nextPhoto: string;
    metaTitle: string;
    metaDesc: string;
  };
  contact: ContactDict;
}
