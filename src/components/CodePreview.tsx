import React from "react";

interface CodePreviewProps {
  selectedFile: { path: string; content: string } | null;
}

const CodePreview: React.FC<CodePreviewProps> = ({ selectedFile }) => {
  return (
    <div className="w-7/10 bg-gray-900 text-white p-4 ml-4 rounded-lg overflow-auto shadow-lg">
      {selectedFile ? (
        <div>
          <h2 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-2">
            {selectedFile.path}
          </h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm text-white font-mono">
            <code>{selectedFile.content}</code>
          </pre>
        </div>
      ) : (
        <p className="text-gray-400">Select a file to view its content.</p>
      )}
    </div>
  );
};

export default CodePreview;
