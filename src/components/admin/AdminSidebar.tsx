import Link from 'next/link';
import { Home, ChefHat, MenuSquare } from 'lucide-react';

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 hidden md:flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-primary tracking-tight">qöde<span className="text-white text-sm ml-2 font-normal">admin</span></h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-qodeDark transition-colors text-textSecondary hover:text-white">
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/kitchen" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-qodeDark transition-colors text-textSecondary hover:text-white">
          <ChefHat className="h-5 w-5" />
          <span>Mutfak (KDS)</span>
        </Link>
        <Link href="/admin/menu" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-qodeDark transition-colors text-textSecondary hover:text-white">
          <MenuSquare className="h-5 w-5" />
          <span>Menü Yönetimi</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="text-sm">
            <p className="font-semibold">Admin</p>
            <p className="text-textSecondary text-xs">admin@qode.app</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
