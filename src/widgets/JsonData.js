import { ref, get, getDatabase } from 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/database';

const db = getDatabase();

//Frank's Middle
export async function getAllData() {
  try {
    const dbRef = ref(db);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const jsonString = JSON.stringify(data);
      console.log(jsonString)
      return jsonString;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}