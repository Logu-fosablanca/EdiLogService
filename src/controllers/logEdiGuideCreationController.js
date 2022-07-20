
import { create } from "./createEdiLogController.js";


export async function logEdiGuideCreation (req,res){
	var log=req.body;
	
	log['Username']=req.session.user;
	log['Timestamp']=Date.now();

	console.log(log);

	create(log,function(str){
		console.log(str);
		res.send(str);
	});
}
