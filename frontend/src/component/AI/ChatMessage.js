import React from "react";
import "./AIChat.css";
import { useSelector } from "react-redux";
import ProductRecommendationCard from "./ProductRecommendationCard.js";

const ChatMessage = ({ message }) => {
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  const isUser = message.sender === "user";

  console.log("ChatMessage.js : products : ", message.products);

  return (
    <div className={`messageRow ${isUser ? "userRow" : "assistantRow"}`}>
      <div className="avatar">
        {isUser ? (
          <img style={{"height":"100%", "width":"100%", "border-radius":"50%"}} src={user?.avatar?.url} alt={user?.name} />
        ) : (
          "🤖"
        )}
      </div>
      <div
        className={`messageBubble ${isUser ? "userBubble" : "assistantBubble"}`}
      >
        <p>{message.text}</p>

        {message.products && message.products.length > 0 && (
          <div className="recommendedProducts">
            {message.products.map((product) => (
              <ProductRecommendationCard
                key={product._id}

                product={product}
              />
            ))}
          </div>
        )}
        <span className="messageTime">{message.time}</span>
      </div>
    </div>
  );
};
export default ChatMessage;
