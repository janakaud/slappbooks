import axios from "axios";

class HTTPService {

    constructor() {
        this.baseURL = "https://api.github.com";
        this.timeout = 1000;
        this.headers = {
            'token': 'abc'
        }
    }

    get(url = this.baseURL, params = {}) {
        return axios.get(url, params)
    }

}

const httpService = new HTTPService();
export default httpService;