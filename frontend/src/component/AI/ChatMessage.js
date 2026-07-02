import React from "react";
import "./AIChat.css";
import ProductRecommendationCard from "./ProductRecommendationCard.js";

const ChatMessage = ({ message }) => {

    const isUser = message.sender === "user";

    return (

        <div className={`messageRow ${isUser ? "userRow" : "assistantRow"}`}>
            <div className="avatar">
                {isUser ? "🧑" : "🤖"}
            </div>
            {/* Message */}
            <div className={`messageBubble ${isUser ? "userBubble" : "assistantBubble"}`}>
                <p>

                    {message.text}

                </p>

                {

                    message.products &&

                    message.products.length > 0 && (

                        <div className="recommendedProducts">

                            {

                                message.products.map(product => (

                                    <ProductRecommendationCard

                                        key={product._id}

                                        product={product}

                                    />

                                ))

                            }

                        </div>

                    )

                }
                <span className="messageTime">
                    {message.time}
                </span>
            </div>
        </div>
    );
};
export default ChatMessage;