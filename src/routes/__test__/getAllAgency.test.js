import  request  from "supertest";
import app from "../../index.js";
import {Agency} from "../../models/Agency.js";

it("to test a multiple resources of Agency", async ()=>{

    await new Agency({
        Agency: "X",
        Description: "X12",
        SegmentAgency: "X",
        ElementAgency: "X",
        CodeAgency: "X"
    }).save()

    await new Agency({
        Agency: "A",
        Description: "Tradacoms",
        SegmentAgency: "A",
        ElementAgency: "A",
        CodeAgency: "A"
    }).save()

    const response = await request(app)
        .post('/api/agency/getAll')
        .send()
        .expect(200)

    const testData = JSON.parse(response.text).data;
    
    expect(testData.length).toEqual(2);

})