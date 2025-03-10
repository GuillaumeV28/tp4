import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";
import Weather from "@/components/Weather";

async function Sidebar() {
  const user = await currentUser();
  if (user) await syncUser();

  return (
    <div className="sticky top-20 w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Tableau de bord</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-100">
              🏠 Accueil
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-6">
        <Weather />
      </div>
    </div>
  );
}

export default Sidebar;
