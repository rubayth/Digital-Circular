import axios from 'axios';
import { keys } from './keys';

const geocodeAPI = async (zipcode) => {
    const res = await axios.get('https://www.mapquestapi.com/geocoding/v1/address', {
        params: {
            key: keys.mapquestKey,
            location: zipcode,
        }
    });
    return res.data;
}



export default geocodeAPI;