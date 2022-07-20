import mongoose from "mongoose";


const EdiLogSchema = mongoose.Schema({
	"FileType" : { type : Number },	// 0 - ediSpec 1-ediFile
	"FileVersion" : { type : Number },	// future
	"Username" : { type : String },
	"Timestamp" : { type : Number },
	"BusinessPartner" : { type : String },
	"Agency" : { type : String },
	"Version" : { type : String },
	"TransactionSet" : { type : String },
	"SegmentPosition" : { type : String },
	"SegmentID" : { type : String },
	"ElementUsageDefs" : { type : String },
	"ElementUsageValue" : { type : String },
	"ElementUsageGroups" : { type : String },
	"Code" : { type : String },
	"Header" : { type : String },
	"Footer" : { type : String },
	"SegmentFooter" : { type : String },
	//Edi file specific values
	"SegmentDelimiter" : { type : String },
	"ElementDelimiter" : { type : String },
	"SubElementDelimiter" : { type : String },
},{
	collection : "EdiLog"
});

const EdiLog = mongoose.model('EdiLog', EdiLogSchema);

export {EdiLog};