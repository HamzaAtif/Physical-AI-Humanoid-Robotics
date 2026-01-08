import React from 'react';
import RAGChatbot from '../components/RAGChatbot/RAGChatbot';

// Default implementation, that you can customize
function Root({ children }) {
  return (
    <>
      {children}
      <RAGChatbot />
    </>
  );
}

export default Root;