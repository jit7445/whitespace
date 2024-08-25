import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

interface HomeProps {}

const Text: React.FC<HomeProps> = () => {
  const [sentence, setSentence] = useState('');
  const [modifiedSentence, setModifiedSentence] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentence(e.target.value);
  };

  const insertWhitespace = () => {
    const words = sentence.split(' ');
    const spacedSentence = words.map((word, index) => {
      if (index < words.length - 1) {
        // Randomly choose between 3 and 4 spaces
        const numSpaces = Math.floor(Math.random() * 2) + 3; // 3 or 4 spaces
        return `${word}${' '.repeat(numSpaces)}`;
      }
      return word;
    }).join('');
    
    setModifiedSentence(spacedSentence);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-900">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Whitespace Inserter</h1>
      <Textarea
        value={sentence}
        onChange={handleChange}
        placeholder="Enter your sentence here..."
        className="border border-gray-700 p-4 mt-2 bg-gray-800 text-white rounded-lg shadow-md text-xl"
        rows={30} // Adjust the number of rows as needed
        cols={40} // Adjust the number of columns as needed
      />
      <button
        onClick={insertWhitespace}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Insert Whitespaces
      </button>
      {modifiedSentence && (
        <div className="mt-6 bg-gray-800 text-white p-4 rounded-lg shadow-md">
          <p className="text-xl">
            Modified Sentence: <span className="font-mono">{modifiedSentence}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Text;
