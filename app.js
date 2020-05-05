const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	const API = require('call-of-duty-api')();
	API.login("username", "password").then(data => {
		//I want Warzone Data
		res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/plain');
	  res.end('Logged in!');

		API.MWstats('jchizzle4').then(data => {
		    console.log(data);  // see output
		}).catch(err => {
		    console.log(err);
		});
	}).catch(err => {
	    console.log(err);
	});


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});