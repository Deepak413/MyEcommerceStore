import React, { useState, useRef, useEffect } from "react";
import "./AIChat.css";
import { TbMessageChatbot } from "react-icons/tb";
import ChatMessage from "./ChatMessage.js";
import TypingIndicator from "./TypingIndicator";
import { askAI } from "../../services/aiServices.js";

const AIChat = () => {
  const bottomRef = useRef();
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello 👋 I'm your AI Shopping Assistant.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);
    console.log("AIChat.js : userMessage : ", userMessage);

    try {
      const history = messages.slice(-4).map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      }));

      console.log("AIChat.js : history : ", history);

      const response = await askAI(userMessage.text, history);

      console.log("AIChat.js : response from askAI : ", response);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: response.message,
          time: getCurrentTime(),
          products: response.products,
        },
      ]);
    } catch (error) {
      console.error("AIChat.js : Error in sendMessage : ", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: error?.response?.data?.message || "Sorry, something went wrong. Please try again.",
          time: getCurrentTime(),
        },
      ]);
      console.error("AIChat.js : message in sendMessage in catch block : ", messages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button className="aiFloatingButton" onClick={() => setOpen(!open)}>
          <TbMessageChatbot />
        </button>
      )}

      {/* Drawer */}
      <div className={`aiDrawer ${open ? "open" : ""}`}>
        <div className="aiHeader">
          <div>
            <h3>🤖 Shopping Assistant</h3>
            <p>Ask anything about products</p>
          </div>

          <button className="closeButton" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="chatBody">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef}></div>
        </div>

        <div className="chatInputContainer">
          <input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Ask me anything..."
          />

          <button disabled={loading} onClick={sendMessage}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChat;
