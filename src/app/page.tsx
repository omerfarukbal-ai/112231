import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-qodeDark flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
          qöde<span className="text-primary text-5xl">.</span>
        </h1>
        <p className="text-textSecondary text-lg max-w-md mx-auto">
          HoReCa (Restoran & Kafe) sektörü için yeni nesil QR sipariş ve ödeme platformu MVP prototipine hoş geldiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-white">Müşteri Arayüzü</h2>
          <p className="text-sm text-textSecondary text-center">
            Müşterilerin masadaki QR kodu okutarak ulaştığı sipariş ve ödeme ekranı. Masa 1 (t_1) için örnek link.
          </p>
          <Link href="/menu/t_1" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl">
              QR Menüye Git (Masa 1)
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-white">Yönetim Paneli</h2>
          <p className="text-sm text-textSecondary text-center">
            Restoran personeli ve yöneticileri için Dashboard, Mutfak Ekranı (KDS) ve Menü Yönetimi paneli.
          </p>
          <Link href="/admin/dashboard" className="w-full">
            <Button className="w-full bg-neonBlue hover:bg-neonBlue/90 text-qodeDark h-12 rounded-xl font-semibold">
              Admin Panele Git
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
