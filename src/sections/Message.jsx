import styled from 'styled-components';

const MessageSection = styled.section`
  min-height: 100vh;
  padding: 120px 20px;
  background-color: #F5F2F2;
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
  color: #2B2A2A;
  // color: #7E8793;
  margin: 0 0 8px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  background: white;
  // border: 1px solid #D9D9D9;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #2B2A2A;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
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

  svg {
    width: 20px;
    height: 20px;
  }
`;

function Message() {
  const handleDownload = () => {
    // 이력서 다운로드 로직
    // 예: window.open('/resume.pdf', '_blank');
    console.log('이력서 다운로드');
  };

  return (
    <MessageSection id="message">
      <MessageContent>
        <MessageText>
          기술이 빠르게 발전함에 따라 세상은 급속도로 변하기에 현실에 안주하지 않습니다.
        </MessageText>
        <MessageText>
          그렇기에 처음 접하는 문제도 두려워하지 않고 일단 시도해보려고 합니다.
        </MessageText>
        <MessageText>
          다양한 프로젝트에 부딪혀보며 Frontend 뿐만 아니라 Backend, 3D 웹 개발까지,
        </MessageText>
        <MessageText>
          그리고 이후로도 분야를 가리지 않고 계속해서 새로운 도전도 해나갈 것입니다.
        </MessageText>
      </MessageContent>
      <DownloadButton onClick={handleDownload}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        이력서 다운로드
      </DownloadButton>
    </MessageSection>
  );
}

export default Message;
