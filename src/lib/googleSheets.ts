
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

interface SheetConfig {
  spreadsheetId: string;
  range: string;
}

// Your Google Sheet configuration
const SHEET_CONFIG: SheetConfig = {
  spreadsheetId: '1gTAlaI-j4BsjNzJBgGc5arSDP30Gmd8FlEjfWdi5tDo',
  range: 'Sheet1!A:I' // Adjust range based on your sheet structure
};

// Mock function for development - will be replaced with actual Google Sheets API
export const fetchOrdersFromSheet = async (): Promise<OrderData[]> => {
  try {
    // This will be replaced with actual Google Sheets API call
    // For now, returning mock data to demonstrate the structure
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
    
    return mockOrders;
  } catch (error) {
    console.error('Error fetching orders from Google Sheets:', error);
    throw error;
  }
};

export const addOrderToSheet = async (orderData: OrderData): Promise<void> => {
  try {
    // This will be replaced with actual Google Sheets API call
    console.log('Adding order to Google Sheets:', orderData);
    // For now, just log the data
  } catch (error) {
    console.error('Error adding order to Google Sheets:', error);
    throw error;
  }
};

export const updateOrderStatus = async (rowIndex: number, status: string): Promise<void> => {
  try {
    // This will be replaced with actual Google Sheets API call
    console.log(`Updating order status at row ${rowIndex} to ${status}`);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
