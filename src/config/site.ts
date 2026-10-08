export const SITE_CONFIG = {
  name: "AXON",
  tagline: "Master Nursing Exams with Confidence",
  description:
    "Premium nursing exam preparation platform for NORCET, NCLEX, M.Sc Nursing, Staff Nurse & B.Sc Nursing exams.",
  supportEmail: "support@axonprep.in",
  supportPhone: "+91 98765 43210",
  examCategories: [
    { id: "norcet", name: "NORCET", icon: "Stethoscope", description: "AIIMS Nursing Officer Recruitment" },
    { id: "nclex", name: "NCLEX", icon: "Globe", description: "US Nursing Licensure Exam" },
    { id: "msc", name: "M.Sc Nursing", icon: "GraduationCap", description: "Postgraduate Nursing Entrance" },
    { id: "staff-nurse", name: "Staff Nurse", icon: "HeartPulse", description: "Staff Nurse Recruitment" },
    { id: "bsc", name: "B.Sc Nursing", icon: "BookOpen", description: "B.Sc Nursing Entrance Exam" },
  ],
  socialLinks: {
    youtube: "https://youtube.com",
    telegram: "https://telegram.org",
    instagram: "https://instagram.com",
    whatsapp: "https://whatsapp.com",
  },
} as const;
