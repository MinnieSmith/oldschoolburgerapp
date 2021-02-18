import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-react-app-ef1a4-default-rtdb.firebaseio.com/'
});

export default instance;