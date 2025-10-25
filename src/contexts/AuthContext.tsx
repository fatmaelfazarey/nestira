import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,



  sendPasswordResetEmail,
  updateEmail,
  updatePassword,


  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  verifyBeforeUpdateEmail
} from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";




export interface CandidateData {
  uid: string;
  email: string;
  role: "candidate";
  basicInfo?: {
    fullName: string;
    role?: string;
    email?: string;
    phone: string;
    location: string;
    businessEmail?: string;
    linkedin?: string;
  };
  experience?: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills?: {
    technical: string[];
    software: string[];
    certifications: string[];
    languages: string[];
  };
  industry?: {
    industries: string[];
    subfields: string[];
  };
  summary?: string;
  coverLetter?: string;
  video?: {
    hasVideo?: boolean;
    videoUrl?: string;
    recordingDate?: string;
    status: 'not_started' | 'recording' | 'uploaded' | 'approved'
  };
  behavioral?: {
    completed?: boolean;
    status: 'not_started' | 'in_progress' | 'completed'
  };
  preferences?: {
    jobTitles: string[];
    locations: string[];
    workType?: string;
    visaStatus?: string;
    noticePeriod?: string;
    salaryRange?: {
      min?: number;
      max?: number;
      currency?: string
    };
  };
  profilePhoto?: string;
  profileCompletion?: number;
  createdAt?: Date | Timestamp;
  updatedAt?: Date | Timestamp;
  isActive?: boolean;
}

interface RecruiterData {
  uid: string;
  email: string;
  role: "recruiter";
  recruiterType?: "individual" | "company"; // Individual Recruiter or Company Representative
  personalInfo?: {
    fullName: string;
    rolePosition?: string; // e.g., "HR Manager"
    phone: string;
    businessEmail: string;
    profilePhoto?: string;
  };
  companyInfo?: {
    companyName: string;
    companyLogo?: string;
    linkedinUrl: string;
    industry: string;
    websiteUrl?: string;
    description?: string;
    companySize?: "1-10" | "11-50" | "51-200" | "200+";
    yearFounded?: string;
    companyType?: string; // e.g., "Startup", "Enterprise", etc.
    verificationDocument?: string; // URL to uploaded document
  };
  integrations?: {
    googleMeet: { connected: boolean; email?: string };
    googleCalendar: { connected: boolean; email?: string };
    gmail: { connected: boolean; email?: string };
  };
  security?: {
    twoFactorEnabled?: boolean;
  };
  profileCompletion?: number;
  createdAt?: Date | Timestamp;
  updatedAt?: Date | Timestamp;
  isActive?: boolean;
}

