const axios = require('axios');

class FakeStoreApi {
    constructor() {
        this.baseURL = 'https://fakestoreapi.com';
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getProducts() {
        try {
            const response = await this.client.get('/products');
            return {
                statusCode: response.status,
                data: response.data
            };
        } catch (error) {
            return {
                statusCode: error.response?.status || 500,
                error: error.message,
                data: error.response?.data
            };
        }
    }
}

module.exports = FakeStoreApi; 