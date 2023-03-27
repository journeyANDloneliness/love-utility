import { GoogleSpreadsheet } from 'google-spreadsheet'
//import {google} from 'googleapis';
//const sheets = google.sheets('v4');
//export let auth
import { config } from 'dotenv';
config();
export let doc
let credentials = {
	 client_email: (typeof process !== 'undefined'? process.env :
									 import.meta.env).client_email,
	  private_key: (typeof process !== 'undefined'? process.env :
									 import.meta.env).private_key,
}
export async function koneksiSheet(id){
	// Initialize the sheet - doc ID is the long id in the sheets URL
	
	doc = new GoogleSpreadsheet(id ?? '1tVw4qmPoqEP_SKkVqz5EukgeDCzoVMItw8TtgdY4ef8');
	
	// Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
	await doc.useServiceAccountAuth({
	  // env var values are copied from service account credentials generated by google
	  // see "Authentication" section in docs for more info
	 ...credentials
	});
	
	await doc.loadInfo(); // loads document properties and worksheets
	console.log("berhasil menhubungkan ke document sheet bernama :"+doc.title);

	
	
	return doc
	
}
export async function koneksiSheetGoogleApis(){
	auth = new google.auth.GoogleAuth({
		credentials,
	  scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
}
export async function sheetGetRange(range) {
	let rows
	try {
    
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: '1tVw4qmPoqEP_SKkVqz5EukgeDCzoVMItw8TtgdY4ef8',
      range,
    });
    rows = response.data.values;
    console.log(`Retrieved ${rows.length} rows`);
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
	return rows
	
}


