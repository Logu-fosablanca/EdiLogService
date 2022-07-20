import  request  from "supertest";
import app from "../../index.js"
import {Agency} from "../../models/Agency.js"

it("to test a single resource of Agency", async ()=>{

    const agencyData = new Agency({
        Agency: "X",
        Description: "X12",
        SegmentAgency: "X",
        ElementAgency: "X",
        CodeAgency: "X"
    })

    const data = await agencyData.save();

    const response = await request(app)
        .post('/api/agency/get')
        .send({agency:'X'})
        .expect(200)

    const testData = JSON.parse(response.text).data[0];
    
    expect(testData._id).toEqual(data._id.toString());
    expect(testData.Agency).toEqual(data.Agency);
    expect(testData.Description).toEqual(data.Description);
    expect(testData.SegmentAgency).toEqual(data.SegmentAgency);
    expect(testData.ElementAgency).toEqual(data.ElementAgency);
    expect(testData.CodeAgency).toEqual(data.CodeAgency);

})