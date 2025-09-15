import { ApiClient } from "@/src/api/axios/clients/axios-client";


const baseURL = 'http://192.168.50.39:3333';

const apiClient = new ApiClient(baseURL);

export { apiClient };
