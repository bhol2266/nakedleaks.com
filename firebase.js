// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqjCkKYZSOnpXpWxtgp1yxEIv8WxkaZTo",
  authDomain: "desikahaninextjs-ffab3.firebaseapp.com",
  projectId: "desikahaninextjs-ffab3",
  storageBucket: "desikahaninextjs-ffab3.appspot.com",
  messagingSenderId: "21881549608",
  appId: "1:21881549608:web:b0bfec2a195101cd2b161d",
  measurementId: "G-3YK1YFJBV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let messaging;
if (typeof window !== 'undefined') {
  // Code that depends on `window` or `navigator`
  import('firebase/messaging').then(({ getMessaging }) => {
    messaging = getMessaging(app);
  });
}



async function generateFCMToken() {
  const permission = await Notification.requestPermission()


  if (permission === "granted") {
    const token = await getToken(messaging, { vapidKey: 'BEiYd6zjEbT9O_yiU6hYTNRdbufiNQTn_To8jv7StZjPAIJaG7RsTG_afRmr5ebY4nkIUZVI_fI_b_K8_dWye2M' });
    return token
  }

  return null

}


async function subscribeToTopic() {
  const token = await generateFCMToken()
  if (token == null) {
    return
  }

  try {
    console.log(token);

    const response = await fetch("/api/subscribeToTopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, topic: "all" }),
    });
    const data = await response.json();
    if (data.success) {
      console.log(`Successfully subscribed to topic: all`);
    } else {
      console.log(`Failed to subscribe to topic: ${data.message}`);
    }
  } catch (error) {
    console.error("Error subscribing to topic:", error);
  }
}



export { generateFCMToken, subscribeToTopic, db };