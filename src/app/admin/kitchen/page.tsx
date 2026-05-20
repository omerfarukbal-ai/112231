"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order } from '@/lib/db/mockData';
import { Check, ChefHat, Clock } from 'lucide-react';

import { Product } from '@/lib/db/mockData';

export default function KitchenDisplayScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (data.products) {
        const map: Record<string, Product> = {};
        data.products.forEach((p: Product) => {
          map[p.id] = p;
        });
        setProductsMap(map);
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Polling every 3s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      });
      fetchOrders(); // immediate refresh
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mutfak Ekranı (KDS)</h1>
          <p className="text-textSecondary mt-1">Gelen siparişleri buradan yönetin.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm">Bekliyor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-neonBlue"></span>
            <span className="text-sm">Hazırlanıyor</span>
          </div>
        </div>
      </div>

      {activeOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-textSecondary bg-card rounded-2xl border border-border/50">
          <ChefHat className="h-16 w-16 mb-4 opacity-50" />
          <h3 className="text-xl font-semibold">Harika! Bekleyen sipariş yok.</h3>
          <p>Yeni siparişler geldiğinde burada belirecek.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeOrders.map(order => (
            <Card
              key={order.id}
              className={`bg-card border-2 transition-colors ${
                order.status === 'pending' ? 'border-yellow-500/50' : 'border-neonBlue/50'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold">Masa {order.table_id.replace('t_', '')}</CardTitle>
                  <span className="text-sm text-textSecondary flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(order.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-md inline-block w-max ${
                  order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-neonBlue/20 text-neonBlue'
                }`}>
                  {order.id}
                </div>
              </CardHeader>

              <CardContent className="py-4 border-y border-border/50 min-h-[150px]">
                <ul className="space-y-3">
                  {order.items.map(item => (
                    <li key={item.id} className="flex gap-3">
                      <span className="font-bold text-lg min-w-[24px]">{item.quantity}x</span>
                      <div>
                        <span className="font-medium text-lg leading-tight block">{productsMap[item.product_id]?.name || 'Bilinmeyen Ürün'}</span>
                        {item.note && (
                          <span className="text-sm text-primary bg-primary/10 px-2 py-0.5 rounded mt-1 inline-block">
                            Not: {item.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                {order.status === 'pending' ? (
                  <Button
                    className="w-full bg-neonBlue hover:bg-neonBlue/90 text-qodeDark font-semibold"
                    onClick={() => updateStatus(order.id, 'preparing')}
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    Hazırlamaya Başla
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-successGreen hover:bg-successGreen/90 text-qodeDark font-semibold"
                    onClick={() => updateStatus(order.id, 'ready')}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Hazır (Teslim Et)
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
