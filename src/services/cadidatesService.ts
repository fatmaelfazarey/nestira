// services/candidatesService.ts
import { collection, query, where, getDocs, Timestamp, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

export interface Candidate {
    id: string;
    uid: string;
    email: string;
    role: string;
    basicInfo: {
        fullName: string;
        role?: string;
        email: string;
        businessEmail?: string;
        phone?: string;
        location?: string;
        linkedin?: string;
        profilePhoto?: string;
    };
    experience: Array<{
        title: string;
        company: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        location?: string;
        achievements?: string[];
    }>;
    education: Array<{
        degree: string;
        institution: string;
        field?: string;
        graduationYear?: number;
        startDate?: string;
        endDate?: string;
        gpa?: string;
    }>;
    skills: {
        technical: string[];
        software: string[];
        certifications: string[];
        languages: string[];
    };
    industry: {
        industries: string[];
        subfields: string[];
    };
    summary: string;
    coverLetter: string;
    preferences: {
        jobTitles: string[];
        locations: string[];
        workType: string;
        visaStatus: string;
        noticePeriod: string;
        salaryRange: {
            currency: string;
            min?: number;
            max?: number;
        };
    };
    profilePhoto: string;
    profileCompletion: number;
    createdAt: Timestamp | Date;
    updatedAt: Timestamp | Date;
    isActive: boolean;
    isVerified?: boolean;
}

export const fetchCandidates = async (): Promise<Candidate[]> => {
    try {
        const q = query(
            collection(db, "users"),
            where("role", "==", "candidate")
        );

        const snapshot = await getDocs(q);
        const candidatesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Candidate[];

        console.log("All candidates:", candidatesData);

        // Filter only unverified candidates
        // const unverifiedCandidates = candidatesData.filter(candidate => !candidate.isVerified);
        // console.log("Unverified candidates:", unverifiedCandidates);

        return candidatesData;
    } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("Failed to load candidates");
        throw error;
    }
};


export const fetchCandidateById = async (id: string): Promise<Candidate | null> => {
    if (!id) return null;

    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.warn(`Candidate with id ${id} not found`);
            return null;
        }

        const candidateData = {
            id: docSnap.id,
            ...docSnap.data(),
        } as Candidate;

        console.log("Fetched candidate:", candidateData);
        return candidateData;

    } catch (error) {
        console.error("Error fetching candidate by ID:", error);
        throw error;
    }
};


export const verifyCandidate = async (candidateId: string): Promise<void> => {
    try {
        const { updateDoc, doc } = await import("firebase/firestore");
        const candidateRef = doc(db, 'users', candidateId);
        await updateDoc(candidateRef, {
            isVerified: true,
            updatedAt: new Date()
        });
        toast.success('Candidate verified successfully');
    } catch (error) {
        console.error('Error verifying candidate:', error);
        toast.error('Failed to verify candidate');
        throw error;
    }
};

export const deleteCandidate = async (candidateId: string): Promise<void> => {
    try {
        const { deleteDoc, doc } = await import("firebase/firestore");
        const candidateRef = doc(db, 'users', candidateId);
        await deleteDoc(candidateRef);
        toast.success('Candidate deleted successfully');
    } catch (error) {
        console.error('Error deleting candidate:', error);
        toast.error('Failed to delete candidate');
        throw error;
    }
};