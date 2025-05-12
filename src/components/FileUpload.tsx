import { Buffer } from "buffer";
import type { File } from "../interfaces/File";

const PDF_PLACEHOLDER = "/document-icon.png";

interface FileUploadProps {
  setFile: (file: File) => void;
}

function FileUpload({ setFile }: FileUploadProps) {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const arrayBuffer = await selectedFile.arrayBuffer();
    const base64 = Buffer.from(new Uint8Array(arrayBuffer)).toString("base64");

    const file: File = {
      type: selectedFile.type,
      file: base64,
      imageUrl: selectedFile.type.includes("pdf")
        ? PDF_PLACEHOLDER
        : URL.createObjectURL(selectedFile),
    };

    setFile(file);
  };

  return (
    <section>
      <h2>Get Started</h2>
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
      />
    </section>
  );
}

export default FileUpload;
