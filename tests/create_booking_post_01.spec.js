//Load the playwright module
const { test, expect } = require("@playwright/test");
const { ok } = require("assert");

//Write a test
test("Create booking POST api request using static request body", async ({ request }) => {
    //Create a POST api request
    const postAPIResponse = await request.post("/booking", {
        data: {
            "firstname": "Lokesh",
            "lastname": "Murali",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        },
    });

    //Validate the status code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    //console.log(postAPIResponse);
    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    //Validate JSON api response
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Lokesh");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Murali");

    //Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");



});