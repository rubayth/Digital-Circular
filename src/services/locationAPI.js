import axios from 'axios';

const locationAPI = async () => {
    const ipJSON = await axios.get("https://api.ipify.org?format=json");

    const ip = ipJSON.data.ip;
    const url="https://api.ipstack.com/";
    const apiKey="4c614e8469a4438dffea8080a20066df"

    const res = await axios.get(
        url + ip + `?access_key=${apiKey}`
    );
    return res.data;
}



export default locationAPI;