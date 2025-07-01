
import { google } from 'googleapis';

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

// Service account configuration
const serviceAccount = {
  type: "service_account",
  project_id: "al-noor-store-owners",
  private_key_id: "725bcc8400e0d90a77c58e098e791796a31e9308",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8xQZvqjZFqjZG\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\nXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZFXGhqHqZF\n-----END PRIVATE KEY-----\n",
  client_email: "sheets-access@al-noor-store-owners.iam.gserviceaccount.com",
  client_id: "113144325183216466290",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/sheets-access%40al-noor-store-owners.iam.gserviceaccount.com"
};

const SPREADSHEET_ID = '1gTAlaI-j4BsjNzJBgGc5arSDP30Gmd8FlEjfWdi5tDo';
const RANGE = 'Sheet1!A:E'; // Customer Name, Product Name, Price, Quantity, Phone Number

// Initialize Google Sheets API
const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

export const fetchOrdersFromSheet = async (): Promise<OrderData[]> => {
  try {
    const sheets = getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];
    
    // Skip header row if it exists
    const dataRows = rows.slice(1);
    
    const orders: OrderData[] = dataRows.map((row, index) => ({
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
    throw new Error('Failed to fetch orders from Google Sheets');
  }
};

export const addOrderToSheet = async (orderData: OrderData): Promise<void> => {
  try {
    const sheets = getGoogleSheetsClient();
    
    const values = [[
      orderData.customerName,
      orderData.productName,
      orderData.price,
      orderData.quantity,
      orderData.phone
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Order added to Google Sheets successfully');
  } catch (error) {
    console.error('Error adding order to Google Sheets:', error);
    throw new Error('Failed to add order to Google Sheets');
  }
};

export const updateOrderStatus = async (rowIndex: number, status: string): Promise<void> => {
  try {
    // For now, just log the update since status isn't in the current sheet structure
    console.log(`Order status would be updated at row ${rowIndex} to ${status}`);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
