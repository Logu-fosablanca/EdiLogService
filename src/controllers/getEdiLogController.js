import { EdiLog } from "../models/EdiLog.js";
import generateResponse from "../helpers/genResponse.js";

export async function get (req,res){
	
	console.log(req);
	const { ediLog } = req.body;
	const query = { EdiLog : ediLog };
    var response = null;
    try {
        const data= await EdiLog.find(req);

		if (data.length > 0) {
			response = generateResponse(true, "found successfully", data);
		}
		else if (data.length === 0) {
			response = generateResponse(true, "No Edilog found", null);
		}
	
}
catch(err){
    var response = generateResponse(false,"there occured some error : "+err);
			res.status(500).send(response);

}

	res.status(200).send(response);

}