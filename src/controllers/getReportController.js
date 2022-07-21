import { EdiLog } from "../models/EdiLog.js";
import generateResponse from "../helpers/genResponse.js";


export async function getReport (req,res){
	var x;
	var params=req.body;
	var attribute=params.attribute;
	var filterFrom=new Date(params.from);
	var filterTo=new Date(params.to);
	var result={};
	var chartify=[];

	filterFrom=filterFrom.getTime()-(24 * 60 * 60 * 1000);
	filterTo=filterTo.getTime()+(24 * 60 * 60 * 1000);

	var query={
			"FileType" :  params.fileType ,
			"Timestamp" : { $gt : filterFrom, $lt : filterTo }
		};

	get(query,function(msg,data){
		var obj=JSON.parse(msg);

		console.log(data);
		
		if(obj.status==true)
		{
			if(data==undefined)
			{
				data=[];
			}
			obj.numberOfLogs=data.length;
			for(x in data)
			{
				if(result[data[x][attribute]]!=undefined)
				{
					result[data[x][attribute]]++;
				}
				else
				{
					result[data[x][attribute]]=1;	
				}
			}
			for(x in result)
			{
				chartify.push([x,result[x]])
			}

			obj.data=chartify;
			console.log(chartify);
		}

		res.send(JSON.stringify(obj));		
	});
}



async function get (req,res){
	
	console.log(req);
	const { ediLog } = req.body;
	const query = { EdiLog : ediLog };
    var response = null;
    try {
        const data= await EdiLog.find(req.body);

		if (data.length > 0) {
			response = generateResponse(true, "found successfully", data);
		}
		else if (data.length === 0) {
			response = generateResponse(true, "No Edilog found", null);
		}
	
}
catch(err){
    var response = generateResponse(false,"there occured some error : "+err,null);
			res.status(500).send(response);

}

	res.status(200).send(response);

}