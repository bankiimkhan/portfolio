import { cookies } from "next/headers";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  return (
    <div className="pt-[72px] min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-6 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
      </div>
    </div>
  );
}
