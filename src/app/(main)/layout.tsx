import Sidebar from "@/components/Sidebar";
import ThemeController from "@/components/ThemeController";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar */}
      <Sidebar />

      {/* main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <nav className="sticky top-0 z-10 p-2 flex items-center justify-between h-10">
          <div className="font-semibold text-2xl">Doosan</div>
          <div className="">
            <ThemeController />
          </div>
        </nav>

        {/* main content */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}