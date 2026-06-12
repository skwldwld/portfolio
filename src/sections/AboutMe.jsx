import { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import profileImage from '../assets/profile_pic.jpeg';
import personIcon from '../assets/person.svg';
import birthdayIcon from '../assets/birthday.svg';
import locationIcon from '../assets/home.svg';
import graduationIcon from '../assets/school.svg';
import { useLanguage } from '../context/LanguageContext';

function AboutMe() {
  const { t } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(new Set());

  const infoData = useMemo(() => [
    {
      id: 'info-1',
      icon: personIcon,
      value: '김예지',
      delay: 0.2
    },
    {
      id: 'info-2',
      icon: birthdayIcon,
      value: '2002.05.12',
      delay: 0.3
    },
    {
      id: 'info-3',
      icon: locationIcon,
      value: t('aboutme_location'),
      delay: 0.4
    },
    {
      id: 'info-4',
      icon: graduationIcon,
      value: t('aboutme_school_value'),
      delay: 0.5,
      hasYearColor: true
    }
  ], [t]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    const items = document.querySelectorAll('[data-id]');
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <AboutMeContainer>
      <SectionTitle>{t('about_title')}</SectionTitle>
      <SectionSubtitle>{t('about_subtitle')}</SectionSubtitle>
      
      <AboutContent>
        <ProfileImageContainer 
          data-id="profile" 
          isVisible={visibleItems.has('profile')}
        >
          <ProfileImage src={profileImage} alt="김예지" />
        </ProfileImageContainer>
        
        <InfoList>
          {infoData.map((info) => (
            <InfoItem 
              key={info.id}
              data-id={info.id} 
              delay={info.delay}
              isVisible={visibleItems.has(info.id)}
            >
              <IconWrapper>
                <Icon src={info.icon} alt="" />
              </IconWrapper>
              <InfoContent> 
                <InfoValue>
                  {info.value.split('\n').map((line, idx, lines) => {
                    const isYearLine = info.hasYearColor && idx === lines.length - 1;
                    return (
                      <InfoLine key={idx} $isYearLine={isYearLine}>
                        {line}
                        {idx < lines.length - 1 && <br />}
                      </InfoLine>
                    );
                  })}
                </InfoValue>
              </InfoContent>
            </InfoItem>
          ))}
        </InfoList>
      </AboutContent>
    </AboutMeContainer>
  );
}

export default AboutMe;

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

const AboutMeContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border-radius: 10px;
  padding: 60px;
  padding-bottom: 80px;
  margin-bottom: 120px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin-bottom: 80px;
  }
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 120px;
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ProfileImageContainer = styled.div`
  width: 250px;
  
  overflow: hidden;
  margin-left: auto;
  margin-right: 0;
  flex-shrink: 0;

  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transition-delay: 0.1s;

  @media (max-width: 968px) {
    width: 100%;
    max-width: 286px;
    height: auto;
    aspect-ratio: 286 / 350;
    margin: 0 auto;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transition-delay: ${props => props.delay || 0.2}s;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Icon = styled.img`
  width: 26px;
  height: 26px;
  filter: ${({ theme }) => (theme.mode === 'dark' ? 'invert(1) brightness(1.2)' : 'none')};
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const InfoLine = styled.span`
  color: ${({ $isYearLine, theme }) => ($isYearLine ? theme.colors.muted : theme.colors.text)};
`;

