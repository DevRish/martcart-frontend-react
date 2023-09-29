import axios from "axios";
import { SERVER_URL } from "../config/keys";

const axiosClient = axios.create({
    baseURL: `${SERVER_URL}/api`
});

export default axiosClient;