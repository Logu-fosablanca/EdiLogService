

import { get } from "./getEdiLogController.js";

export async function getEdiGuideLog (req,res){

	var params=req.body;

	//Stripping spaces
	params.version=params.version.replace(' ',"[\\s]*");
	// params.user=req.session.user.replace(' ','');
	// params.businessPartner=params.businessPartner.replace(' ','');
	// params.transactionSet=params.transactionSet.replace(' ','');

	console.log('filters');
	var filterFrom=new Date(params.from);
	console.log(filterFrom);
	filterFrom=filterFrom.getTime()+(24 * 60 * 60 * 1000);
	var filterTo=new Date(params.to);
	console.log(filterTo);
	filterTo=filterTo.getTime()+(24 * 60 * 60 * 1000);

	if(req.session.user)
	{
		if(req.session)
		{
			// if(req.session.privilege==1)
			// {
			// 	var query={
			// 		"Username" : params.user,
			// 		"BusinessPartner" : new RegExp(params.businessPartner, "i"),
			// 		"TransactionSet" : new RegExp(params.transactionSet,"i"),
			// 		"Version" : new RegExp(params.version,"i"),
			// 		"Timestamp" : { $gt : filterFrom, $lt : filterTo }		
			// 	};
			// }
			// else if(req.session.privilege==0){
				var query={
					"Username" : new RegExp(params.createdBy, "i"),
					"FileType" : params.fileType,
					"BusinessPartner" : new RegExp(params.businessPartner, "i"),
					"TransactionSet" : new RegExp(params.transactionSet,"i"),
					"Version" : new RegExp(params.version,"i"),
					"Timestamp" : { $gt : filterFrom, $lt : filterTo }		
				};	
			// }

			console.log(query);

			get(query,function(msg,data){
				var obj=JSON.parse(msg);
				obj.data=data;
				res.send(JSON.stringify(obj));
			});
		}
		else
		{
			res.send({status:false,message:'Unauthorised'});
		}
	}
	else{
		res.send({status:false,message:'Unauthorised'});
	}
}