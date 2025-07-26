import { USER_ROLES } from '../utils/constants';

// --- MOCK DATABASE ---
let mockUsers = [
  { id: 1, email: 'owner@lali.com', password: 'password', role: USER_ROLES.OWNER, name: 'Lali Owner' },
  { id: 2, email: 'employee@lali.com', password: 'password', role: USER_ROLES.EMPLOYEE, name: 'John Doe' },
  { id: 3, email: 'user@lali.com', password: 'password', role: USER_ROLES.USER, name: 'Jane Smith' },
  { id: 4, email: 'test.user@example.com', password: 'password', role: USER_ROLES.USER, name: 'Test User' },
];

// let mockProducts = [
//   { id: 1, name: 'Elegant Evening Gown', types: ['sale'], price: 250, stock: 5, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e054234f5c?auto=format&fit=crop&q=80&w=800', description: 'A stunning silk gown perfect for formal events.' },
//   { id: 2, name: 'Summer Floral Dress', types: ['sale', 'rent'], price: 90, rentalPrice: 30, stock: 3, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d916b67ea74f?auto=format&fit=crop&q=80&w=800', description: 'Light and airy, ideal for a summer day out.' },
//   { id: 3, name: 'Classic Business Suit', types: ['sale', 'tailoring'], price: 400, stock: 8, imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800', description: 'A sharp, modern suit for the professional woman.' },
//   { id: 4, name: 'Wedding Tuxedo', types: ['rent', 'tailoring'], rentalPrice: 120, stock: 2, imageUrl: 'https://images.unsplash.com/photo-1627932885935-176395982f6e?auto=format&fit=crop&q=80&w=800', description: 'Look your best on the special day with this classic tuxedo.' },
// ];

let mockRentals = [
    { id: 1, productId: 2, userId: 3, startDate: '2024-08-10', endDate: '2024-08-12', status: 'Confirmed' },
    { id: 2, productId: 4, userId: 4, startDate: '2024-08-20', endDate: '2024-08-23', status: 'Confirmed' },
];

let mockOrders = [
    { id: 1, userId: 3, type: 'sale', productId: 1, quantity: 1, totalPrice: 250, status: 'Completed', date: '2024-07-15' },
    { id: 2, userId: 4, type: 'rent', productId: 2, rentalId: 1, totalPrice: 60, status: 'Confirmed', date: '2024-07-20' },
    { id: 3, userId: 3, type: 'tailoring', description: 'Need to alter the sleeves of my business suit.', status: 'Pending', date: '2024-07-22' },
];

const mockSalesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    sales: [1200, 1900, 3000, 5000, 2300, 3200],
    rentals: [400, 600, 900, 1500, 700, 1100],
};

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- EXPORTED API FUNCTIONS ---

// Auth
export const loginUser = async (email, password) => {
  await delay(500);
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) return Promise.resolve({ ...user, token: `mock-jwt-token-for-${user.role}` });
  return Promise.reject('Invalid email or password');
};

export const registerUser = async ({ name, email, password }) => {
    await delay(600);
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
        return Promise.reject('An account with this email already exists.');
    }
    const newUser = {
        id: mockUsers.length + 1, name, email, password, role: USER_ROLES.USER
    };
    mockUsers.push(newUser);
    return Promise.resolve({ ...newUser });
};

// Products
export const fetchProducts = async () => { await delay(500); return Promise.resolve(mockProducts); };
export const fetchProductById = async (id) => {
    await delay(300);
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (product) return Promise.resolve(product);
    return Promise.reject('Product not found');
};

export const createProduct = async (productData) => {
    await delay(500);
    const newProduct = {
        ...productData,
        id: mockProducts.length > 0 ? Math.max(...mockProducts.map(p => p.id)) + 1 : 1, // Ensure unique ID
    };
    mockProducts.push(newProduct);
    return Promise.resolve(newProduct);
};

export const updateProduct = async (productId, updates) => {
    await delay(500);
    let productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        mockProducts[productIndex] = { ...mockProducts[productIndex], ...updates };
        return Promise.resolve(mockProducts[productIndex]);
    }
    return Promise.reject('Product not found');
};

export const deleteProduct = async (productId) => {
    await delay(500);
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        mockProducts.splice(productIndex, 1);
        return Promise.resolve({ message: 'Product deleted successfully' });
    }
    return Promise.reject('Product not found');
};


