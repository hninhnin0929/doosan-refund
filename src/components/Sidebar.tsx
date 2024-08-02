"use client";

import React, { MouseEvent, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { atom, useAtom } from 'jotai';

interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

interface MenuItemProps {
  item: MenuItem;
}

// Define atom for managing open/close state
const openItemsAtom = atom<{ [key: string]: boolean }>({});

const MenuItem: React.FC<MenuItemProps> = React.memo(({ item }) => {
  const [openItems, setOpenItems] = useAtom(openItemsAtom);
  const isOpen = openItems[item.title] || false;

  const handleButtonClick = useCallback(() => {
    setOpenItems((prevState: { [x: string]: any; }) => ({
      ...prevState,
      [item.title]: !prevState[item.title],
    }));
  }, [item.title, setOpenItems]);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      {item.children ? (
        <>
          <button
            onClick={handleButtonClick}
            aria-expanded={isOpen}
            aria-controls={`submenu-${item.title}`}
            className="flex items-center w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <Folder className="mr-2 h-4 w-4 text-yellow-500" />
            <span className="flex-grow text-left">{item.title}</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {isOpen && (
            <div id={`submenu-${item.title}`} className="ml-4">
              {item.children.map((child, index) => (
                <MenuItem key={`submenu-${child.title}-${index}`} item={child} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href || '#'}
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          onClick={handleLinkClick}
        >
          <div className="mr-2 h-4 w-4" aria-hidden="true"></div>
          <span className="">{item.title}</span>
        </Link>
      )}
    </div>
  );
});
MenuItem.displayName = 'MenuItem';

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      title: 'Sales',
      children: [
        { title: 'Orders', href: '/test' },
        {
          title: 'Invoices',
          children: [
            { title: 'Invoices1', href: '/test2' },
            { title: 'Invoices2', href: '/test' },
          ],
        },
      ],
    },
    {
      title: 'Inventory',
      children: [
        { title: 'Products', href: '/inventory/products' },
        { title: 'Stock', href: '/inventory/stock' },
      ],
    },
    { title: 'Customers', href: '/customers' },
    { title: 'Reports', href: '/reports' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute min-h-screen inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {menuItems.map((item, index) => (
          <MenuItem key={`parentmenu-${item.title}-${index}`} item={item} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
