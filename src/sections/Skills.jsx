import styled, { keyframes } from 'styled-components';
import { getCategories } from '../utils/skillsUtils';

function Skills() {
  const skillsData = getCategories();

  return (
    <SkillsSection id="skills">
      <SectionTitle>기술 스택</SectionTitle>
      <SectionSubtitle>제가 다룰 수 있는 기술들입니다.</SectionSubtitle>
      
      {skillsData.map((category, index) => (
        <CategoryContainer key={category.category} delay={0.1 + index * 0.1}>
          <CategoryTitle>{category.category}</CategoryTitle>
          <TagContainer>
            {category.tags.map((tag) => (
              <Tag 
                key={tag.name}
                bgColor={tag.bgColor}
                textColor={tag.textColor}
              >
                {tag.name}
              </Tag>
            ))}
          </TagContainer>
        </CategoryContainer>
      ))}
    </SkillsSection>
  );
}

export default Skills;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 120px 20px;
  background-color: #F5F2F2;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #5A7ACD;
  text-align: center;
  margin: 0 0 8px 0;
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #2B2A2A;
  text-align: center;
  margin: 0 0 60px 0;
`;

const CategoryContainer = styled.div`
  margin-bottom: 60px;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || 0.1}s;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2B2A2A;
  margin: 0 0 24px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  max-width: 800px;
  justify-content: flex-start;
`;

const Tag = styled.div`
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  background-color: ${props => props.bgColor || '#e0e0e0'};
  color: ${props => props.textColor || '#2B2A2A'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