// Rentals
export const fetchRentalsForProduct = async (productId) => {
    await delay(200);
    return Promise.resolve(mockRentals.filter(r => r.productId === parseInt(productId)));
};

// Orders
export const createOrder = async (orderData) => {
    await delay(700);
    const newOrder = { ...orderData, id: mockOrders.length + 1, date: new Date().toISOString().split('T')[0], status: 'Pending' };
    if (orderData.type === 'rent') {
        const newRental = { id: mockRentals.length + 1, productId: orderData.productId, userId: orderData.userId, startDate: orderData.startDate, endDate: orderData.endDate, status: 'Pending' };
        mockRentals.push(newRental);
        newOrder.rentalId = newRental.id;
    }
    mockOrders.push(newOrder);
    return Promise.resolve(newOrder);
};

export const fetchOrders = async () => {
    await delay(800);
    const populatedOrders = mockOrders.map(order => {
        const user = mockUsers.find(u => u.id === order.userId);
        const product = mockProducts.find(p => p.id === order.productId);
        return {
            ...order,
            customerName: user ? user.name : 'Unknown User',
            productName: product ? product.name : 'Custom Item',
        };
    }).reverse();
    return Promise.resolve(populatedOrders);
};

export const updateOrderStatus = async (orderId, status) => {
    await delay(400);
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        if(order.rentalId) {
            const rental = mockRentals.find(r => r.id === order.rentalId);
            if (rental) rental.status = status;
        }
        return Promise.resolve(order);
    }
    return Promise.reject('Order not found');
};

// Owner/Employee Specific
export const fetchDashboardData = async () => { await delay(700); return Promise.resolve({ totalSales: 16600, totalRentals: 5200, newOrders: 15, pendingTailoring: 4, chartData: mockSalesData }); };
export const fetchAllUsers = async () => { await delay(600); return Promise.resolve(mockUsers); };
export const updateUser = async (userId, updates) => {
    await delay(500);
    let userIndex = mockUsers.findIndex(u => u.id === userId);
    if(userIndex > -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
        return Promise.resolve(mockUsers[userIndex]);
    }
    return Promise.reject('User not found');
};

// In src/api/mockApi.js, replace the old mockProducts array
// let mockProducts = [
//   { id: 1, name: 'Elegant Evening Gown', types: ['sale'], price: 250, stock: 5, 
//     imageUrls: ['https://images.unsplash.com/photo-1595777457583-95e054234f5c?auto=format&fit=crop&q=80&w=800'], 
//     description: 'A stunning silk gown perfect for formal events.' },
//   { id: 2, name: 'Summer Floral Dress', types: ['sale', 'rent'], price: 90, rentalPrice: 30, stock: 3, 
//     imageUrls: [
//         'https://images.unsplash.com/photo-1591047139829-d916b67ea74f?auto=format&fit=crop&q=80&w=800',
//         'https://images.unsplash.com/photo-1579294935439-534725305335?auto=format&fit=crop&q=80&w=800',
//     ], 
//     description: 'Light and airy, ideal for a summer day out.' },
//   { id: 3, name: 'Classic Business Suit', types: ['sale', 'tailoring'], price: 400, stock: 8, 
//     imageUrls: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800'], 
//     description: 'A sharp, modern suit for the professional woman.' },
//   { id: 4, name: 'Wedding Tuxedo', types: ['rent', 'tailoring'], rentalPrice: 120, stock: 2, 
//     imageUrls: [
//         'https://images.unsplash.com/photo-1627932885935-176395982f6e?auto=format&fit=crop&q=80&w=800',
//         'https://images.unsplash.com/photo-1576024102211-80de1a117028?auto=format&fit=crop&q=80&w=800',
//         'https://images.unsplash.com/photo-1621931327177-163e72152d11?auto=format&fit=crop&q=80&w=800',
//     ], 
//     description: 'Look your best on the special day with this classic tuxedo.' },
// ];
// import { USER_ROLES } from '../utils/constants';

// --- MOCK DATABASE ---
// let mockUsers = [ /* ... same as before ... */ ];

