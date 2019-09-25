import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAaZ4Ry8X7SHwcPMI5Iyu6_tryfemVG1pg",
    authDomain: "authp-31967.firebaseapp.com",
    databaseURL: "https://authp-31967.firebaseio.com",
    projectId: "authp-31967",
    storageBucket: "authp-31967.appspot.com",
    messagingSenderId: "951624928213",
    appId: "1:951624928213:web:2f6614993989293b"
};
let app = Firebase.initializeApp(config);
export const db = app.database();