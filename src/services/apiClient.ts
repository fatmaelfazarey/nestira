// Generic API client for authenticated requests using token from localStorage
// Configure backend URL via Vite env: VITE_API_URL (e.g., http://localhost:4000)

export type SalaryRange = { min?: number; max?: number; currency?: string };

export interface CandidateProfile {
  basicInfo?: {
    fullName?: string;
    role?: string;
    phone?: string;
    email?: string;
    businessEmail?: string;
    linkedin?: string;
    location?: string;
  };
  industry?: { industries?: string[]; subfields?: string[] };
  summary?: string;
  coverLetter?: string;
  experience?: Array<{
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    achievements?: string[];
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills?: {
    technical?: string[];
    software?: string[];
    certifications?: string[];
    languages?: string[];
  };
  video?: { hasVideo?: boolean; status?: string };
  behavioral?: { completed?: boolean; status?: string };
  preferences?: {
    jobTitles?: string[];
    locations?: string[];
    workType?: string;
    visaStatus?: string;
    noticePeriod?: string;
    salaryRange?: SalaryRange;
  };
}

const getBaseUrl = () => {
  const url = (import.meta as any)?.env?.VITE_API_URL as string | undefined;
  return url || "http://localhost:4000";
};

const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    let message = `Request failed with ${res.status}`;
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch {}
    throw new Error(message);
  }
  // 204 No Content
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

// Fetch candidate profile for the logged-in user using token; role filter is sent as query param
export async function getCandidateProfile(): Promise<CandidateProfile> {
  // Prefer a conventional endpoint, but allow override via env if needed later
  // Default: /api/profile/me?role=candidate
  return request<CandidateProfile>(`/api/profile/me?role=candidate`, {
    method: "GET",
  });
}

// Update candidate profile
export async function updateCandidateProfile(
  payload: CandidateProfile
): Promise<CandidateProfile> {
  // Default: PATCH same endpoint
  return request<CandidateProfile>(`/api/profile/me?role=candidate`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
