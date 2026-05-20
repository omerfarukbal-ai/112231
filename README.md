# qöde - QR Menü ve Ödeme Platformu

qöde, HoReCa (restoran/kafe) sektörü için geliştirilmiş yeni nesil bir QR sipariş ve ödeme platformudur. Bu proje, konseptin MVP (Minimum Viable Product) prototipidir ve in-memory veritabanı ile çalışır.

## Mimari & Özellikler

*   **Müşteri Akışı (Mobil Öncelikli):**
    *   Müşteriler masadaki QR kodu okutarak özel `t_1`, `t_2` gibi masa sayfalarına ulaşır.
    *   Kategori bazlı menü, detaylı ürün kartları (Drawer içinde).
    *   Zustand destekli sepet yönetimi.
    *   Checkout sayfası: Sanal POS entegrasyonu simülasyonu. Ödeme tamamlandıktan sonra sipariş oluşturulur.
*   **Yönetim Paneli (Admin):**
    *   `/admin/dashboard`: Günlük ciro, bekleyen siparişler, son sipariş akışı.
    *   `/admin/kitchen`: Mutfak Ekranı (KDS). Bekleyen ve hazırlanan siparişler anlık (polling ile) güncellenir.
    *   `/admin/menu`: Basit menü yönetimi ve stok (tükendi/stokta) kontrolü.

## Teknolojiler

*   **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
*   **State Management:** Zustand (Client-side sepet yönetimi).
*   **Prototip Veritabanı:** In-memory obje store (`src/lib/db/mockData.ts`).
*   **Tasarım Sistemi:** Dark Premium (#0D0D0D arka plan, Neon Red #E94560, Neon Blue #00D4FF vurgular).

## Kurulum ve Çalıştırma

Proje standart bir Next.js uygulamasıdır. Herhangi bir harici veritabanı kurulumu gerektirmez.

1.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

2.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

3.  Tarayıcıda test edin:
    *   **Müşteri Arayüzü:** `http://localhost:3000/menu/t_1` (Masa 1 için)
    *   **Admin Paneli:** `http://localhost:3000/admin/dashboard`
    *   **Mutfak Ekranı:** `http://localhost:3000/admin/kitchen`

## Gerçek Sistem (Production) İçin Notlar

Projenin üretim ortamı mimarisi için `database/schema.sql` dosyası hazırlanmıştır. Üretime geçerken şu adımlar izlenmelidir:
1.  Supabase projesi oluşturup `schema.sql` dosyasını çalıştırın.
2.  Gerçek bir ödeme altyapısı (örn: İyzico veya Craftgate) entegre edin.
3.  Ödeme sağlayıcısından gelen webhooks'ları n8n gibi bir otomasyon aracı ile karşılayın.
4.  n8n üzerinden Supabase `orders` tablosuna kayıt atın.
5.  Admin KDS ekranındaki polling mekanizmasını Supabase Realtime (WebSocket) ile değiştirin.
