
import { useRef, useState } from "react";
import "./DragDrop.css";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === "application/pdf");
    if (pdfFiles.length) {
      setFiles(pdfFiles);
    }
  };
  
  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("Files", file));
    console.log(formData.getAll("Files"));
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }  
    // )
  };

  if (files) return (
    <div className="uploads">
        <ul>
        {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
        </ul>
        <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
        </div>
    </div>
  )

  return (
    <>
        <div 
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <input 
            type="file"
            multiple
            onChange={(event) => {
              const selectedFiles = Array.from(event.target.files);
              const pdfFiles = selectedFiles.filter(file => file.type === "application/pdf");
              if (pdfFiles.length) {
                setFiles(pdfFiles);
              }
            }}
            hidden
            accept="application/pdf"
            ref={inputRef}
          />
        </div>
    </>
  );
};

export default DragDropFiles;
