import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import projectsData from '../data/projects.json';
import { getTechColors } from '../utils/skillsUtils';
import { useLanguage } from '../context/LanguageContext';

import ArrowLeft from '../assets/arrow_left.svg';
import ArrowRight from '../assets/arrow_right.svg';

const CATEGORY_KEYS = {
  '전체': 'category_all',
  '멋쟁이사자처럼': 'category_likelion',
  '인턴십': 'category_internship',
  '캡스톤 프로젝트': 'category_capstone',
  '개인 프로젝트': 'category_personal',
};

function Projects() {
  const { t, getText } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);

  const categories = ['전체', '멋쟁이사자처럼', '인턴십', '캡스톤 프로젝트', '개인 프로젝트'];
  const filteredProjects = selectedCategory === '전체' 
    ? projectsData.projects 
    : projectsData.projects.filter(p => p.category === selectedCategory);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const images = selectedProject?.images || [];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setZoomedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setZoomedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ProjectsSection id="projects">
      <SectionTitle>{t('projects_title')}</SectionTitle>
      <SectionSubtitle>{t('projects_subtitle')}</SectionSubtitle>
      
      <CategoryFilter>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {t(CATEGORY_KEYS[category] || category)}
          </CategoryButton>
        ))}
      </CategoryFilter>

      <ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            delay={0.1 + index * 0.1}
            onClick={() => handleCardClick(project)}
            selected={selectedProject?.id === project.id}
          >
            <CardHeader>
              <CardTitle>{getText(project.title)}</CardTitle>
              {/* {project.technologies.length > 0 && (() => {
                const tech = project.technologies[0];
                const colors = getTechColors(tech);
                return (
                  <TechnologyTag bgColor={colors.bgColor} textColor={colors.textColor}>
                    {tech}
                  </TechnologyTag>
                );
              })()} */}
            </CardHeader>
            <CardPeriod>{project.period}</CardPeriod>
            <CardTeamSize>{getText(project.teamSize)}</CardTeamSize>
            <CardTags>
              {project.technologies.map((tech, idx) => {
                const colors = getTechColors(tech);

                return (
                  <TechnologyTag
                    key={idx}
                    bgColor={colors.bgColor}
                    textColor={colors.textColor}
                  >
                    {tech}
                  </TechnologyTag>
                );
              })}
            </CardTags>
            <CardContent>
              <CardDescription>{getText(project.description)}</CardDescription>
              {project.achievements.length > 0 && (
                <CardAchievements>
                  {project.achievements.map((achievement, idx) => (
                    <AchievementItem key={idx}>{getText(achievement)}</AchievementItem>
                  ))}
                </CardAchievements>
              )}
              {project.papers && project.papers.length > 0 && (
                <CardPapers>
                  {project.papers.map((paper, idx) => (
                    <AchievementItem key={idx}>{getText(paper)}</AchievementItem>
                  ))}
                  </CardPapers>   
              )}
            </CardContent>
            {project.github && (
              <GitHubIcon onClick={(e) => {
                e.stopPropagation();
                window.open(project.github, '_blank');
              }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </GitHubIcon>
            )}
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <ModalOverlay isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal}>×</CloseButton>
          {selectedProject && (
            <>
              <ModalTitle>{getText(selectedProject.title)}</ModalTitle>
              
              <ModalSection>
                <ModalLabel>{t('modal_period_team')}</ModalLabel>
                <ModalText>{selectedProject.period}</ModalText>
                <ModalText>{getText(selectedProject.teamSize)}</ModalText>
              </ModalSection>

              <ModalSection>
                <ModalLabel>{t('modal_tech')}</ModalLabel>
                <ModalTags>
                  {selectedProject.technologies.map((tech, idx) => {
                    const colors = getTechColors(tech);
                    return (
                      <TechnologyTag 
                        key={idx}
                        bgColor={colors.bgColor}
                        textColor={colors.textColor}
                      >
                        {tech}
                      </TechnologyTag>
                    );
                  })}
                </ModalTags>
              </ModalSection>

              <ModalSection>
                <ModalLabel>{t('modal_description')}</ModalLabel>
                <ModalText>{getText(selectedProject.description)}</ModalText>
              </ModalSection>

              {selectedProject.achievements.length > 0 && (
                <ModalSection>
                  <ModalLabel>{t('modal_achievements')}</ModalLabel>
                  {selectedProject.achievements.map((achievement, idx) => (
                    <ModalText key={idx}>{getText(achievement)}</ModalText>
                  ))}
                </ModalSection>
              )}
              
              {selectedProject.papers.length > 0 && (
                <ModalSection>
                  <ModalLabel>{t('modal_papers')}</ModalLabel>
                  {selectedProject.papers.map((paper, idx) => (
                    <ModalText key={idx}>{getText(paper)}</ModalText>
                  ))}
                </ModalSection>
              )}

              <ModalSection>
                <ModalLabel>{t('modal_details')}</ModalLabel>
                <ModalList>
                  {selectedProject.details.map((detail, idx) => (
                    <ModalListItem key={idx}>{getText(detail)}</ModalListItem>
                  ))}
                </ModalList>
              </ModalSection>

              {selectedProject.images && selectedProject.images.length > 0 && (
                <ModalSection>
                  <ModalLabel>{t('modal_images')}</ModalLabel>
                  <ProjectImageScroll>
                    {selectedProject.images.map((image, idx) => (
                      <ProjectImage
                        key={idx}
                        src={image}
                        alt={`${getText(selectedProject.title)} screen ${idx + 1}`}
                        onClick={() => setZoomedImageIndex(idx)}
                      />
                    ))}
                  </ProjectImageScroll>
                </ModalSection>
              )}

              {selectedProject.github && (
                <ModalGitHubButton 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={t('github_link')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </ModalGitHubButton>
              )}
            </>
          )}
        </ModalContent>
      </ModalOverlay>
        {zoomedImageIndex !== null && (
          <ImageZoomOverlay onClick={() => setZoomedImageIndex(null)}>
            <ImageZoomContent onClick={(e) => e.stopPropagation()}>
              <ImageZoomCloseButton onClick={() => setZoomedImageIndex(null)}>
                ×
              </ImageZoomCloseButton>

              {images.length > 1 && (
                <>
                  <ImageNavButton position="left" onClick={handlePrevImage}>
                    <ArrowIcon src={ArrowLeft} alt="previous" />
                  </ImageNavButton>

                  <ImageNavButton position="right" onClick={handleNextImage}>
                    <ArrowIcon src={ArrowRight} alt="next" />
                  </ImageNavButton>
                </>
              )}

              <ZoomedImage
                src={images[zoomedImageIndex]}
                alt="zoomed project screen"
              />
            </ImageZoomContent>
          </ImageZoomOverlay>
        )}
    </ProjectsSection>
  );
}

