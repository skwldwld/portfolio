import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import experienceData from '../data/experience.json';
import likelionIcon from '../assets/likelion.svg';
import volunteerIcon from '../assets/volunteer.svg';
import companyIcon from '../assets/company.svg';
import opicIcon from '../assets/opic.svg';

function Experience() {
  const getIconSrc = (iconType) => {
    switch (iconType) {
      case 'lion':
        return likelionIcon;
      case 'heart':
        return volunteerIcon;
      case 'building':
        return companyIcon;
      case 'en':
        return opicIcon;
      default:
        return null;
    }
  };

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <SectionTitle>경력</SectionTitle>
        <SectionSubtitle>저를 성장시켜준 협업과 일 경험입니다.</SectionSubtitle>
        
        {experienceData.experiences.map((exp, index) => {
          const iconSrc = getIconSrc(exp.icon);
          return (
            <ExperienceItem key={exp.id} delay={0.1 + index * 0.1}>
              <IconWrapper>
                {iconSrc && <img src={iconSrc} alt={exp.title} />}
              </IconWrapper>
              <ContentWrapper>
                <ItemTitle>{exp.title}</ItemTitle>
                <ItemPeriod>{exp.period}</ItemPeriod>
                <ItemRole>{exp.role}</ItemRole>
                {exp.description && <ItemDescription>{exp.description}</ItemDescription>}
              </ContentWrapper>
            </ExperienceItem>
          );
        })}
      </ExperienceContainer>

      <ExperienceContainer>
        <SectionTitle>어학 능력</SectionTitle>
        
        {experienceData.languages.map((lang) => {
          const iconSrc = getIconSrc(lang.icon);
          return (
            <LanguageItem key={lang.id}>
              <LanguageIconWrapper>
                {iconSrc && <img src={iconSrc} alt={lang.title} />}
              </LanguageIconWrapper>
              <ContentWrapper>
                <ItemTitle>{lang.title}</ItemTitle>
                <ItemRole>{lang.level}</ItemRole>
              </ContentWrapper>
            </LanguageItem>
          );
        })}
      </ExperienceContainer>
    </ExperienceSection>
  );
}

export default Experience;

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

const ExperienceSection = styled.section`
  min-height: 100vh;
  padding: 120px 20px;
  background-color: #F5F2F2;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #646cff;
  text-align: center;
  margin: 0 0 16px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin: 0 0 80px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ExperienceContainer = styled.div`
  margin-bottom: 100px;
`;

const ExperienceItem = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  padding: 2px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 12px;
  padding: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2B2A2A;
  margin: 0 0 8px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ItemPeriod = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 8px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ItemRole = styled.p`
  font-size: 1rem;
  color: #2B2A2A;
  margin: 0 0 4px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ItemDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const LanguageItem = styled.div`
  display: flex;
  gap: 24px;
  padding: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const LanguageIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;