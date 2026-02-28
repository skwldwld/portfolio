import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';
import resumeKo from '../resume/이력서_김예지.pdf';
import resumeEn from '../resume/resume_yejikim.pdf';

function Message() {
  const textRefs = useRef([]);
  const { t, language } = useLanguage();

  const messageKeys = ['message_1', 'message_2', 'message_3', 'message_4', 'message_5'];
  const resumeUrl = language === 'ko' ? resumeKo : resumeEn;
  const resumeFileName = language === 'ko' ? '이력서_김예지.pdf' : 'resume_yejikim.pdf';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    textRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MessageSection id="message">
      <MessageContent>
        {messageKeys.map((key, index) => (
          <MessageText
            key={key}
            ref={(el) => (textRefs.current[index] = el)}
            style={{ transitionDelay: `0.15s` }}
          >
            {t(key)}
          </MessageText>
        ))}
      </MessageContent>

      <DownloadButton as="a" href={resumeUrl} download={resumeFileName}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {t('resume_download')}
      </DownloadButton>
    </MessageSection>
  );
}

export default Message;

/* ===========================
   Styled Components
=========================== */

const MessageSection = styled.section`
  min-height: 100vh;
  padding: 120px 20px;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const MessageContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin-bottom: 60px;
`;

const MessageText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
    sans-serif;

  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: transform 0.3s ease;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
    sans-serif;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
