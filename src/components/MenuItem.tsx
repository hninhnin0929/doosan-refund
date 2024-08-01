import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';

interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

interface MenuItemProps {
  item: MenuItem;
  openDropdowns: Set<string>;
  toggleDropdown: (title: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, openDropdowns, toggleDropdown }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = hasChildren && openDropdowns.has(item.title);

  const handleButtonClick = () => {
    if (hasChildren) {
      toggleDropdown(item.title);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Prevent click from affecting the dropdown
  };

  return (
    <div>
      {hasChildren ? (
        <>
          <button
            onClick={handleButtonClick}
            aria-expanded={isOpen}
            aria-controls={`submenu-${item.title}`}
            className="flex items-center w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <Folder className="mr-2 h-4 w-4" />
            <span className="flex-grow text-left">{item.title}</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {isOpen && (
            <div id={`submenu-${item.title}`} className="ml-4">
              {item.children?.map((child, index) => (
                <MenuItem
                  key={index}
                  item={child}
                  openDropdowns={openDropdowns}
                  toggleDropdown={toggleDropdown}
                />
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
          {/* Placeholder for alignment */}
          <div className="mr-2 h-4 w-4" aria-hidden="true"></div>
          <span className="flex-grow text-left">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
