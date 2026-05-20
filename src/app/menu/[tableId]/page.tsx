import { Category, Product, db } from '@/lib/db/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProductCard } from '@/components/menu/ProductCard';
import { CartDrawer } from '@/components/menu/CartDrawer';

export default async function MenuPage({ params }: { params: { tableId: string } }) {
  const { restaurant, categories, products } = db;

  if (!restaurant) {
    return <div className="p-8 text-center text-textSecondary">Menü yükleniyor veya bulunamadı...</div>;
  }

  // Determine active category (default to first)
  const defaultCategory = categories.length > 0 ? categories[0].id : '';

  return (
    <main className="min-h-screen bg-qodeDark pb-24 max-w-md mx-auto relative shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-qodeDark/80 backdrop-blur-lg border-b border-border p-4">
        <h1 className="text-xl font-bold text-center">{restaurant.name}</h1>
        <p className="text-sm text-textSecondary text-center">Masa {params.tableId.replace('t_', '')}</p>
      </header>

      {/* Menu Content */}
      <div className="p-4">
        <Tabs defaultValue={defaultCategory} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap mb-6 -mx-4 px-4">
            <TabsList className="bg-transparent p-0 flex gap-2 w-max">
              {categories.map((category: Category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white bg-card border border-border rounded-full px-6 py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>

          {categories.map((category: Category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4 mt-0">
              {products
                .filter((p: Product) => p.category_id === category.id && p.is_available)
                .map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <CartDrawer tableId={params.tableId} />
    </main>
  );
}
