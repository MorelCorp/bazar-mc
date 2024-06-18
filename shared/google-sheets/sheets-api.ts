import { google } from 'googleapis';

const sheets = google.sheets('v4');

export async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });
}

export async function getSheetData(spreadsheetId: string, range: string) {
  await authenticate();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
}

export async function appendRow(spreadsheetId: string, range: string, values: any[]) {
  await authenticate();

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: {
      values: [values],
    },
  });

  return response.data;
}
