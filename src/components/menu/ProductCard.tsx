"use client";

import { useState } from 'react';
import { Product } from '@/lib/db/mockData';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product, quantity, note);
    setIsOpen(false);
    setQuantity(1);
    setNote('');
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="flex bg-card rounded-xl overflow-hidden border border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
            </div>
            <p className="font-bold text-primary mt-3">{formatCurrency(product.price)}</p>
          </div>
          <div className="w-32 h-32 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-qodeDark border-t border-border">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-2xl text-center">{product.name}</DrawerTitle>
            <p className="text-center text-muted-foreground mt-2">{product.description}</p>
            <p className="text-center font-bold text-primary text-xl mt-2">{formatCurrency(product.price)}</p>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-6">
            <div className="flex items-center justify-center space-x-6">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-border bg-card"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-5 w-5" />
              </Button>
              <span className="text-3xl font-bold w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-border bg-card"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note" className="text-textSecondary">Sipariş Notu (Opsiyonel)</Label>
              <Input
                id="note"
                placeholder="Örn: Az şekerli olsun..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-card border-border"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl"
              onClick={handleAdd}
            >
              Sepete Ekle - {formatCurrency(product.price * quantity)}
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" className="text-textSecondary">İptal</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
