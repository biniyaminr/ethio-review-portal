import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "Trust Ethio",
      "hero_title": "Read reviews. Write reviews. Find businesses.",
      "hero_subtitle": "Helping you find the best businesses in Ethiopia with trust.",
      "search_placeholder": "Search for companies or categories...",
      "categories": "Categories",
      "recent_reviews": "Recent Reviews",
      "best_companies": "Best Companies",
      "write_review": "Write a Review",
      "claim_business": "Claim Business",
      "trust_score": "Trust Score",
      "stars": "Stars",
      "review_count": "Reviews",
      "see_all": "See all",
      "location": "Addis Ababa, Ethiopia",
      "auth": {
        "login": "Login",
        "signup": "Sign Up"
      },
      "footer": {
        "about": "About Trust Ethio",
        "contact": "Contact Us",
        "privacy": "Privacy Policy"
      }
    }
  },
  am: {
    translation: {
      "app_name": "ትረስት ኢትዮ",
      "hero_title": "ግምገማዎችን ያንብቡ። ይጻፉ። ድርጅቶችን ያግኙ።",
      "hero_subtitle": "በኢትዮጵያ ውስጥ ያሉ ምርጥ ድርጅቶችን በእምነት እንዲያገኙ እንረዳዎታለን።",
      "search_placeholder": "ድርጅቶችን ወይም ምድቦችን ይፈልጉ...",
      "categories": "ምድቦች",
      "recent_reviews": "የቅርብ ጊዜ ግምገማዎች",
      "best_companies": "ምርጥ ድርጅቶች",
      "write_review": "ግምገማ ይጻፉ",
      "claim_business": "ድርጅትዎን ይገባኛል ይበሉ",
      "trust_score": "የእምነት ነጥብ",
      "stars": "ኮከቦች",
      "review_count": "ግምገማዎች",
      "see_all": "ሁሉንም ይመልከቱ",
      "location": "አዲስ አበባ፣ ኢትዮጵያ",
      "auth": {
        "login": "ግባ",
        "signup": "ተመዝገብ"
      },
      "footer": {
        "about": "ስለ ትረስት ኢትዮ",
        "contact": "ያግኙን",
        "privacy": "የግላዊነት ፖሊሲ"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;