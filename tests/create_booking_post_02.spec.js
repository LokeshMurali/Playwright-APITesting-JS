//Load the playwright module
const { test, expect } = require("@playwright/test");
//Load the post request body json data
const bookingAPIRequestBody = require("../test-data/post_request_body.json");

//Write the tests
test("Create POST api request using static JSON File", async ({ request }) => {
    //Create a post api request
    const postAPIResponse = await request.post("/booking", {
        data: bookingAPIRequestBody,
    });

    //Validate status code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    //Validate JSON api response
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Vineeth");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Purushoth");

    //Validate nested JSON api response
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

});