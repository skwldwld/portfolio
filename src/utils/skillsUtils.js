import skillsData from '../data/skills.json';

const DEFAULT_COLORS = {
  bgColor: '#e0e0e0',
  textColor: '#2B2A2A'
};

export const getTechColors = (techName) => {
  return skillsData.technologies[techName] || DEFAULT_COLORS;
};

export const getCategories = () => {
  return skillsData.categories.map((category) => ({
    ...category,
    tags: category.tags.map((tagName) => ({
      name: tagName,
      ...getTechColors(tagName)
    }))
  }));
};

export default skillsData;