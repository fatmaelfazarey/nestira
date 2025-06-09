
export const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-orange-500';
  return 'bg-red-500';
};

export const formatBlurredName = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length >= 2) {
    return `${nameParts[0]} ${'*'.repeat(nameParts[1].length)}`;
  }
  return nameParts[0];
};

export const getCountryFlag = (countryCode: string) => {
  const flags = {
    'AE': '🇦🇪',
    'EG': '🇪🇬',
    'SA': '🇸🇦'
  };
  return flags[countryCode as keyof typeof flags] || '🌍';
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
};
