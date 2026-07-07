import axios from 'axios';

const instance = axios.create({
  // Put YOUR actual live cloud function URL here:
  baseURL: 'https://amazon-clone-094f.onrender.com' 
});

export default instance;