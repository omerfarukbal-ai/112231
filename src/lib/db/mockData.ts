export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
};

export type Table = {
  id: string;
  restaurant_id: string;
  table_number: number;
  qr_code_url: string;
};

export type Category = {
  id: string;
  restaurant_id: string;
  name: string;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  note?: string;
};

export type Order = {
  id: string;
  restaurant_id: string;
  table_id: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  total_amount: number;
  payment_ref: string;
  created_at: string;
  items: OrderItem[];
};

// Seed Data
export const mockRestaurant: Restaurant = {
  id: 'r_1',
  name: 'Qöde Cafe & Brasserie',
  slug: 'qode-cafe',
  owner_id: 'user_1',
  created_at: new Date().toISOString(),
};

export const mockTables: Table[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `t_${i + 1}`,
  restaurant_id: 'r_1',
  table_number: i + 1,
  qr_code_url: `https://qode.app/menu/t_${i + 1}`,
}));

export const mockCategories: Category[] = [
  { id: 'c_1', restaurant_id: 'r_1', name: 'Kahveler', sort_order: 1 },
  { id: 'c_2', restaurant_id: 'r_1', name: 'Tatlılar', sort_order: 2 },
  { id: 'c_3', restaurant_id: 'r_1', name: 'Soğuk İçecekler', sort_order: 3 },
];

export const mockProducts: Product[] = [
  {
    id: 'p_1',
    category_id: 'c_1',
    name: 'Espresso',
    description: 'Yoğun ve aromatik İtalyan espressosu.',
    price: 65,
    image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_2',
    category_id: 'c_1',
    name: 'Americano',
    description: 'Espresso üzerine sıcak su.',
    price: 75,
    image_url: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_3',
    category_id: 'c_1',
    name: 'Latte',
    description: 'Buharda ısıtılmış süt ve espresso.',
    price: 90,
    image_url: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_4',
    category_id: 'c_1',
    name: 'Cappuccino',
    description: 'Eşit oranda espresso, sıcak süt ve süt köpüğü.',
    price: 90,
    image_url: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_5',
    category_id: 'c_2',
    name: 'San Sebastian Cheesecake',
    description: 'İçi akışkan, üzeri yanık İspanyol usulü cheesecake.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1605333396914-2c26e475df0b?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_6',
    category_id: 'c_2',
    name: 'Tiramisu',
    description: 'Orijinal mascarpone peynirli İtalyan tiramisu.',
    price: 160,
    image_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_7',
    category_id: 'c_2',
    name: 'Brownie',
    description: 'Cevizli ve yoğun çikolatalı ıslak brownie.',
    price: 140,
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_8',
    category_id: 'c_2',
    name: 'Orman Meyveli Turta',
    description: 'Taze orman meyveleri ve kıtır hamur.',
    price: 150,
    image_url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_9',
    category_id: 'c_3',
    name: 'Buzlu Latte',
    description: 'Soğuk süt, buz ve espresso.',
    price: 95,
    image_url: 'https://images.unsplash.com/photo-1461023058943-07cb14c9789c?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_10',
    category_id: 'c_3',
    name: 'Ev Yapımı Limonata',
    description: 'Taze sıkılmış limon suyu ve nane ile.',
    price: 85,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_11',
    category_id: 'c_3',
    name: 'Karpuzlu Frozen',
    description: 'Taze karpuz ve buz.',
    price: 110,
    image_url: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=500&h=500&fit=crop',
    is_available: true,
  },
  {
    id: 'p_12',
    category_id: 'c_3',
    name: 'Soğuk Demleme (Cold Brew)',
    description: '24 saat soğuk suda demlenmiş kahve.',
    price: 105,
    image_url: 'https://images.unsplash.com/photo-1499961024600-ad094db6050b?w=500&h=500&fit=crop',
    is_available: true,
  },
];

// In-Memory Database Store
class Database {
  restaurant: Restaurant = mockRestaurant;
  tables: Table[] = [...mockTables];
  categories: Category[] = [...mockCategories];
  products: Product[] = [...mockProducts];
  orders: Order[] = [];

  // Simulate an auto-incrementing ID for orders
  private nextOrderId = 1;

  createOrder(tableId: string, items: Omit<OrderItem, 'id' | 'order_id'>[], paymentRef: string): Order {
    const orderId = `o_${this.nextOrderId++}`;

    let totalAmount = 0;
    const orderItems: OrderItem[] = items.map((item, index) => {
      totalAmount += item.unit_price * item.quantity;
      return {
        ...item,
        id: `oi_${orderId}_${index}`,
        order_id: orderId,
      };
    });

    const newOrder: Order = {
      id: orderId,
      restaurant_id: this.restaurant.id,
      table_id: tableId,
      status: 'pending',
      total_amount: totalAmount,
      payment_ref: paymentRef,
      created_at: new Date().toISOString(),
      items: orderItems,
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      return true;
    }
    return false;
  }
}

// Global instance
export const db = new Database();
