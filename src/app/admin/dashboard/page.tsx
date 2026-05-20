"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/lib/db/mockData';
import { ArrowUpRight, CheckCircle2, Clock, DollarSign, UtensilsCrossed } from 'lucide-react';

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const todayRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const completedOrders = orders.filter(o => o.status === 'ready' || o.status === 'completed').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-textSecondary mt-2">Restoranınızın genel durumu ve günlük metrikler.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük Ciro</CardTitle>
            <DollarSign className="h-4 w-4 text-successGreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(todayRevenue)}</div>
            <p className="text-xs text-textSecondary mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-successGreen" />
              Düne göre +12%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Siparişler</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-neonBlue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrders}</div>
            <p className="text-xs text-textSecondary mt-1">Mutfakta bekleyen/hazırlanan</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-textSecondary mt-1">Bugün teslim edilen</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-textSecondary">Yükleniyor...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-4 text-textSecondary">Henüz sipariş yok.</div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Masa {order.table_id.replace('t_', '')}</p>
                      <p className="text-sm text-textSecondary flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {new Date(order.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(order.total_amount)}</p>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        order.status === 'preparing' ? 'bg-neonBlue/20 text-neonBlue' :
                        'bg-successGreen/20 text-successGreen'
                      }`}>
                        {order.status === 'pending' ? 'Bekliyor' :
                         order.status === 'preparing' ? 'Hazırlanıyor' : 'Hazır'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
