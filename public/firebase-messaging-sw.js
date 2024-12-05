importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyChfv18929uqJQbYD_1LzTFibhjLzJTIfo",
  authDomain: "necessito-de-nota.firebaseapp.com",
  projectId: "necessito-de-nota",
  storageBucket: "necessito-de-nota.firebasestorage.app",
  messagingSenderId: "17043496970",
  appId: "1:17043496970:web:a97066eb961f2d5d2a3ff3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});