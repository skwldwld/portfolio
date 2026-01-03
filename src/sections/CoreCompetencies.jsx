import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import competenciesData from '../data/coreCompetencies.json';

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

const CoreCompetenciesSection = styled.div`
  margin-top: 240px;
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
  white-space: pre-line;
`;

function CoreCompetencies() {
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
    <CoreCompetenciesSection>
      <SectionTitle>Core Competencies</SectionTitle>
      <SectionSubtitle>제가 가진 장점들입니다.</SectionSubtitle>
      
      <CompetencyGrid>
        {competenciesData.competencies.map((competency, index) => (
          <CompetencyCard 
            key={competency.id}
            data-id={competency.id} 
            delay={0.1 + index * 0.1}
            isVisible={visibleItems.has(competency.id)}
          >
            <CardIcon />
            <CardTitle>{competency.title}</CardTitle>
            <CardDescription>{competency.description}</CardDescription>
          </CompetencyCard>
        ))}
      </CompetencyGrid>
    </CoreCompetenciesSection>
  );
}

export default CoreCompetencies;

