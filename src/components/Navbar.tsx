import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser();

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-lg shadow-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary tracking-wide hover:opacity-80">
          Socially
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Navigation Desktop */}
        <DesktopNavbar />

        {/* Navigation Mobile */}
        <MobileNavbar />
      </div>
    </nav>
  );
}

export default Navbar;