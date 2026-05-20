"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage({ params }: { params: { orderId: string } }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simple entry animation delay
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-qodeDark max-w-md mx-auto flex flex-col items-center justify-center p-6 text-center">
      <div className={`transition-all duration-700 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="w-24 h-24 bg-successGreen/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-14 h-14 text-successGreen" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-white">Sipariş Alındı!</h1>
        <p className="text-textSecondary mb-8">
          Ödemeniz başarıyla tamamlandı. Siparişiniz mutfağa iletildi.
        </p>

        <div className="bg-card rounded-2xl p-6 border border-border/50 mb-8 w-full">
          <p className="text-sm text-textSecondary mb-1">Sipariş Numarası</p>
          <p className="font-mono text-xl font-bold mb-6">{params.orderId}</p>

          <div className="flex items-center justify-center gap-2 text-neonBlue bg-neonBlue/10 p-3 rounded-xl">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Tahmini Hazırlanma: 10-15 dk</span>
          </div>
        </div>

        <Link href="/">
          <Button variant="outline" className="w-full h-14 rounded-xl border-border bg-transparent hover:bg-card">
            Yeni Sipariş Ver
          </Button>
        </Link>
      </div>
    </main>
  );
}
