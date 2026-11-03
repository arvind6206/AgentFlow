import axios from "axios";

const api = axios.create({
    baseUrl: import .meta.env.SERVER_URL || "http://localhost:3000",
    withCredentials: true
})

export default api