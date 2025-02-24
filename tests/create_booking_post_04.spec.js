const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");
const dynamicPostRequest = require("../test-data/dynamic_post_request_body.json");
import { stringFormat } from "../utils/common";

test("Create POST api request using dynamic JSON file in playwright", async ({ request }) => {
    //Create test data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

    const dynamicRequestBody = stringFormat(JSON.stringify(dynamicPostRequest), firstName, lastName, "Apple");
    const dynamicJsonRequestBody = JSON.parse(dynamicRequestBody);
    const postAPIResponse = await request.post("/booking", {
        data: dynamicJsonRequestBody,
    });

    //Validating the status code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName);
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);
    expect(postAPIResponseBody.booking).toHaveProperty("additionalneeds", "Apple");



});