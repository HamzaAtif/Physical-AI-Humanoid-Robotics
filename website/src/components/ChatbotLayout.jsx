import React from 'react';
import RAGChatbot from '@site/src/components/RAGChatbot/RAGChatbot';

const ChatbotLayout = ({ children }) => {
  return (
    <>
      {children}
      <RAGChatbot />
    </>
  );
};

export default ChatbotLayout;