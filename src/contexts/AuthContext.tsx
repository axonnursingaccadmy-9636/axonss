import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, type Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { ADMIN_EMAIL } from "@/config/routes";

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: "student" | "admin";
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface AuthContextValue {
  currentUser: FirebaseUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfileName: (newName: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
  authError: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const fetchProfile = async (uid: string): Promise<UserProfile | null> => {
    const profileRef = doc(db, "users", uid);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      return { uid, ...profileSnap.data() } as UserProfile;
    }
    return null;
  };

  const ensureProfile = async (user: FirebaseUser): Promise<UserProfile> => {
    const existing = await fetchProfile(user.uid);
    if (existing) return existing;

    const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const newProfile: Omit<UserProfile, "uid"> = {
      email: user.email || "",
      fullName: user.displayName || (user.email?.split("@")[0] ?? "Student"),
      role: isAdmin ? "admin" : "student",
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), newProfile);
    return { uid: user.uid, ...newProfile };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const fetchedProfile = await ensureProfile(user);
          setProfile(fetchedProfile);
        } catch (err) {
          console.error("Error fetching profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setAuthError(null);
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: fullName });
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const newProfile: Omit<UserProfile, "uid"> = {
      email,
      fullName,
      role: isAdmin ? "admin" : "student",
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", user.uid), newProfile);
    setProfile({ uid: user.uid, ...newProfile });
  };

  const login = async (email: string, password: string) => {
    setAuthError(null);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const fetchedProfile = await fetchProfile(user.uid);
    if (fetchedProfile && !fetchedProfile.isActive) {
      await signOut(auth);
      throw new Error("Your account has been deactivated. Please contact support.");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfileName = async (newName: string) => {
    if (!currentUser) return;
    await updateProfile(currentUser, { displayName: newName });
    await updateDoc(doc(db, "users", currentUser.uid), {
      fullName: newName,
      updatedAt: serverTimestamp(),
    });
    setProfile((prev) => (prev ? { ...prev, fullName: newName } : prev));
  };

  const refreshProfile = async () => {
    if (!currentUser) return;
    const fetched = await fetchProfile(currentUser.uid);
    if (fetched) setProfile(fetched);
  };

  const clearError = () => setAuthError(null);

  const value: AuthContextValue = {
    currentUser,
    profile,
    isAuthenticated: !!currentUser,
    isAdmin: profile?.role === "admin" || currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    isLoading,
    signUp,
    login,
    logout,
    resetPassword,
    updateProfileName,
    refreshProfile,
    clearError,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
