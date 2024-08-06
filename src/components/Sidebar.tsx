"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  SquareChartGantt,
  Logs,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
  icon?: LucideIcon;
}

interface MenuItemProps {
  item: MenuItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hangleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      {item.children ? (
        <>
          <button
            onClick={hangleMenuToggle}
            aria-expanded={isOpen}
            aria-controls={`submenu-${item.title}`}
            className="flex items-center w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4 mr-1" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1" />
            )}
            {item.icon && (
              <item.icon className="mr-1 h-4 w-4 text-yellow-500" />
            )}
            <span className="text-xs">{item.title}</span>
          </button>
          {isOpen && (
            <div id={`submenu-${item.title}`} className="ml-4">
              {item.children.map((child, index) => (
                <MenuItem
                  key={`submenu-${child.title}-${index}`}
                  item={child}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href || "#"}
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ml-4"
        >
          {item.icon && <item.icon className="mr-1 h-4 w-4 text-yellow-500" />}
          <span className="text-xs">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      title: "기초정보관리",
      icon: Folder,
      children: [
        {
          title: "기초정보관리-1",
          icon: Folder,
          children: [
            { title: "기초정보관리-11", icon: File, href: "/test2" },
            { title: "기초정보관리-12", icon: Logs, href: "/test" },
          ],
        },
        {
          title: "기초정보관리-2",
          icon: Folder,
          children: [
            {
              title: "기초정보관리-21",
              icon: SquareChartGantt,
              href: "/test2",
            },
            { title: "기초정보관리-22", icon: SquareChartGantt, href: "/test" },
          ],
        },
      ],
    },
    {
      title: "신고서정보관리",
      icon: Folder,
      children: [
        {
          title: "신고서정보관리-1",
          icon: Folder,
          children: [
            { title: "신고서정보관리-11", icon: Logs, href: "/test2" },
            { title: "신고서정보관리-12", icon: Logs, href: "/test" },
          ],
        },
        { title: "신고서정보관리-2", icon: Logs, href: "/test2" },
      ],
    },
    {
      title: "환급작업",
      icon: Folder,
      children: [
        { title: "환급세액계산", icon: Logs, href: "/test2" },
        { title: "제한베제옵션관리(환급)", icon: Logs, href: "/test" },
        { title: "환급결산작업", icon: Logs, href: "/test" },
        {
          title: "환급Report",
          icon: Folder,
          href: "/test",
          children: [
            { title: "환급Report-1", icon: Logs, href: "/test2" },
            { title: "환급Report-2", icon: Logs, href: "/test" },
          ],
        },
      ],
    },
    {
      title: "기납작업",
      icon: Folder,
      children: [
        {
          title: "기납작업-1",
          icon: Folder,
          children: [
            { title: "기납작업-11", icon: Logs, href: "/test2" },
            { title: "기납작업-12", icon: Logs, href: "/test" },
          ],
        },
      ],
    },
    {
      title: "분증작업",
      icon: Folder,
      children: [
        { title: "분증작업-11", icon: Logs, href: "/test2" },
        { title: "분증작업-12", icon: Logs, href: "/test" },
      ],
    },
    {
      title: "정산작업",
      icon: Folder,
      children: [
        { title: "정산작업-11", icon: Logs, href: "/test2" },
        { title: "정산작업-12", icon: Logs, href: "/test" },
      ],
    },
    {
      title: "제중명정정작업",
      icon: Folder,
      children: [
        { title: "제중명정정작업-11", icon: Logs, href: "/test2" },
        { title: "제중명정정작업-12", icon: Logs, href: "/test" },
      ],
    },
    {
      title: "통계자료Report",
      icon: Folder,
      children: [
        { title: "통계자료-11", icon: Logs, href: "/test2" },
        { title: "통계자료-12", icon: Logs, href: "/test" },
      ],
    },
    {
      title: "송수신작업",
      icon: Folder,
      children: [{ title: "Web Application", icon: File, href: "/test2" }],
    },
    {
      title: "Data Management",
      icon: Folder,
      children: [
        { title: "Data Management1", icon: Logs, href: "/test2" },
        { title: "Data Management2", icon: Logs, href: "/test" },
      ],
    },
    {
      title: "세관제출서류(보관용)",
      icon: Folder,
      children: [
        { title: "세관제출서류", icon: Logs, href: "/test2" },
        { title: "세관제출서류", icon: Logs, href: "/test" },
      ],
    },
    {
      title: "3세대 세관제출서류(보관용)",
      icon: Folder,
      children: [
        { title: "3세대 세관제출서류-11", icon: Logs, href: "/test2" },
        { title: "3세대 세관제출서류-12", icon: Logs, href: "/test" },
      ],
    },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 h-screen overflow-y-auto overflow-x-hidden transform transition duration-200 ease-in-out">
    <div className="py-4">
      <h2 className="font-semibold px-4">메뉴</h2> 
      <nav className="mt-2">
        {menuItems.map((item, index) => (
          <MenuItem key={`parentmenu-${item.title}-${index}`} item={item} />
        ))}
      </nav>
    </div>
  </div>
  );
};

export default Sidebar;
