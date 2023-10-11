import { test, expect } from "@playwright/test";
import all_data from "../src/mocked-data/mockedJson";

var data = all_data["data"];
var searchData = all_data["search_data"];

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

test("load two files, and make sure the correct file is viewed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ri_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();
});

test("load two files, verbose mode, and make sure the correct file is viewed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ri_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Command: load_file fakefolder/data/ny_earnings.csv")
  ).toBeVisible();
  await expect(page.getByText("Command: view")).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
});

test("load two files, and make sure search returns a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ri_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("search City/Town RI");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();
});

test("load two files, verbose mode, and make sure search returns a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ri_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("search City/Town RI");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Command: search City/Town RI")).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
});

test("load and view empty csv file", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();
});

test("load valid file path", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("File successfully loaded")).toBeVisible();
});

test("load invalid file path", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file nonexistentfile.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("File not found in directory")).toBeVisible();
});

test("load incorrect number of arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Wrong number of arguments for load command")
  ).toBeVisible();
});

test("view before load with incorrect arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("view fakefolder/data/ny_earnings.csv blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Cannot call view before load")).toBeVisible();
});

test("view after load with incorrect arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("view fakefolder/data/ny_earnings.csv blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Wrong number of arguments for view command")
  ).toBeVisible();
});

test("search before load with incorrect number of arguments", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Cannot call search before load")).toBeVisible();
});

test("search after load with incorrect arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("search fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Wrong number of arguments for search command")
  ).toBeVisible();
});

test("mode incorrect number of arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Wrong number of arguments for mode command")
  ).toBeVisible();
});
