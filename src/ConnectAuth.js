import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyD7ubwdBfEEzvfZsOvYi4OuiacqNsHhgGY',
	authDomain: 'what-state-rv.firebaseapp.com',
	projectId: 'what-state-rv',
	storageBucket: 'what-state-rv.appspot.com',
	messagingSenderId: '1059350343432',
	appId: '1:1059350343432:web:18066776d9807cea5e46bd',
}

export const app = initializeApp(firebaseConfig)
