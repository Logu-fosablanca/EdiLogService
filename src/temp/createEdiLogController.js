import { EdiLog } from "../models/EdiLog.js";
import generateResponse from "../helpers/genResponse.js";
import _ from 'underscore';

export async function create (req, res) {
	console.log(req);
    // const { edilog } = req.body;
	var ediLog = new EdiLog(req);

	var response = null;
	try {
	ediLog.save(function(err,ediLog){
		if( !(_.isNull(err)) ){
			response = generateResponse(false , "There occured some error : "+err.err);
			(response);
		}
		else{
			response = generateResponse(true,"Log created successfully");			
			(response);
		}
	})
}catch (err){
	response = generateResponse(false, `there occured some error : ${err}`, null);
	res.status(500).send(response);
}
res.status(200).send(response);
}
