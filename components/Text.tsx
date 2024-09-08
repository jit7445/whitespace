import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import {  SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
interface HomeProps {}

const Text: React.FC<HomeProps> = () => {
  const [sentence, setSentence] = useState('');
  const [modifiedParagraphs, setModifiedParagraphs] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentence(e.target.value);
  };

  const insertWhitespace = () => {
    // Split the input text by newline characters to get individual paragraphs
    const paragraphs = sentence.split('\n');

    const modifiedParagraphs = paragraphs.map((paragraph) => {
      // Split the paragraph by periods or commas
      const clauses = paragraph.split(/([.,])/);

      const wordspace = clauses.map((clause, index) => {
        if (clause !== '.' && clause !== ',') {
          let words = clause.split(' ').filter(word => word); // Split clause into words

          for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * words.length);
            let word = words[randomIndex];
            if (word && word.length > 2) {
              let randomPosition = 1;
              words[randomIndex] = word.substring(0,1) + '\u200B' + word.substring(1);
            }
          }

          // Join the words back into a clause
          return words.join(' ') + (index % 2 !== 0 ? clauses[index] : '');
        }

        return clause;
      }).join('');

      return wordspace;
    });

    setModifiedParagraphs(modifiedParagraphs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-900">
      <header className='flex justify-center items-center bg-gray-400 rounded-xl'>
      
      
      </header>
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Whitespace Inserter</h1>
      <Textarea
        value={sentence}
        onChange={handleChange}
        placeholder="Enter your paragraphs here..."
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
      {modifiedParagraphs.length > 0 && (
        <div className="mt-6 bg-gray-800 text-white p-4 m-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Modified Paragraphs:</h2>
          {modifiedParagraphs.map((paragraph, index) => (
            <p key={index} className="text-xl mb-4">
              <span className="font-mono">{paragraph}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Text;
