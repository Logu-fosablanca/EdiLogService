import { Router } from "express";

import { logEdiGuideCreation } from "../controllers/logEdiGuideCreationController.js";
import { getLatestVersion } from "../controllers/getLatestVersionController.js";
import { getEdiGuideLog } from "../controllers/getEdiGuideLogController.js";
const app = Router();

app.post('/ediLog/create',logEdiGuideCreation );
app.post('/ediLog/get', getEdiGuideLog);
app.post('/ediLog/latestFileVersion',getLatestVersion);



export default app;
