const axios = require('axios');

module.exports = async function (context, req) {
  const product = req.body;

  try {
    const baseUrl = process.env["Catalogo-sv"];

    const response = await axios.post(`${baseUrl}/api/products`, product);

    context.res = {
      status: 201,
      body: response.data
    };
  } catch (error) {
    context.res = {
      status: error.response?.status || 500,
      body: error.message
    };
  }
};

