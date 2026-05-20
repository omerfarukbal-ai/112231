"use client";

import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter } from '@/components/ui/drawer';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag, X, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export function CartDrawer({ tableId }: { tableId: string }) {
  const { items, getTotal, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="fixed bottom-6 left-0 right-0 px-4 z-50 animate-in slide-in-from-bottom-10 fade-in">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl shadow-lg shadow-primary/20 flex justify-between items-center px-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">{items.reduce((acc, item) => acc + item.quantity, 0)} Ürün</span>
            </div>
            <span className="font-bold text-lg">{formatCurrency(getTotal())}</span>
          </Button>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-qodeDark border-t border-border max-h-[85vh]">
        <div className="mx-auto w-full max-w-md h-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Sepetim</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex flex-col gap-2 bg-card p-3 rounded-xl border border-border/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-primary font-bold">{formatCurrency(item.product.price * item.quantity)}</p>
                    {item.note && <p className="text-xs text-textSecondary mt-1 line-clamp-1">Not: {item.note}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-textSecondary hover:text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border bg-qodeDark"
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.product.id, item.quantity - 1);
                      } else {
                        removeItem(item.product.id);
                      }
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-semibold w-4 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border bg-qodeDark"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DrawerFooter className="border-t border-border bg-qodeDark pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-textSecondary">Toplam</span>
              <span className="text-2xl font-bold">{formatCurrency(getTotal())}</span>
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl"
              onClick={() => {
                setOpen(false);
                setTimeout(() => router.push(`/checkout/${tableId}`), 100);
              }}
            >
              Ödemeye Geç
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
