const http = require('http');
const schedule = require('node-schedule');

require('dotenv').config()

const users = ['dubya07', 'jchizzle4']

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end('Welcome to Call of Duty Stats service!');
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});

var rule = new schedule.RecurrenceRule();
rule.hour = 5;

// Yup this will be refactored. Making it work now so can be deployed and begin collecting data
const aggregate_job0 = schedule.scheduleJob(rule, function(){
	console.log('Running job to ingest aggregated data...')

	const API = require('call-of-duty-api')();
	API.login(process.env.COD_LOGIN, process.env.COD_PASSWORD).then(data => {
		const user = 'dubya07';
		API.MWstats(user).then(data => {
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
			    const queryText = 'INSERT INTO raw_stats(data,download_time,description,username) VALUES($1,$2,$3,$4) RETURNING id'
			    const res = await client.query(queryText, [jsonStringData, new Date(), 'MWstats', user])
			    await client.query('COMMIT')
			  } catch (e) {
			    await client.query('ROLLBACK')
			    throw e
			  } finally {
			    client.release()
			  }
			})().catch(e => console.error(e.stack))				
		}).catch(err => {
		  console.log(err);
		});
	}).catch(err => {
	    console.log(err);
	});  
});

const aggregate_job1 = schedule.scheduleJob(rule, function(){
	console.log('Running job to ingest aggregated data...')

	const API = require('call-of-duty-api')();
	API.login(process.env.COD_LOGIN, process.env.COD_PASSWORD).then(data => {
		const user = 'jchizzle4';
		API.MWstats(user).then(data => {
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
			    const queryText = 'INSERT INTO raw_stats(data,download_time,description,username) VALUES($1,$2,$3,$4) RETURNING id'
			    const res = await client.query(queryText, [jsonStringData, new Date(), 'MWstats', user])
			    await client.query('COMMIT')
			  } catch (e) {
			    await client.query('ROLLBACK')
			    throw e
			  } finally {
			    client.release()
			  }
			})().catch(e => console.error(e.stack))				
		}).catch(err => {
		  console.log(err);
		});
	}).catch(err => {
	    console.log(err);
	});  
});

const recent_matches_job0 = schedule.scheduleJob(rule, function(){
	console.log('Running job to ingest recent matches...')

	const API = require('call-of-duty-api')();
	API.login(process.env.COD_LOGIN, process.env.COD_PASSWORD).then(data => {
		const user = 'dubya07';
		API.MWcombatwz(user).then(data => {
			const jsonStringData = JSON.stringify(data);

			const { Pool } = require('pg')
			const pool = new Pool()
			;(async () => {
			  // note: we don't try/catch this because if connecting throws an exception
			  // we don't need to dispose of the client (it will be undefined)
			  const client = await pool.connect()
			  try {
			  	console.log("beginning transaction")
			    await client.query('BEGIN')
			    const queryText = 'INSERT INTO raw_stats(data,download_time,description,username) VALUES($1,$2,$3,$4) RETURNING id'
			    const res = await client.query(queryText, [jsonStringData, new Date(), 'MWcombatwz', user])
			    await client.query('COMMIT')
			  } catch (e) {
			    await client.query('ROLLBACK')
			    throw e
			  } finally {
			    client.release()
			  }
			})().catch(e => console.error(e.stack))				
		}).catch(err => {
		  console.log(err);
		});
	}).catch(err => {
	    console.log(err);
	});
});

const recent_matches_job1 = schedule.scheduleJob(rule, function(){
	console.log('Running job to ingest recent matches...')

	const API = require('call-of-duty-api')();
	API.login(process.env.COD_LOGIN, process.env.COD_PASSWORD).then(data => {
		const user = 'jchizzle4';
		API.MWcombatwz(user).then(data => {
			const jsonStringData = JSON.stringify(data);

			const { Pool } = require('pg')
			const pool = new Pool()
			;(async () => {
			  // note: we don't try/catch this because if connecting throws an exception
			  // we don't need to dispose of the client (it will be undefined)
			  const client = await pool.connect()
			  try {
			  	console.log("beginning transaction")
			    await client.query('BEGIN')
			    const queryText = 'INSERT INTO raw_stats(data,download_time,description,username) VALUES($1,$2,$3,$4) RETURNING id'
			    const res = await client.query(queryText, [jsonStringData, new Date(), 'MWcombatwz', user])
			    await client.query('COMMIT')
			  } catch (e) {
			    await client.query('ROLLBACK')
			    throw e
			  } finally {
			    client.release()
			  }
			})().catch(e => console.error(e.stack))				
		}).catch(err => {
		  console.log(err);
		});
	}).catch(err => {
	    console.log(err);
	});
});