type UserData = CandidateData | RecruiterData;

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, profileData: Partial<UserData>) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;

  // update mail and password
  resetPassword: (email: string) => Promise<void>;
  updateUserEmail: (currentPassword: string,
    newEmail: string) => Promise<void>;
  updateUserPassword: (currentPassword: string,
    newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (
    email: string,
    password: string,
    profileData: Partial<UserData>
  ): Promise<User> => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      let userDoc: UserData;

      if (profileData.role === "recruiter") {
        userDoc = {
          uid,
          email,
          role: "recruiter",
          recruiterType: profileData.recruiterType || "individual",
          personalInfo: profileData.personalInfo || {
            fullName: "",
            phone: "",
            businessEmail: email
          },
          companyInfo: profileData.companyInfo || {
            companyName: "",
            linkedinUrl: "",
            industry: ""
          },
          integrations: {
            googleMeet: { connected: false },
            googleCalendar: { connected: false },
            gmail: { connected: false }
          },
          security: {
            twoFactorEnabled: false
          },
          profileCompletion: profileData.profileCompletion || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true
        } as RecruiterData;
      } else {

        userDoc = {
          uid,
          email,
          role: "candidate",
          basicInfo: profileData.basicInfo,
          experience: profileData.experience || [],
          education: profileData.education || [],
          skills: {
            technical: profileData.skills?.technical || [],
            software: profileData.skills?.software || [],
            certifications: profileData.skills?.certifications || [],
            languages: profileData.skills?.languages || []
          },
          industry: {
            industries: profileData.industry?.industries || [],
            subfields: profileData.industry?.subfields || []
          },
          summary: profileData.summary || "",
          coverLetter: profileData.coverLetter || "",
          preferences: {
            jobTitles: profileData.preferences?.jobTitles || [],
            locations: profileData.preferences?.locations || [],
            workType: profileData.preferences?.workType || "",
            visaStatus: profileData.preferences?.visaStatus || "",
            noticePeriod: profileData.preferences?.noticePeriod || "",
            salaryRange: profileData.preferences?.salaryRange || { currency: 'AED' }
          },
          video: profileData.video || { status: 'not_started' },
          behavioral: profileData.behavioral || { status: 'not_started' },
          profilePhoto: profileData.profilePhoto || "",
          profileCompletion: profileData.profileCompletion || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true
        } as CandidateData;
      }

      await setDoc(doc(db, "users", uid), userDoc);

      try {
        const token = await userCred.user.getIdToken();
        localStorage.setItem("token", token);
      } catch { }

      return userCred.user;
    } catch (error: any) {
      console.error("Signup error:", error);
      throw new Error(error.message || "Failed to create account");
    }
  };


  const login = async (email: string, password: string): Promise<User> => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      try {
        const token = await userCred.user.getIdToken();
        localStorage.setItem("token", token);
      } catch { }
      return userCred.user;
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Failed to login");
    }
  };


  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserData(null);
      try { localStorage.removeItem("token"); } catch { }
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.message || "Failed to logout");
    }
  };


  const updateUserProfile = async (data: Partial<UserData>): Promise<void> => {
    if (!currentUser) throw new Error("No user logged in");

    try {
      const userRef = doc(db, "users", currentUser.uid);

      let updatedData = { ...data };

      if (userData?.role === "candidate") {
        updatedData.profileCompletion = calculateCandidateCompletion({ ...userData, ...data } as CandidateData);
      } else if (userData?.role === "recruiter") {
        updatedData.profileCompletion = calculateRecruiterCompletion({ ...userData, ...data } as RecruiterData);
      }

      await setDoc(userRef, {
        ...updatedData,
        updatedAt: new Date()
      }, { merge: true });

      setUserData(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw new Error(error.message || "Failed to update profile");
    }
  };


  const calculateCandidateCompletion = (data: CandidateData): number => {
    let progress = 0;

    if (data.basicInfo?.fullName && data.basicInfo?.email && data.basicInfo?.phone && data.basicInfo?.location) {
      progress += 15;
    }
    if (data.basicInfo?.role) progress += 5;
    if (data.basicInfo?.linkedin || data.profilePhoto) progress += 5;
    if (data.experience && data.experience.length > 0 && data.experience[0].title && data.experience[0].company) {
      progress += 20;
    }
    if (data.education && data.education.length > 0 && data.education[0].degree && data.education[0].institution) {
      progress += 15;
    }
    if (data.skills?.technical && data.skills.technical.length > 0) progress += 5;
    if (data.skills?.certifications && data.skills.certifications.length > 0) progress += 5;
    if (data.skills?.languages && data.skills.languages.length > 0) progress += 5;
    if (data.industry?.industries && data.industry.industries.length > 0) progress += 10;
    if (data.summary) progress += 10;
    if (data.preferences?.workType) progress += 5;

    return progress;
  };

  const calculateRecruiterCompletion = (data: RecruiterData): number => {
    let progress = 0;

    // Personal Info (30%)
    if (data.personalInfo?.fullName) progress += 10;
    if (data.personalInfo?.phone) progress += 5;
    if (data.personalInfo?.businessEmail) progress += 5;
    if (data.personalInfo?.rolePosition) progress += 5;
    if (data.personalInfo?.profilePhoto) progress += 5;

    // Company Info (50%)
    if (data.companyInfo?.companyName) progress += 10;
    if (data.companyInfo?.linkedinUrl) progress += 10;
    if (data.companyInfo?.industry) progress += 10;
    if (data.companyInfo?.description) progress += 10;
    if (data.companyInfo?.verificationDocument) progress += 10;

    // Integrations (20%)
    if (data.integrations?.googleMeet?.connected) progress += 7;
    if (data.integrations?.googleCalendar?.connected) progress += 7;
    if (data.integrations?.gmail?.connected) progress += 6;

    return progress;
  };


  const fetchUserData = async (uid: string) => {
    try {
      // console.log("Fetching user data for:", uid);
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        // console.log("User data fetched successfully:", data);
        setUserData(data);
      } else {
        console.warn("User document does not exist in Firestore");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };


  // //#region update authen
  // const resetPassword = (email: string) => {
  //   return sendPasswordResetEmail(auth, email);
  // }

  // const updateUserEmail = async (newEmail: string, currentPassword: string) => {
  //   const user = auth.currentUser;
  //   if (!user) throw new Error("No user is currently signed in");

  //   const credential = EmailAuthProvider.credential(user.email!, currentPassword);
  //   await reauthenticateWithCredential(user, credential);
  //   await updateEmail(user, newEmail);
  // };

  // const updateUserPassword = async (newPassword: string, currentPassword: string) => {
  //   const user = auth.currentUser;
  //   if (!user) throw new Error("No user is currently signed in");

  //   const credential = EmailAuthProvider.credential(user.email!, currentPassword);
  //   await reauthenticateWithCredential(user, credential);
  //   await updatePassword(user, newPassword);
  // };
  // //#endregion

  //#region update authen
  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  // const updateUserEmail = (email: string): Promise<void> => {
  //   if (!auth.currentUser) {
  //     return Promise.reject(new Error("No user is currently logged in."));
  //   }
  //   return updateEmail(auth.currentUser, email);
  // };

  //   const testVerification = async () => {
  //   if (auth.currentUser) {
  //     await sendEmailVerification(auth.currentUser);
  //     alert("Verification email sent!");
  //   } else {
  //     alert("No user logged in.");
  //   }
  // };

  const reauthenticateUser = async (currentPassword: string) => {
    if (!auth.currentUser || !auth.currentUser.email)
      throw new Error("No user logged in");

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
  };


  const updateUserEmail = async (currentPassword: string, newEmail: string) => {
    try {
      // Step 1: reauthenticate
      await reauthenticateUser(currentPassword);

      // // Step 3: send verification to new email
      // await sendEmailVerification(auth.currentUser!);

      // // Step 2: update email
      // await updateEmail(auth.currentUser!, newEmail);

      await verifyBeforeUpdateEmail(auth.currentUser!, newEmail);

      alert(
        `Verification email sent to ${newEmail}. Please check your inbox and verify before logging in again.`
      );
    } catch (error) {
      console.error("Error updating email:", error);
      alert(error.message);
    }
  };

  // const updateUserPassword = (password: string): Promise<void> => {
  //   if (!auth.currentUser) {
  //     console.log('auth.currentUser', auth.currentUser)
  //     return Promise.reject(new Error("No user is currently logged in."));
  //   }
  //   return updatePassword(auth.currentUser, password);
  // };

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    if (!auth.currentUser || !auth.currentUser.email) {
      // console.log("auth.currentUser", auth.currentUser);
      return Promise.reject(new Error("No user is currently logged in."));
    }

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      //  Step 1: Reauthenticate the user
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update the password after successful reauthentication
      await updatePassword(user, newPassword);

      // console.log("Password updated successfully!");
    } catch (error: any) {
      console.error("Error updating password:", error);

      if (error.code === "auth/requires-recent-login") {
        throw new Error("Please log in again before changing your password.");
      }

      throw error;
    }
  };
  //#endregion

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? user.uid : "No user");
      setCurrentUser(user);

      if (user) {
        await fetchUserData(user.uid);
      } else {
        console.log("No user - clearing userData");
        setUserData(null);
      }

      setLoading(false);

    });
    // testVerification()

    return () => unsubscribe();


  }, []);



  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    updateUserProfile,

    resetPassword,
    updateUserEmail,
    updateUserPassword,

  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};