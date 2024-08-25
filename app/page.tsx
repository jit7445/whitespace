'use client'
import { useState } from 'react';
import Text from '@/components/Text';
export default function Home() {
  const [text, setText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <main className="h-full flex flex-col bg-black">
     <Text/>
    </main>
  );
}