import { useState } from 'react';
import copy from 'clipboard-copy';

const CopyToClipboardButton = ({ text }:any) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <div>
      <button className='bg-sky-500  w-auto p-2 rounded-md mt-3' onClick={handleCopyClick}>
        {isCopied ? 'Copied!' : 'Copy '}
      </button>
    </div>
  );
};

export default CopyToClipboardButton;