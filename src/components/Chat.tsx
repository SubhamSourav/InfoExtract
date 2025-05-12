import { GoogleGenAI } from "@google/genai";
import "./Chat.css";
import { useState } from "react";
import type { File } from "../interfaces/File";

interface ChatProps {
  file: File;
}

interface Message {
  role: "user" | "model" | "error" | "loader";
  text: string;
}

function Chat({ file }: ChatProps) {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.length) {
      let chatMessages: Message[] = [
        ...messages,
        {
          role: "user",
          text: input,
        },
        {
          role: "loader",
          text: "",
        },
      ];
      setInput("");
      setMessages(chatMessages);

      try {
        const contents = [
          {
            text: `
              Answer this question about the attached document: ${input}.
              Answer as a chatbot with short messages and text only (no markdowns, tags or symbols)
              Chat history: ${JSON.stringify(messages)}
            `,
          },
          {
            inlineData: {
              mimeType: file.type,
              data: file.file,
            },
          },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: contents,
        });

        chatMessages = [
          ...chatMessages.filter((msg) => msg.role != "loader"),
          { role: "model", text: response.text ?? "No response received." },
        ];
        setMessages(chatMessages);
        console.log(chatMessages);
      } catch (error) {
        chatMessages = [
          ...chatMessages.filter((msg) => msg.role != "loader"),
          {
            role: "error",
            text: "Error sending messages, please try again later.",
          },
        ];
        setMessages(chatMessages);
        console.log(error);
      }
    }
  };

  return (
    <section className="chat-window">
      <h2>Chat</h2>
      {messages.length > 0 && (
        <div className="chat">
          {messages.map((message) => (
            <div className={message.role} key={message.text}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      )}
      <div className="input-area">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask any questions about the uploaded document..."
          value={input}
        />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </section>
  );
}

export default Chat;
