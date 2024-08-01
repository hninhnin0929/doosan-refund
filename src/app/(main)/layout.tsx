import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // menu layout
    <div className="flex h-screen overflow-hidden">
        {/* header */}
      <nav className="fixed w-full z-10 p-2 bg-green-500 left-64">Header Header Header</nav>
      {/* sidebar */}
      <Sidebar />
      {/* main content */}
      <div className="bg-base-200 px-8 py-12 min-h-screen flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
