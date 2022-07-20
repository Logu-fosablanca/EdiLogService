
import { getMaxVersion } from "./getMaxVersionController.js";


export async function getLatestVersion (req,res){

	var params=req.body;

	console.log(params);

	var query={
		"Agency" : params.agency,
		"Version" : params.version,
		"TransactionSet" : params.transactionSet,
		"BusinessPartner" : params.businessPartner
	}

	getMaxVersion(query,function(msg,data){
				var obj=JSON.parse(msg);
				if(data!=null&&data.length>0)
				{
					obj.data=data[0]['FileVersion'];
				}	
				else
				{
					obj.data=[];
				}
				res.send(JSON.stringify(obj));
			});	

}