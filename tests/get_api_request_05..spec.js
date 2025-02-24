const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");

test("Create GET api request in playwright", async ({ request }) => {
    //Create test data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);

    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkOutDate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");

    //Create post API request
    const postAPIResponse = await request.post("/booking", {
        data: {
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate,
            },
            "additionalneeds": "super bowls"
        }
       
    });

    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const bookingId = postAPIResponseBody.bookingid;

    //Create a get API Request
    const getAPIResponse = await request.get(`/booking/${bookingId}`);
    const getAPIResponseBody = await getAPIResponse.json();
    console.log("*******GET API response *******");
    console.log(getAPIResponseBody);

    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);

    expect(getAPIResponseBody).toHaveProperty("firstname", firstName);
    expect(getAPIResponseBody).toHaveProperty("lastname", lastName);

});