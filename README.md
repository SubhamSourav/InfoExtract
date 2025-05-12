# InfoExtract

InfoExtract is an intelligent document processing platform that uses AI to extract, analyze, and summarize content from various file formats, including PDFs & images. It also features an interactive chatbot interface that provides concise, text-only answers to user queries based on the uploaded document.

## Features

- **Document Upload**: Upload PDFs, images, or scanned documents for processing.
- **AI-Powered Chatbot**: Ask questions about the uploaded document and receive concise, text-only responses.
- **Content Summarization**: Automatically generate a summary of the uploaded document.
- **Multi-Format Support**: Supports file types such as `.pdf`, `.jpg`, `.jpeg`, and `.png`.
- **Error Handling**: Provides clear error messages for unsupported formats or processing issues.
- **Interactive UI**: A user-friendly interface to upload documents, view summaries, and interact with the chatbot.

## How It Works

### 1. Upload a Document
- Users can upload a document (PDF or image) using the **"Choose File"** button.
- The file is processed, and its content is extracted for analysis.

### 2. Generate a Summary
- The application uses AI to generate a concise summary of the document's content.

### 3. Ask Questions
- Users can interact with the chatbot by asking questions about the uploaded document.
- The chatbot responds with short, text-only answers based on the document’s content.

### 4. Upload a New Document
- Users can reset the application and upload a new document for processing.

## Technologies Used

### Frontend:
- **React.js** for the UI
- **TypeScript** for type safety
- **CSS** for styling and responsiveness

### Backend:
- **AI-powered Content Generation** using Google GenAI (Gemini 2.0 Flash model)

### File Handling:
- **Base64 encoding** for file uploads
- **MIME type detection** for file validation to ensure supported formats

### Environment Variables:
- **API keys** and sensitive configurations are managed using `.env` files to ensure secure handling.
