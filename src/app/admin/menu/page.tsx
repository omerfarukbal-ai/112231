"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Category, Product } from '@/lib/db/mockData';
import { Switch } from '@/components/ui/switch';
import { formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MenuManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        setCategories(data.categories || []);
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const defaultCategory = categories.length > 0 ? categories[0].id : '';

  // In a real app, toggling availability would call an API
  // Here we just toggle it in local state for demonstration
  const toggleAvailability = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, is_available: !p.is_available } : p
    ));
  };

  if (loading) return <div className="text-textSecondary">Yükleniyor...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menü Yönetimi</h1>
        <p className="text-textSecondary mt-1">Ürünlerinizi düzenleyin ve stok durumlarını güncelleyin.</p>
      </div>

      <Tabs defaultValue={defaultCategory} className="w-full">
        <TabsList className="bg-card border border-border p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-qodeDark"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6 space-y-4">
            {products
              .filter((p) => p.category_id === category.id)
              .map((product) => (
                <Card key={product.id} className={`bg-card border-border/50 overflow-hidden transition-opacity ${!product.is_available ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="font-medium text-primary">{formatCurrency(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-medium">
                        {product.is_available ? 'Stokta Var' : 'Tükendi'}
                      </span>
                      <Switch
                        checked={product.is_available}
                        onCheckedChange={() => toggleAvailability(product.id)}
                        className="data-[state=checked]:bg-successGreen"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
