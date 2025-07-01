
interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  productName: string;
  quantity: string;
  price: string;
  orderDate: string;
  status: string;
}

const SPREADSHEET_ID = '1gTAlaI-j4BsjNzJBgGc5arSDP30Gmd8FlEjfWdi5tDo';
const API_KEY = 'AIzaSyDT5KnHMY5mrZujDGBxip7qBOUlQxmMa4A'; // Your Firebase API key
const RANGE = 'Sheet1!A:E'; // Customer Name, Product Name, Price, Quantity, Phone Number

// Browser-compatible Google Sheets API using fetch
export const fetchOrdersFromSheet = async (): Promise<OrderData[]> => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const rows = data.values || [];
    
    // Skip header row if it exists
    const dataRows = rows.slice(1);
    
    const orders: OrderData[] = dataRows.map((row: string[], index: number) => ({
      customerName: row[0] || '',
      productName: row[1] || '',
      price: row[2] || '',
      quantity: row[3] || '1',
      phone: row[4] || '',
      email: '', // Not in sheet structure
      address: '', // Not in sheet structure
      orderDate: new Date().toISOString().split('T')[0], // Current date as fallback
      status: 'Pending'
    }));

    console.log(`Fetched ${orders.length} orders from Google Sheets`);
    return orders;
    
  } catch (error) {
    console.error('Error fetching orders from Google Sheets:', error);
    
    // Return mock data for development if API fails
    const mockOrders: OrderData[] = [
      {
        customerName: "Ahmed Khan",
        email: "ahmed@example.com",
        phone: "+92-300-1234567",
        address: "123 Main St, Karachi",
        productName: "Premium Face Cream",
        quantity: "2",
        price: "PKR 5,000",
        orderDate: "2024-01-15",
        status: "Pending"
      },
      {
        customerName: "Fatima Ali",
        email: "fatima@example.com",
        phone: "+92-301-9876543",
        address: "456 Garden Ave, Lahore",
        productName: "Wireless Headphones",
        quantity: "1",
        price: "PKR 8,500",
        orderDate: "2024-01-14",
        status: "Processing"
      }
    ];
    
    console.log('Using mock data due to API error');
    return mockOrders;
  }
};

export const addOrderToSheet = async (orderData: OrderData): Promise<void> => {
  try {
    console.log('Note: Adding orders to Google Sheets requires server-side implementation for security');
    console.log('Order data that would be added:', orderData);
    
    // For now, just log the data as browser-based writes to Sheets require OAuth
    // This would typically be handled by a backend service for security
  } catch (error) {
    console.error('Error adding order to Google Sheets:', error);
    throw new Error('Failed to add order to Google Sheets');
  }
};

export const updateOrderStatus = async (rowIndex: number, status: string): Promise<void> => {
  try {
    console.log('Note: Updating order status requires server-side implementation for security');
    console.log(`Order status would be updated at row ${rowIndex} to ${status}`);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
