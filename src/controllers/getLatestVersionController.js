// import { getMaxVersion } from "./getMaxVersionController.js";
import { EdiLog } from "../models/EdiLog.js";
import generateResponse from "../helpers/genResponse.js";

export async function getLatestVersion(req, res) {
  var params = req.body;

  console.log(params);

  var query = {
    Agency: params.agency,
    Version: params.version,
    TransactionSet: params.transactionSet,
    BusinessPartner: params.businessPartner,
  };

  let msg = await getMaxVersion(query, res);

  let obj = JSON.parse(msg);
  let data = obj.data;

  if (data != null && data.length > 0) {
    obj.data = data[0]["FileVersion"];
  } else {
    obj.data = [];
  }
  res.send(JSON.stringify(obj));
}

async function getMaxVersion(req, res) {
  console.log("controller params");
  console.log(req);

  const { ediLog } = req;
  let response = null;
  try {
    const data = await EdiLog.find(req).sort("-FileVersion");

    if (data.length > 0) {
      response = generateResponse(true, "found successfully", data);
  
    } else if (ediLog == undefined || data.length === 0) {
      response = generateResponse(false, "No EdiLog found", null);

    }
  } catch (err) {
    response = generateResponse(false,"there occured some error : " + err,null);
    res.status(500).send(response);
   
  }
  res.status(200).send(response);
}
