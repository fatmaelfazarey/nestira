// services/candidatesService.ts
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

export const fetchEmployerData = async (employerID: any) => {
    try {
        const q = query(
            collection(db, "users"),
            where("uid", "==", employerID)
        );

        const snapshot = await getDocs(q);
        const employerData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return employerData[0];
    } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("Failed to load candidates");
        throw error;
    }
};


export const fetchAllRecruiters = async () => {
    try {
        const q = query(
            collection(db, "users"),
            where("role", "==", "recruiter")
        );

        const snapshot = await getDocs(q);
        const RecruitersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("All Recruiters:", RecruitersData);

        return RecruitersData;
    } catch (error) {
        console.error("Error fetching Recruiters:", error);
        toast.error("Failed to load Recruiters");
        throw error;
    }
};