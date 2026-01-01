import AboutMe from './AboutMe';
import CoreCompetencies from './CoreCompetencies';
import styled from 'styled-components';

function About() {
  return (
    <AboutSection id="about">
      <AboutMe />
      <CoreCompetencies />
    </AboutSection>
  );
}

export default About;

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 120px 100px;
  max-width: 1200px;
  margin: 0 auto;
`;
