"use client"

import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjust based on your routing library

// Recursive component for File Items
const FileItem = ({ name, isFolder, items, isOpen, toggleOpen, link, openFolders, toggleFolder }: {
  name: string;
  isFolder: boolean;
  items?: { name: string; isFolder: boolean; link: string,children?: any[] }[];
  isOpen: boolean;
  toggleOpen: () => void;
  link?: string;
  openFolders: { [key: string]: boolean };
  toggleFolder: (name: string) => void;
}) => {
  const router = useRouter();

  return (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer" onClick={() => {
        if (isFolder) {
          toggleOpen();
        } else if (link) {
          router.push(link); // Navigate to link if not a folder
        }
      }}>
        {isFolder && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        {isFolder ? <Folder size={16} className="mr-2 text-yellow-500" /> : null}
        <span>{name}</span>
      </div>
      {isOpen && items && (
        <div className="ml-4">
          {items.map((item, index) => (
            <FileItem
              key={index}
              {...item}
              isOpen={!!openFolders[item.name]}
              toggleOpen={() => toggleFolder(item.name)}
              link={item.link} // Pass link down to nested items if applicable
              openFolders={openFolders} // Pass down openFolders state
              toggleFolder={toggleFolder} // Pass down toggleFolder function
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileItem;
