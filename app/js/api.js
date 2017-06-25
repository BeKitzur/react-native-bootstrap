import appFirebase from './firebase';

/* Set headers here and use with api calls*/
const headers = {};

export default {
    login: (email, password) => appFirebase.auth().signInWithEmailAndPassword(email, password),
    logout: () => appFirebase.auth().signOut(),

    getComments: (page) => {
        return fetch({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/comments?&_page=' + page,
            headers
        });
    }
};