import { useState } from "react";
import "../styles/chatbot.css";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! 👋 I'm your BP assistant. Ask me about blood pressure!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes("normal")) {
      return "Normal BP is less than 120/80 mmHg. Keep it up! 💚";
    }
    if (lower.includes("high") || lower.includes("hypertension")) {
      return "High BP (130+/80+) needs attention. Consult your doctor if readings are consistently high. 🩺";
    }
    if (lower.includes("low")) {
      return "Low BP (below 90/60) can cause dizziness. Stay hydrated and consult a doctor if symptoms persist.";
    }
    if (lower.includes("food") || lower.includes("eat")) {
      return "Eat: leafy greens, berries, oats, fish, bananas. Avoid: salt, processed foods, alcohol. 🥗";
    }
    if (lower.includes("exercise")) {
      return "Regular exercise (30 min/day) can lower BP by 5-8 mmHg. Start with walking! 🚶‍♂️";
    }
    if (lower.includes("stress")) {
      return "Try meditation, deep breathing, yoga. Stress management helps lower BP! 🧘";
    }
    if (lower.includes("doctor")) {
      return "See a doctor if BP is 130/80+ consistently, or 180/120+ immediately (emergency). 🚨";
    }
    if (lower.includes("thank")) {
      return "You're welcome! Stay healthy! 💙";
    }

    return "I can help with: normal BP, high/low BP, diet, exercise, stress, when to see a doctor. What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg = { text: getBotResponse(input), isBot: true };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <span>🤖 BP Assistant</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.isBot ? "bot" : "user"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              placeholder="Ask about BP..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
