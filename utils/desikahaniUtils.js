import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";


export function capitalizeFirstLetter(string) {
    if (!string) return string; // Handle empty string
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export async function fetchDocument(object) {

    try {

        const q = query(collection(db, "Desikahani"), where("Title", "==", object.title));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return doc.data();
        } else {
            fetch(`${process.env.BACKEND_URL}fetchSingleStoryFromFreesexkahani`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: object.href }), // Convert data to JSON string
            });

            return null
        }
    } catch (err) {
        console.error("Error fetching document:", err);
    }
}; 