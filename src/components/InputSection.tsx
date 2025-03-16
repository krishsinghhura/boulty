import React from "react";

interface InputSectionProps {
  inputText: string;
  setInputText: (value: string) => void;
  fetchProjectJSON: () => void;
  loading: boolean;
  className?: string; // Allow className
}

const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  fetchProjectJSON,
  loading,
  className,
}) => {
  return (
    <div className={`flex w-full space-x-4 mb-4 ${className || ""}`}>
      <input
        className="flex-1 p-4 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter project description..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={fetchProjectJSON}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Project"}
      </button>
    </div>
  );
};

export default InputSection;
