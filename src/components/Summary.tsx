import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import type { File } from "../interfaces/File";

interface SummaryProps {
  file: File;
  onReset: () => void;
}

function Summary({ file, onReset }: SummaryProps) {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getSummary() {
    try {
      setLoading(true);

      const contents = [
        {
          text: `
            Summarize the document
            in one short paragraph (less then 100 words)
            Use just plain text with no markdown or html tags
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

      console.log(response);

      setSummary(response.text ?? "No response received.");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <section
      className="summary"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <button onClick={onReset}>Upload New Document</button>
      <img src={file.imageUrl} alt="Preview Image" />
      <h2>Summary</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <p>{summary}</p>}
    </section>
  );
}

export default Summary;
