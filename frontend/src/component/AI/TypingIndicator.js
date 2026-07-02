import React from "react";
import "./AIChat.css";

const TypingIndicator = () => {
  return (
    <div className="messageRow assistantRow">
      <div className="avatar">🤖</div>

      <div className="typingBubble">
        <span></span>

        <span> </span>

        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
