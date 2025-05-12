import "./App.css";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import Chat from "./components/Chat";
import { useState } from "react";
import type { File } from "./interfaces/File";

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleReset = () => {
    setUploadedFile(null);
  };

  return (
    <main className="container">
      <Header />
      {uploadedFile ? (
        <>
          <Summary file={uploadedFile} onReset={handleReset} />
          <Chat file={uploadedFile} />
        </>
      ) : (
        <FileUpload setFile={setUploadedFile} />
      )}
    </main>
  );
}

export default App;
