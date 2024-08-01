import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute min-h-screen inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/test" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Home
        </Link>
        <Link href="/test2" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          About
        </Link>
        <Link href="/test" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Services
        </Link>
        <Link href="/test" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;