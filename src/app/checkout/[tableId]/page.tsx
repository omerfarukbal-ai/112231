"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage({ params }: { params: { tableId: string } }) {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push(`/menu/${params.tableId}`);
    }
  }, [items, router, params.tableId]);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate POS delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call mock webhook
      const res = await fetch('/api/webhook/payment-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-signature': 'valid-signature'
        },
        body: JSON.stringify({
          table_id: params.tableId,
          payment_ref: `trx_${Date.now()}`,
          items: items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price,
            note: item.note
          }))
        })
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push(`/confirmation/${data.order_id}`);
      } else {
        alert("Ödeme işlenirken bir hata oluştu.");
        setIsProcessing(false);
      }
    } catch {
      alert("Bağlantı hatası.");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <main className="min-h-screen bg-qodeDark max-w-md mx-auto flex flex-col">
      <header className="flex items-center p-4 border-b border-border bg-qodeDark/80 backdrop-blur-lg sticky top-0 z-40">
        <Link href={`/menu/${params.tableId}`}>
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Ödeme Yap</h1>
      </header>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <h2 className="font-semibold text-textSecondary mb-4">Sipariş Özeti</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.product.name}</span>
                <span>{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between items-center font-bold text-lg">
            <span>Toplam</span>
            <span className="text-primary">{formatCurrency(getTotal())}</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-3">
          <div className="bg-qodeDark p-3 rounded-xl">
            <ShieldCheck className="h-6 w-6 text-successGreen" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">3D Secure ile Güvenli Ödeme</h3>
            <p className="text-xs text-textSecondary">Kart bilgileriniz İyzico altyapısı ile korunmaktadır.</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-qodeDark/90 backdrop-blur-lg sticky bottom-0">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl flex gap-2"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="animate-pulse">İşleniyor...</span>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              <span>{formatCurrency(getTotal())} Öde</span>
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
