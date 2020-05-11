const http = require('http');
const schedule = require('node-schedule');
const hostname = '127.0.0.1';
const port = 3000;

require('dotenv').config()

const server = http.createServer((req, res) => {
	const API = require('call-of-duty-api')();
	API.login("", "").then(data => {
		res.statusCode = 200;
	  res.setHeader('Content-Type', 'application/json');

		API.MWstats('jchizzle4').then(data => {
			const jsonStringData = JSON.stringify(data);

			// Transaction
			const { Pool } = require('pg')
			const pool = new Pool()
			;(async () => {
			  // note: we don't try/catch this because if connecting throws an exception
			  // we don't need to dispose of the client (it will be undefined)
			  const client = await pool.connect()
			  try {
			    await client.query('BEGIN')
			    const queryText = 'INSERT INTO raw_stats(data,download_time) VALUES($1,$2) RETURNING id'
			    const res = await client.query(queryText, [jsonStringData, new Date()])
			    await client.query('COMMIT')
			  } catch (e) {
			    await client.query('ROLLBACK')
			    throw e
			  } finally {
			    client.release()
			  }
			})().catch(e => console.error(e.stack))				

			res.end(jsonStringData);
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

// var const = schedule.scheduleJob({hour: 5, minute: 30}, function(){
const job = schedule.scheduleJob('* * * * *', function(){
  console.log('Time for tea!');
});