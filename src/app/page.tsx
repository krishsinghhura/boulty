"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Dropdowns from "../components/Dropdowns";
import InputSection from "../components/InputSection";
import FileList from "../components/FileList";
import CodePreview from "../components/CodePreview";

interface ProjectStructure {
  [key: string]: string;
}

const JSONFormatter: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [projectStructure, setProjectStructure] =
    useState<ProjectStructure | null>(null);
  const [selectedFile, setSelectedFile] = useState<{
    path: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [styling, setStyling] = useState<string>("tailwind");
  const [language, setLanguage] = useState<string>("javascript");
  const [database, setDatabase] = useState<string>("mongodb");

  useEffect(() => {
    if (projectStructure) {
      const firstFile = Object.entries(projectStructure)[0];
      setSelectedFile({ path: firstFile[0], content: firstFile[1] });
    }
  }, [projectStructure]);

  const fetchProjectJSON = async () => {
    if (!inputText.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setProjectStructure(null);
    setSelectedFile(null);

    try {
      const response = await axios.post("/api/groq", {
        prompt: `${inputText} in ${styling}, using ${language} with ${database}`,
      });

      let responseText = response.data;
      const jsonMatch = responseText.match(/```json([\s\S]*?)```/);
      if (!jsonMatch) {
        alert("No valid JSON found in the response.");
        return;
      }

      const jsonString = jsonMatch[1].trim();
      const jsonData = JSON.parse(jsonString);

      if (jsonData.project) {
        setProjectStructure(jsonData.project);
        console.log(jsonData.project);
      } else {
        alert("Invalid JSON structure.");
      }
    } catch (error) {
      alert("Error fetching project data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadZip = () => {
    if (!projectStructure) {
      alert("No project data available.");
      return;
    }

    const zip = new JSZip();
    Object.entries(projectStructure).forEach(([filePath, content]) => {
      zip.file(filePath, content);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "project.zip");
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col">
      {/* Dropdowns & Download Button */}
      <div className="flex items-center gap-4">
        <Dropdowns
          styling={styling}
          setStyling={setStyling}
          language={language}
          setLanguage={setLanguage}
          database={database}
          setDatabase={setDatabase}
        />
        <button
          onClick={downloadZip}
          className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-3"
        >
          Download ZIP
        </button>
      </div>

      {/* Input Section */}
      <InputSection
        inputText={inputText}
        setInputText={setInputText}
        fetchProjectJSON={fetchProjectJSON}
        loading={loading}
        buttonClass="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
      />

      {/* File List & Code Preview */}
      <div className="flex flex-1 w-full">
        <FileList
          projectStructure={projectStructure}
          setSelectedFile={setSelectedFile}
          className="bg-gray-800 p-4 rounded-lg"
        />
        <CodePreview
          selectedFile={selectedFile}
          className="bg-gray-900 p-4 rounded-lg text-white overflow-auto shadow-lg"
        />
      </div>
    </div>
  );
};

export default JSONFormatter;
