import skillsData from '../data/skills.json';

/**
 * 기술 이름으로 색상 정보를 가져옵니다
 * @param {string} techName - 기술 이름
 * @returns {Object} { bgColor, textColor } 또는 기본값
 */
export const getTechColors = (techName) => {
  const tech = skillsData.technologies[techName];
  if (tech) {
    return {
      bgColor: tech.bgColor,
      textColor: tech.textColor
    };
  }
  // 기본값 반환 (기술이 목록에 없는 경우)
  return {
    bgColor: '#e0e0e0',
    textColor: '#2B2A2A'
  };
};

/**
 * 모든 카테고리 데이터를 가져옵니다
 * @returns {Array} 카테고리 배열
 */
export const getCategories = () => {
  return skillsData.categories;
};

export default skillsData;

