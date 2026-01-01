import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import profileImage from '../assets/profile.jpg';
import personIcon from '../assets/person.svg';
import birthdayIcon from '../assets/birthday.svg';
import locationIcon from '../assets/home.svg';
import graduationIcon from '../assets/school.svg';

const infoData = [
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
    value: '경기도 의왕시',
    delay: 0.4
  },
  {
    id: 'info-4',
    icon: graduationIcon,
    value: '한동대학교\n(AI, 컴퓨터공학부)\n2022-2026 (졸업예정)',
    delay: 0.5,
    hasYearColor: true
  }
];

function About() {
  const [visibleItems, setVisibleItems] = useState(new Set());

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
    <AboutSection id="about">
      <AboutMeContainer>
        <SectionTitle>About Me</SectionTitle>
        <SectionSubtitle>저를 소개합니다.</SectionSubtitle>
        
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
                        <span key={idx} style={isYearLine ? { color: '#7E8793' } : {}}>
                          {line}
                          {idx < lines.length - 1 && <br />}
                        </span>
                      );
                    })}
                  </InfoValue>
                </InfoContent>
              </InfoItem>
            ))}
          </InfoList>
        </AboutContent>
      </AboutMeContainer>

      <CoreCompetenciesSection>
        <SectionTitle>Core Competencies</SectionTitle>
        <SectionSubtitle>제가 가진 장점들입니다.</SectionSubtitle>
        
        <CompetencyGrid>
          <CompetencyCard 
            data-id="competency-1" 
            delay={0.1}
            isVisible={visibleItems.has('competency-1')}
          >
            <CardIcon />
            <CardTitle>커뮤니케이션 및 협업</CardTitle>
            <CardDescription>
              어쩌구저쩌구를 할 수 있습니다<br />
              어쩌구입니다
            </CardDescription>
          </CompetencyCard>
          
          <CompetencyCard 
            data-id="competency-2" 
            delay={0.2}
            isVisible={visibleItems.has('competency-2')}
          >
            <CardIcon />
            <CardTitle>커뮤니케이션 및 협업</CardTitle>
            <CardDescription>
              어쩌구저쩌구를 할 수 있습니다<br />
              어쩌구입니다
            </CardDescription>
          </CompetencyCard>
          
          <CompetencyCard 
            data-id="competency-3" 
            delay={0.3}
            isVisible={visibleItems.has('competency-3')}
          >
            <CardIcon />
            <CardTitle>커뮤니케이션 및 협업</CardTitle>
            <CardDescription>
              어쩌구저쩌구를 할 수 있습니다<br />
              어쩌구입니다
            </CardDescription>
          </CompetencyCard>
        </CompetencyGrid>
      </CoreCompetenciesSection>
    </AboutSection>
  );
}

export default About;

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

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 120px 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutMeContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 60px;
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
  margin: 0;
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #2B2A2A;
  text-align: center;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ProfileImageContainer = styled.div`
  width: 286px;
  height: 350px;
  overflow: hidden;

  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transition-delay: 0.1s;
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
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
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
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: #2B2A2A;
  font-weight: 500;
`;

const CoreCompetenciesSection = styled.div`
  margin-top: 120px;
`;

const CompetencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CompetencyCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.3s ease;
  transition-delay: ${props => props.delay || 0.1}s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  width: 120px;
  height: 120px;
  background: #f8f9fa;
  border-radius: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2B2A2A;
  margin: 0 0 16px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;
