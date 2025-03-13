import React from "react";

interface FileListProps {
  projectStructure: Record<string, string> | null;
  setSelectedFile: (file: { path: string; content: string }) => void;
}

const FileList: React.FC<FileListProps> = ({
  projectStructure,
  setSelectedFile,
}) => {
  return (
    <div className="w-3/10 bg-gray-900 p-4 rounded-lg overflow-auto">
      <h2 className="text-lg font-semibold mb-2">Project Files</h2>
      {projectStructure ? (
        Object.entries(projectStructure).map(([filePath, content]) => (
          <button
            key={filePath}
            className="w-full text-left p-2 text-blue-400 hover:bg-gray-700 rounded-lg focus:outline-none"
            onClick={() => setSelectedFile({ path: filePath, content })}
          >
            {filePath}
          </button>
        ))
      ) : (
        <p className="text-gray-400">No files available.</p>
      )}
    </div>
  );
};

export default FileList;
