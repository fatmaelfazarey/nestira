
interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  country: string;
  experience: string;
  score: number;
  status: string;
  tags: string[];
  yearsOfExperience: number;
  education: string;
  summary: string;
  salaryExpectation: string;
}

export const aiSearchCandidates = (candidates: Candidate[], query: string): Candidate[] => {
  const lowerQuery = query.toLowerCase();
  
  // Extract key search terms and patterns
  const searchTerms = {
    experience: extractExperienceYears(lowerQuery),
    location: extractLocation(lowerQuery),
    skills: extractSkills(lowerQuery),
    certifications: extractCertifications(lowerQuery),
    seniority: extractSeniority(lowerQuery),
    status: extractStatus(lowerQuery)
  };

  return candidates.filter(candidate => {
    let score = 0;
    const maxScore = 6; // Number of criteria

    // Experience matching
    if (searchTerms.experience.length > 0) {
      const hasMatchingExp = searchTerms.experience.some(exp => 
        candidate.yearsOfExperience >= exp
      );
      if (hasMatchingExp) score++;
    } else {
      score++; // No experience requirement, give point
    }

    // Location matching
    if (searchTerms.location.length > 0) {
      const hasMatchingLocation = searchTerms.location.some(loc =>
        candidate.location.toLowerCase().includes(loc) ||
        candidate.country.toLowerCase() === loc
      );
      if (hasMatchingLocation) score++;
    } else {
      score++; // No location requirement, give point
    }

    // Skills matching
    if (searchTerms.skills.length > 0) {
      const hasMatchingSkills = searchTerms.skills.some(skill =>
        candidate.tags.some(tag => tag.toLowerCase().includes(skill)) ||
        candidate.title.toLowerCase().includes(skill) ||
        candidate.summary.toLowerCase().includes(skill)
      );
      if (hasMatchingSkills) score++;
    } else {
      score++; // No skills requirement, give point
    }

    // Certifications matching
    if (searchTerms.certifications.length > 0) {
      const hasMatchingCert = searchTerms.certifications.some(cert =>
        candidate.tags.some(tag => tag.toLowerCase().includes(cert)) ||
        candidate.education.toLowerCase().includes(cert) ||
        candidate.summary.toLowerCase().includes(cert)
      );
      if (hasMatchingCert) score++;
    } else {
      score++; // No certification requirement, give point
    }

    // Seniority matching
    if (searchTerms.seniority.length > 0) {
      const hasMatchingSeniority = searchTerms.seniority.some(level =>
        candidate.title.toLowerCase().includes(level)
      );
      if (hasMatchingSeniority) score++;
    } else {
      score++; // No seniority requirement, give point
    }

    // Status matching
    if (searchTerms.status.length > 0) {
      const hasMatchingStatus = searchTerms.status.some(status =>
        candidate.status.toLowerCase().includes(status)
      );
      if (hasMatchingStatus) score++;
    } else {
      score++; // No status requirement, give point
    }

    // General text matching for any remaining terms
    const generalMatch = lowerQuery.split(' ').some(term => {
      if (term.length < 3) return false; // Skip short words
      return (
        candidate.name.toLowerCase().includes(term) ||
        candidate.title.toLowerCase().includes(term) ||
        candidate.summary.toLowerCase().includes(term) ||
        candidate.tags.some(tag => tag.toLowerCase().includes(term))
      );
    });

    // Return candidates that match most criteria or have general text match
    return score >= maxScore * 0.7 || generalMatch;
  }).sort((a, b) => b.score - a.score); // Sort by candidate score
};

const extractExperienceYears = (query: string): number[] => {
  const expPatterns = [
    /(\d+)\+?\s*years?\s*(?:of\s*)?experience/gi,
    /(\d+)\+?\s*yrs?\s*(?:of\s*)?experience/gi,
    /experience\s*(?:of\s*)?(\d+)\+?\s*years?/gi,
    /(\d+)\+?\s*years?\s*exp/gi
  ];
  
  const years: number[] = [];
  expPatterns.forEach(pattern => {
    const matches = query.matchAll(pattern);
    for (const match of matches) {
      const year = parseInt(match[1]);
      if (!isNaN(year)) years.push(year);
    }
  });
  
  return years;
};

const extractLocation = (query: string): string[] => {
  const locations = ['dubai', 'cairo', 'riyadh', 'uae', 'egypt', 'saudi arabia', 'saudi'];
  return locations.filter(loc => query.includes(loc));
};

const extractSkills = (query: string): string[] => {
  const skills = [
    'sap', 'excel', 'power bi', 'sql', 'ifrs', 'financial analysis', 
    'risk management', 'accounting', 'finance', 'financial', 'cpa',
    'team leadership', 'leadership', 'management'
  ];
  return skills.filter(skill => query.includes(skill));
};

const extractCertifications = (query: string): string[] => {
  const certs = ['cpa', 'cfa', 'acca', 'mba', 'bachelor', 'master', 'certified'];
  return certs.filter(cert => query.includes(cert));
};

const extractSeniority = (query: string): string[] => {
  const levels = ['senior', 'manager', 'director', 'head', 'lead', 'chief', 'junior', 'entry'];
  return levels.filter(level => query.includes(level));
};

const extractStatus = (query: string): string[] => {
  const statuses = ['available', 'interviewing', 'shortlisted'];
  return statuses.filter(status => query.includes(status));
};
