const fetch = require('node-fetch');

class ApiService {
  constructor() {
    this.API_URL = process.env.API_URL;
    this.AUTH_HEADER = {
      'Authorization': process.env.API_AUTH,
      'Cookie': `JSESSIONID=${process.env.JSESSION_ID}`
    };
  }

  async fetchColaboradores() {
    const response = await fetch(this.API_URL, {
      method: 'GET',
      headers: this.AUTH_HEADER
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  }
}

module.exports = new ApiService();
