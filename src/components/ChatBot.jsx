import { useState, useRef, useEffect } from "react";
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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");

    const loadingMsg = { text: "Typing...", isBot: true };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      const delay = Math.min(2000, data.reply.length * 20);

      setTimeout(() => {
        setMessages((prev) => prev.slice(0, -1)); // remove typing

        const botMsg = { text: data.reply, isBot: true };
        setMessages((prev) => [...prev, botMsg]);
      }, delay);

    } catch (error) {
      setTimeout(() => {
        setMessages((prev) => prev.slice(0, -1));

        const botMsg = { text: "⚠️ Error connecting to server", isBot: true };
        setMessages((prev) => [...prev, botMsg]);
      }, 1000);
    }
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
                {msg.text === "Typing..." ? (
                  <div className="typing">
                  Typing...
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              placeholder="Ask Anything :)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;