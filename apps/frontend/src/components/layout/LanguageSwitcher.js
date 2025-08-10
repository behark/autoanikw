import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, asPath, query } = router;
  
  // Available languages
  const languages = [
    { code: 'sq-AL', name: 'Shqip', flag: '🇦🇱' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  // Get current language
  const currentLang = languages.find(lang => lang.code === router.locale) || languages[0];

  // Change language handler
  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors py-1 px-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left py-2 px-4 hover:bg-slate-700 transition-colors ${
                lang.code === currentLang.code ? 'text-white bg-slate-700' : 'text-gray-300'
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
