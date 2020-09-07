import Firebase from 'firebase';

const firebseConfig = {
    apiKey : 'AIzaSyAkBv1DB1d5yB_eNirzGbwZeunh6dMSKns',
    databaseURL : 'https://mychat-d8fe6.firebaseio.com/',
    projectId : 'mychat-d8fe6',
    appId : '1:955475197628:android:8950f34b99be8309e35ab9'
};

export default Firebase.initializeApp(firebseConfig);