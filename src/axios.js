import axios from 'axios';

const instance = axios.create({
  // Put YOUR actual live cloud function URL here:
  baseURL: 'https://us-central1-clone-dac75.cloudfunctions.net/api' 
});

export default instance;