"use client"

import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// isOpen과 toggleOpen 함수를 받아서 폴더를 열고 닫는 컴포넌트
const FileItem = ({ name, isFolder, path,  children, isOpen, toggleOpen }: {
  name: string;
  isFolder: boolean;
  path?: string;
  children?: { name: string; isFolder: boolean, path: string }[];
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <div className="ml-4">
      
      <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
        {isFolder && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        {isFolder ? <Folder size={16} className="mr-2 text-yellow-500" /> : null}
        {/* <span>{name}</span> */}
        <Link
          href={path || '#'}
          className=""
        >
          <span className="">{name}</span>
        </Link>
      </div>
      {isOpen && children && (
        <div className="ml-4">
          {children.map((child, index) => (
            <>             
            <FileItem key={index} {...child} path={child.path} isOpen={isOpen} toggleOpen={toggleOpen} />
            </>
          ))}         
        </div>
      )}
    </div>
  );
};

const FileSystem = () => {
  // 열린 폴더들을 관리하는 상태
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({});

  // 특정 폴더를 열거나 닫을 때 호출되는 함수
  const toggleFolder = (name: string) => {
    setOpenFolders(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const fileStructure = [
    {
      name: '기초정보관리',
      isFolder: true,
    },
    {
      name: '신고서정보관리',
      isFolder: true,
    },
    {
      name: '환급작업',
      isFolder: true,
      children: [
        { name: '환급세액계산', isFolder: false, path: "/test" },
        { name: '계환배제율성검리(환급)', isFolder: false , path: "/test2"},
        { name: '환급결산작업', isFolder: false , path: "/test"},
        { name: '환급Report', isFolder: false , path: "/test2"},
      ],
    },
    { name: '기납작업', isFolder: true },
    { name: '분증작업', isFolder: true },
    { name: '경산작업', isFolder: true },
    { name: '계증명정정작업', isFolder: true },
    { name: '통계자료Report', isFolder: true },
    { name: '송수신작업', isFolder: true },
    { name: 'Web Application', isFolder: true },
    { name: 'Data Management', isFolder: true },
    { name: '세관제출서류(보관용)', isFolder: true },
    { name: '3세대 세관제출서류(보관용)', isFolder: true },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="font-bold mb-2">메뉴</div>
      {fileStructure.map((item, index) => (
        <FileItem
          key={index}
          {...item}
          isOpen={!!openFolders[item.name]}
          toggleOpen={() => toggleFolder(item.name)}
        />
      ))}
    </div>
  );
};

export default FileSystem;