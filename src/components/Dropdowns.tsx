import React from "react";

interface DropdownsProps {
  styling: string;
  setStyling: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  database: string;
  setDatabase: (value: string) => void;
}

const Dropdowns: React.FC<DropdownsProps> = ({
  styling,
  setStyling,
  language,
  setLanguage,
  database,
  setDatabase,
}) => {
  return (
    <div className="flex space-x-4 mb-4">
      <select
        className="p-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
        value={styling}
        onChange={(e) => setStyling(e.target.value)}
      >
        <option value="tailwind">Tailwind</option>
        <option value="css">CSS</option>
      </select>
      <select
        className="p-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
      </select>
      <select
        className="p-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
        value={database}
        onChange={(e) => setDatabase(e.target.value)}
      >
        <option value="mongodb">MongoDB</option>
        <option value="postgres">PostgreSQL</option>
        <option value="sql">SQL</option>
      </select>
    </div>
  );
};

export default Dropdowns;
