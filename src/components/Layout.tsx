import Sidebar from "@/components/Sidebar";
import ThemeController from "@/components/ThemeController";

export default function Layout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar */}
      <Sidebar />

      {/* main content area */}
      <div className="flex-1 flex flex-col">
        {/* header */}
        <nav className="sticky top-0 z-10 p-2 flex items-center justify-between h-10 bg-green-50">
          <div className="font-semibold text-lg">{title || 'Dashboard'}</div>
          <div className="">
            <ThemeController />
          </div>
        </nav>

        {/* main content */}
        <div className="bg-base-200 px-4 py-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}