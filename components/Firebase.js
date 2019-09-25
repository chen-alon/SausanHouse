import * as firebase from "firebase";
import "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyDV3l3crw2wwLNbOdRMklQ13AY4GBEmgR8",
  authDomain: "susan-s-house.firebaseapp.com",
  databaseURL: "https://susan-s-house.firebaseio.com",
  projectId: "susan-s-house",
  storageBucket: "susan-s-house.appspot.com",
  messagingSenderId: "543787022159",
  appId: "1:543787022159:web:292847dced274142"
};

firebase.initializeApp(config);

const secondFirebaseInstance = firebase.initializeApp(
  config,
  "second_instance"
);

//firebase.firestore().settings(settings);

export default firebase;
export { secondFirebaseInstance };
