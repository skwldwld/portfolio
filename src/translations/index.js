/**
 * 멘트별로 { ko, en } 형태로 묶어두고, 언어 모드에 따라 사용합니다.
 */
export const translations = {
  // Hero
  hero_title_1: { ko: '안녕하세요', en: 'Hello' },
  hero_title_2: { ko: '3D 웹 개발자', en: '3D Web Developer' },
  hero_title_3: { ko: '김예지입니다.', en: "I'm Yeji Kim." },
  hero_desc_1: { ko: 'WebGL 기반 디지털 트윈과 프론트엔드 웹 개발을 합니다.', en: 'I work on WebGL-based digital twins and frontend web development.' },
  hero_desc_2: { ko: '저의 기술로 더 나은 세상을 만들고 싶습니다.', en: 'I want to build a better world with my skills.' },

  // Navigation
  nav_about: { ko: 'About Me', en: 'About Me' },
  nav_skills: { ko: '기술', en: 'Skills' },
  nav_experience: { ko: '경력', en: 'Experience' },
  nav_projects: { ko: '프로젝트', en: 'Projects' },

  // Message
  message_1: { ko: '기술이 빠르게 발전함에 따라 세상은 급속도로 변하기 때문에 현실에 안주하지 않고 계속해서 배우려 합니다.', en: 'As technology advances rapidly, the world is changing at a fast pace, so I strive to keep learning without resting on my laurels.' },
  message_2: { ko: '처음 접하는 낯선 문제 앞에 서더라도 두려워하기보다는 일단 시도해보려고 합니다.', en: 'Even when facing unfamiliar problems, I try to give it a shot rather than shy away.' },
  message_3: { ko: 'Frontend, Backend 뿐만 아니라 3D 웹 개발까지 다양한 프로젝트들을 경험해왔고,', en: 'I have experience in Frontend, Backend, and 3D web development,' },
  message_4: { ko: '앞으로도 분야를 가리지 않고 계속해서 새로운 도전을 이어나갈 것입니다.', en: 'and I will continue to take on new challenges across all fields.' },
  message_5: { ko: '저의 새로운 도전에 함께해주세요.', en: 'Join me on my next challenge.' },
  resume_download: { ko: '이력서 다운로드', en: 'Download Resume' },

  // About
  about_title: { ko: 'About Me', en: 'About Me' },
  about_subtitle: { ko: '저를 소개합니다.', en: 'Let me introduce myself.' },
  core_title: { ko: 'Core Competencies', en: 'Core Competencies' },
  core_subtitle: { ko: '제가 가진 장점들입니다.', en: 'Here are my strengths.' },

  // AboutMe info (name, location, school etc. - value can be object in component)
  aboutme_school_value: { ko: '한동대학교\n(AI, 컴퓨터공학부)\n2022-2026 (졸업예정)', en: 'Handong Global University\n(AI, School of Computer Science)\n2022-2026 (Expected)' },
  aboutme_location: { ko: '경기도 의왕시', en: 'Uiwang-si, Gyeonggi-do' },

  // Skills
  skills_title: { ko: '기술 스택', en: 'Skills' },
  skills_subtitle: { ko: '제가 다룰 수 있는 기술들입니다.', en: 'Technologies I work with.' },

  // Experience
  experience_title: { ko: '경력', en: 'Experience' },
  experience_subtitle: { ko: '저를 성장시켜준 협업과 일 경험입니다.', en: 'Collaboration and work experiences that shaped me.' },
  language_title: { ko: '어학 능력', en: 'Language' },

  // Projects
  projects_title: { ko: '프로젝트', en: 'Projects' },
  projects_subtitle: { ko: '카테고리별 주요 프로젝트들을 살펴보세요.', en: 'Explore my projects by category.' },
  category_all: { ko: '전체', en: 'All' },
  category_likelion: { ko: '멋쟁이사자처럼', en: 'Like Lion' },
  category_internship: { ko: '인턴십', en: 'Internship' },
  category_capstone: { ko: '캡스톤 프로젝트', en: 'Capstone' },
  category_personal: { ko: '개인 프로젝트', en: 'Personal' },
  modal_period_team: { ko: '기간 및 팀 구성', en: 'Period & Team' },
  modal_tech: { ko: '기술 스택', en: 'Tech Stack' },
  modal_description: { ko: '프로젝트 설명', en: 'Description' },
  modal_achievements: { ko: '수상 내역', en: 'Achievements' },
  modal_details: { ko: '상세 내용', en: 'Details' },
  github_link: { ko: 'GitHub 링크', en: 'GitHub' },

  // Footer
  footer_contact: { ko: 'Contact me', en: 'Contact me' },
  footer_copyright: { ko: '© 2026 YejiKim. All Rights Reserved.', en: '© 2026 YejiKim. All Rights Reserved.' },
};

/**
 * 객체 또는 문자열에서 현재 언어 텍스트 반환
 * @param {string|{ ko: string, en: string }} value
 * @param {'ko'|'en'} lang
 */
export function getText(value, lang) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && (value.ko !== undefined || value.en !== undefined)) {
    return value[lang] ?? value.ko ?? value.en ?? '';
  }
  return '';
}
