import { useEffect, useRef } from 'react';
import styled from 'styled-components';

function Message() {
  const textRefs = useRef([]);

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
        {[
          '기술이 빠르게 발전함에 따라 세상은 급속도로 변하기 때문에 현실에 안주하지 않고 계속해서 배우려 합니다.',
          '처음 접하는 낯선 문제 앞에 서더라도 두려워하기보다는 일단 시도해보려고 합니다.',
          'Frontend, Backend 뿐만 아니라 3D 웹 개발까지 다양한 프로젝트들을 경험해왔고,',
          '앞으로도 분야를 가리지 않고 계속해서 새로운 도전을 이어나갈 것입니다.',
          '저의 새로운 도전에 함께해주세요.',
        ].map((text, index) => (
          <MessageText
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            style={{ transitionDelay: `0.15s` }}
          >
            {text}
          </MessageText>
        ))}
      </MessageContent>

      <DownloadButton>
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
        이력서 다운로드
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
  background-color: #f5f2f2;
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
  color: #2b2a2a;
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

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  background: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #2b2a2a;
  cursor: pointer;
  transition: transform 0.3s ease;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
    sans-serif;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
