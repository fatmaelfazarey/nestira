import { z } from 'zod';

export const resumeSchema = z.object({
    // 1. Personal Information
    personalInfo: z.object({
        fullName: z.string().min(1, 'Full name is required'),
        jobTitle: z.string().min(1, 'Job title is required'), // Critical for ATS
        email: z.string().email('Valid email is required'),
        phone: z.string().min(1, 'Phone number is required'),
        location: z.string().optional(), // City, State only for ATS
        linkedin: z.string().optional(),
        portfolio: z.string().optional(),
    }),

    // 2. Work Experience
    workExperience: z.array(z.object({
        id: z.string(),
        company: z.string().min(1, 'Company name is required'),
        jobTitle: z.string().min(1, 'Job title is required'),
        startDate: z.string(),
        endDate: z.string(),
        current: z.boolean().default(false),
        description: z.string().min(1, 'Description is required'),
        achievements: z.array(z.string()).default([]),
    })),

    // 3. Education
    education: z.array(z.object({
        id: z.string(),
        institution: z.string().min(1, 'Institution name is required'),
        degree: z.string().min(1, 'Degree is required'),
        field: z.string().optional(),
        graduationYear: z.string(),
        gpa: z.string().optional(),
        honors: z.string().optional(),
    })),

    // 4. Skills (ATS Focus Area)
    skills: z.object({
        technical: z.array(z.string()).min(1, 'Add at least one technical skill'),
        soft: z.array(z.string()).optional(),
        tools: z.array(z.string()).optional(),
        certifications: z.array(z.string()).optional(),
    }),

    // 5. Professional Summary (For ATS optimization)
    professionalSummary: z.string().min(50, 'Summary should be at least 50 characters').max(500),

    // 6. ATS Optimization
    atsKeywords: z.array(z.string()).optional(),
    targetJobTitle: z.string().optional(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;