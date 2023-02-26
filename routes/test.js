"use strict";

// UUID
var uuid = require('uuid');

// Dates
var dateutil = require('dateutil');

//Password functions
var password = require('password-hash-and-salt');

//-------------------------------------------------------------------------------------------
//
// CRUD for Players
//

//---------------------------------------------------------------------------------------
// Read a specific customer
//
exports.readCustomer = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;

		if(req.params.id) {
			// Setup the query		
			var query = 'SELECT PlayerFirstName, PlayerLastName, Email FROM Players WHERE PlayerFirstName = $1';
			client.query(query, [req.params.id], function (err, result) {
				// handle an error from the query
				if(handleError(err)) return;
				done();
				res.status(200).json({result: 'success', data:{ customer : result.rows }});
			});
						      	
    	} else {
	    	done();
	    	res.status(400).json({ result:'error', data:{ error:'id is required' } });
    	}

	});
};
