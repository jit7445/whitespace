import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

interface HomeProps {}

const Text: React.FC<HomeProps> = () => {
  const [sentence, setSentence] = useState('');
  const [modifiedParagraphs, setModifiedParagraphs] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentence(e.target.value);
  };

  const insertWhitespace = () => {
   
    const paragraphs = sentence.split('\n');
    
    const modifiedParagraphs = paragraphs.map((paragraph) => {
      
      const boldTextRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let result = '';
  
     
      paragraph.replace(boldTextRegex, (match, p1, offset) => {
       
        result += insertInvisibleSpaces(paragraph.slice(lastIndex, offset));
        
        result += match;
        lastIndex = offset + match.length;
        return match;
      });
  
     
      result += insertInvisibleSpaces(paragraph.slice(lastIndex));
      
      return result;
    });
    
    setModifiedParagraphs(modifiedParagraphs);
  };
  
  
  const insertInvisibleSpaces = (text: string) => {
    const clauses = text.split(/([.,])/); // Split text by punctuation while keeping punctuation
  
    return clauses.map((clause, index) => {
      // Skip punctuation and spaces, only process actual words
      if (/\s{2,}/.test(clause) || clause === '.' || clause === ',') {
        return clause;
      }
  
      let words = clause.split(' ').filter(word => word); // Split clause into words
  
      // Insert zero-width spaces into three random words
      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * words.length);
        let word = words[randomIndex];
        if (word && word.length > 2) { // Check if word is valid and has length > 2
          // Randomly place one zero-width space in the word
          let randomPosition = Math.floor(Math.random() * (word.length - 1)) + 1;
          words[randomIndex] = word.substring(0, randomPosition) + '\u200B' + word.substring(randomPosition);
        }
      }
  
      return words.join(' ') + (index % 2 !== 0 ? clauses[index] : ''); // Add punctuation correctly
    }).join('');
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-900">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Whitespace Inserter</h1>
      <Textarea
        value={sentence}
        onChange={handleChange}
        placeholder="Enter your paragraphs here..."
        className="border border-gray-700 p-4 mt-2 bg-gray-800 text-white rounded-lg shadow-md text-xl"
        rows={30}
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
