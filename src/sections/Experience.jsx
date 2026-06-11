import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import experienceData from '../data/experience.json';
import likelionIcon from '../assets/likelion.svg';
import volunteerIcon from '../assets/volunteer.svg';
import companyIcon from '../assets/company.svg';
import opicIcon from '../assets/opic.svg';
import codeIcon from '../assets/code.svg';
import { useLanguage } from '../context/LanguageContext';

function Experience() {
  const { t, getText } = useLanguage();

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
      case 'code':
        return codeIcon;
      default:
        return null;
    }
  };

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <SectionTitle>{t('experience_title')}</SectionTitle>
        <SectionSubtitle>{t('experience_subtitle')}</SectionSubtitle>
        
        {experienceData.experiences.map((exp, index) => {
          const iconSrc = getIconSrc(exp.icon);
          const title = getText(exp.title);
          const role = getText(exp.role);
          const description = getText(exp.description);
          return (
            <ExperienceItem key={exp.id} delay={0.1 + index * 0.1}>
              <IconWrapper>
                {iconSrc && <img src={iconSrc} alt={title} />}
              </IconWrapper>
              <ContentWrapper>
                <ItemTitle>{title}</ItemTitle>
                <ItemPeriod>{exp.period}</ItemPeriod>
                <ItemRole>{role}</ItemRole>
                {description && <ItemDescription>{description}</ItemDescription>}
              </ContentWrapper>
            </ExperienceItem>
          );
        })}
      </ExperienceContainer>

      <ExperienceContainer>
        <SectionTitle>{t('certification_title')}</SectionTitle>
        {experienceData.certifications.map((cert) => {
          const iconSrc = getIconSrc(cert.icon);

          return (
            <LanguageItem key={cert.id}>
              <LanguageIconWrapper>
                {iconSrc && <img src={iconSrc} alt={cert.title} />}
              </LanguageIconWrapper>
              <ContentWrapper>
                <ItemTitle>{cert.title}</ItemTitle>
                <ItemRole>{cert.level}</ItemRole>
                <ItemRole>{cert.date}</ItemRole>
              </ContentWrapper>
            </LanguageItem>
          );
        })}

        
      </ExperienceContainer>
      <ExperienceContainer>
        <SectionTitle>{t('language_title')}</SectionTitle>
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
                <ItemRole>{lang.date}</ItemRole>
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
  background-color: ${({ theme }) => theme.colors.bg};
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
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin: 0 0 60px 0;
`;

const ExperienceContainer = styled.div`
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExperienceItem = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  padding: 2px;
  width: 520px;
  max-width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    width: 100%;
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
    filter: ${({ theme }) => (theme.mode === 'dark' ? 'invert(1) brightness(1.2)' : 'none')};
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ItemPeriod = styled.p`
  font-size: 15px;
  color: #666;
  margin: 0 0 8px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ItemRole = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  color: #666;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const LanguageItem = styled.div`
  display: flex;
  gap: 24px;
  padding: 32px;
  width: 520px;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    width: 100%;
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
    filter: ${({ theme }) => (theme.mode === 'dark' ? 'invert(1) brightness(1.2)' : 'none')};
  }
`;