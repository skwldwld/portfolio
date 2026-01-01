import styled from 'styled-components';
import mailIcon from '../assets/mail.svg';
import githubIcon from '../assets/github.svg';
import phoneIcon from '../assets/phone.svg';

function Footer() {
  return (
    <FooterContainer id="contact">
      <FooterTitle>Contact me</FooterTitle>
      <IconContainer>
        <IconLink href="mailto:yezi0512@naver.com" aria-label="Email">
          <img src={mailIcon} alt="Email" />
        </IconLink>
        <IconLink href="https://github.com/skwldwld" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src={githubIcon} alt="GitHub" />
        </IconLink>
        <IconLink href="tel:+8210441045079" aria-label="Phone">
          <img src={phoneIcon} alt="Phone" />
        </IconLink>
      </IconContainer>
      <Copyright>© 2026 YejiKim. All Rights Reserved.</Copyright>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.section`
  min-height: 30vh;
  padding: 80px 20px 40px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: #2B2A2A;
  text-align: center;
  margin: 0 0 30px 0;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//   }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #2B2A2A;
  text-align: center;
  margin: 0;
`;