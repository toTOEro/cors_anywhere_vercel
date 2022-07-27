export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  const https = require('https');
  let query = Object.entries(request.query);
  query.shift();
  let url = request.query.url;
  query.forEach(entry => {
    url += '&' + entry[0] + '=' + entry[1];
  });
  
  
  const {status,data} = await getRequest(url);
  console.log(response)
  response.status(status).send(data);

  function getRequest(url) {
    
    return new Promise(resolve => {
      const req = https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          resolve({
            status: resp.statusCode,
            data: data
          });
        });
      });
    });
  }
}