export default Projects;


const fadeInUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }`;

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 120px 20px;
  background-color: ${({ theme }) => theme.colors.bg};
  max-width: 1400px;
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
  margin: 0 0 30px 0;
`;


const CategoryFilter = styled.div`
  width: 670px;
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 0 auto 60px auto;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 50px;
  padding: 8px;
`;

const CategoryButton = styled.button`
  padding: 10px 24px;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.muted)};
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 32px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  aspect-ratio: 1 / 0.9;

  transition: all 0.4s ease;
  position: relative;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || 0.1}s;

  will-change: transform;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;


const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 15px;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-size: 23px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const TechnologyTag = styled.span`
  padding: 6px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.bgColor || '#f0f0f0'};
  color: ${({ textColor, theme }) => textColor || theme.colors.text};
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const CardPeriod = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #666;
  margin: 0 0 5px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const CardTeamSize = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #666;
  margin: 0 0 16px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 0 0 16px 0;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const CardDescription = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 0 0 16px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const CardAchievements = styled.div`
  margin-top: 16px;
`;

const CardPapers = styled.div`
  margin-top: 16px;
`;

const AchievementItem = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #5A7ACD;
  margin: 4px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const GitHubIcon = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  animation: ${props => props.isOpen ? 'fadeIn' : 'none'} 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 60px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  animation: ${props => props.isOpen ? 'slideUp' : 'none'} 0.3s ease;
  
  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    max-height: 95vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.3s ease;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  outline: none;

  &:hover {
    transform: rotate(90deg);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

const ModalTitle = styled.h2`
  font-size: 27px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 24px 0;
  padding-right: 50px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ModalSection = styled.div`
  margin-bottom: 24px;
`;

const ModalLabel = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ModalText = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ModalList = styled.ul`
  list-style: decimal;
  padding-left: 24px;
  margin: 0;
`;

const ProjectImageScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 12px 4px 16px 4px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ProjectImage = styled.img`
  flex: 0 0 auto;
  width: 360px;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  scroll-snap-align: start;
  cursor: zoom-in;


  @media (max-width: 768px) {
    width: 280px;
    height: 180px;
  }
`;

const ModalListItem = styled.li`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: 8px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const ModalGitHubButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    transform: scale(1.1);
  }
`;

const ImageZoomOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const ImageZoomContent = styled.div`
  position: relative;
  width: 70vw;
  height: 88vh;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 48px 24px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageZoomCloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 18px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  cursor: pointer;
`;

const ZoomedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
`;

const ArrowIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

const ImageNavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ position }) =>
    position === 'left' ? 'left: 18px;' : 'right: 18px;'}

  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 2;
  transition: background 0.2s ease;
  background: transparent;

`;