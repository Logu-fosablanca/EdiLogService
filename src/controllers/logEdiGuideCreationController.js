// import { create } from "./createEdiLogController.js";
import { EdiLog } from "../models/EdiLog.js";
import generateResponse from "../helpers/genResponse.js";

export async function logEdiGuideCreation(req, res) {
  let log = req.body;

  log["Username"] = req.session.user;
  log["Timestamp"] = Date.now();

  console.log(log);

  let str = await create(log,res) 
	console.log(str);
    res.send(str);

}

async function create(req, res) {
  console.log(req);
  // const { edilog } = req.body;
  let ediLog = new EdiLog(req.body);

  let response = null;
  try {
	let data = await ediLog.save();
 
      if (data.length > 0) {
		response = generateResponse(true, "Log created successfully", data);
	  }
	  else if(data === null){
        response = generateResponse(false,"There occured some error : " + err.err,null);
        
      } 
    }
	catch(err){
		response = generateResponse(false, `there occured some error : ${err}`, null);
	}
	res.status(200).send(response);
  }
  
