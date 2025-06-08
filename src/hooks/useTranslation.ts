
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation, TranslationKey } from '@/translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };
  
  return { t, language };
};
