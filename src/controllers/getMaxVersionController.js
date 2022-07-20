import { EdiLog } from "../models/EdiLog.js";
import generateResponse from "../helpers/genResponse.js";


export async  function getMaxVersion (params,res){
	console.log('controller params');
	console.log(params);


    const { ediLog } = params;
    // const query = { EdiLog : ediLog };
    let response = null;
    try {
        const data = await  EdiLog.find(params).sort('-FileVersion')

		if( data.length > 0 ){
			response = generateResponse(true,"found successfully");
			// callback(response,ediLog);
		}
		else if( ediLog==undefined||data.length === 0){
			response = generateResponse(true,"No EdiLog found");
			// callback(response,null);
		}
    }
 catch(err){
	
			response = generateResponse(false,"there occured some error : "+err);
			res.status(500).send(response);
			// callback(response,null);
		}
        res.status(200).send(response);
    

}