// NEW: Centralized content management for the homepage
const mockSiteContent = {
    heroImages: [
        { src: '/images/hero/hero-1.jpg', alt: 'Elegant woman in a beautiful dress' }
    ],
    customerGalleryImages: [
        { src: '/images/gallery/customer-1.jpg', alt: 'Customer in an elegant evening gown' },
        { src: '/images/gallery/customer-2.jpg', alt: 'Customer in a stylish summer dress' },
        { src: '/images/gallery/customer-3.jpg', alt: 'Customer looking sharp in a tailored suit' },
        { src: '/images/gallery/customer-4.jpg', alt: 'Customer at a wedding in a rental tuxedo' },
    ]
};

// UPDATED: Products now use local image paths
// let mockProducts = [
//   { id: 1, name: 'Elegant Evening Gown', types: ['sale'], price: 250, stock: 5, 
//     imageUrls: ['/images/products/gown-1.jpg'], 
//     description: 'A stunning silk gown perfect for formal events.' },
//   { id: 2, name: 'Summer Floral Dress', types: ['sale', 'rent'], price: 90, rentalPrice: 30, stock: 3, 
//     imageUrls: ['/images/products/dress-1.jpg', '/images/products/dress-2.jpg'], 
//     description: 'Light and airy, ideal for a summer day out.' },
//   { id: 3, name: 'Classic Business Suit', types: ['sale', 'tailoring'], price: 400, stock: 8, 
//     imageUrls: ['/images/products/suit-1.jpg'], 
//     description: 'A sharp, modern suit for the professional woman.' },
//   { id: 4, name: 'Wedding Tuxedo', types: ['rent', 'tailoring'], rentalPrice: 120, stock: 2, 
//     imageUrls: ['/images/products/tuxedo-1.jpg'], 
//     description: 'Look your best on the special day with this classic tuxedo.' },
// ];

// let mockRentals = [ /* ... same as before ... */ ];
// let mockOrders = [ /* ... same as before ... */ ];
// const mockSalesData = { /* ... same as before ... */ };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- EXPORTED API FUNCTIONS ---

// NEW: API function to fetch homepage content
export const fetchSiteContent = async () => {
    await delay(100); // Simulate very fast fetch for site content
    return Promise.resolve(mockSiteContent);
};

// ... (All other export functions like loginUser, fetchProducts, etc., remain exactly the same)
// export const loginUser = async (email, password) => { /* ... same as before ... */ };
// export const registerUser = async ({ name, email, password }) => { /* ... same as before ... */ };
// export const fetchProducts = async () => { await delay(500); return Promise.resolve(mockProducts); };
// export const fetchProductById = async (id) => { /* ... same as before ... */ };
// export const createProduct = async (productData) => { /* ... same as before ... */ };
// export const updateProduct = async (productId, updates) => { /* ... same as before ... */ };
// export const deleteProduct = async (productId) => { /* ... same as before ... */ };
// export const fetchRentalsForProduct = async (productId) => { /* ... same as before ... */ };
// export const createOrder = async (orderData) => { /* ... same as before ... */ };
// export const fetchOrders = async () => { /* ... same as before ... */ };
// export const updateOrderStatus = async (orderId, status) => { /* ... same as before ... */ };
// export const fetchDashboardData = async () => { /* ... same as before ... */ };
// export const fetchAllUsers = async () => { /* ... same as before ... */ };
// export const updateUser = async (userId, updates) => { /* ... same as before ... */ };




// In src/api/mockApi.js, update the mockProducts array

let mockProducts = [
  { id: 1, name: 'Elegant Evening Gown', types: ['sale'], price: 250, stock: 5, 
    imageUrls: ['/images/products/gown-1.jpg'], 
    description: 'A stunning silk gown perfect for formal events.',
    featured: true // Mark as featured
  },
  { id: 2, name: 'Summer Floral Dress', types: ['sale', 'rent'], price: 90, rentalPrice: 30, stock: 3, 
    imageUrls: ['/images/products/dress-1.jpg', '/images/products/dress-2.jpg'], 
    description: 'Light and airy, ideal for a summer day out.' 
  },
  { id: 3, name: 'Classic Business Suit', types: ['sale', 'tailoring'], price: 400, stock: 8, 
    imageUrls: ['/images/products/suit-1.jpg'], 
    description: 'A sharp, modern suit for the professional woman.',
    featured: true // Mark as featured
  },
  { id: 4, name: 'Wedding Tuxedo', types: ['rent', 'tailoring'], rentalPrice: 120, stock: 2, 
    imageUrls: ['/images/products/tuxedo-1.jpg'], 
    description: 'Look your best on the special day with this classic tuxedo.',
    featured: true // Mark as featured
  },
];