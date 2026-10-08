import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logoUrl: string | null;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    youtube: string;
    telegram: string;
    instagram: string;
    whatsapp: string;
  };
}

const defaultSettings: SiteSettings = {
  siteName: "AXON",
  tagline: "Master Nursing Exams with Confidence",
  description: "Premium nursing exam preparation platform.",
  logoUrl: null,
  contactEmail: "support@axonprep.in",
  contactPhone: "+91 98765 43210",
  socialLinks: {
    youtube: "https://youtube.com",
    telegram: "https://telegram.org",
    instagram: "https://instagram.com",
    whatsapp: "https://whatsapp.com",
  },
};

interface SiteSettingsContextValue {
  settings: SiteSettings;
  updateSettings: (partial: Partial<SiteSettings>) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  const updateSettings = (partial: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  return ctx;
}
