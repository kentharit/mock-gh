import { test, expect } from "@playwright/test";
import all_data from "../src/mocked-data/mockedJson";

var data = all_data["data"];
var searchData = all_data["search_data"];

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * This test is written to see if there is an input bar when the page loads.
 */
test("on page load, i see an input bar", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

/**
 * This test is written to see if the text changes after we type into the input box.
 */
test("after I type into the input box, its text changes", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

/**
 * This is to see if the most recent file is viewed, when two files are loaded.
 */
test("load two files, and make sure the correct file is viewed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

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

/**
 * This test is to see if the verbose mode operates appropriately when we load two files.
 */
test("load two files, verbose mode, and make sure the correct file is viewed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

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

/**
 * This test is to see if the search function works well when we load two files.
 */
test("load two files, and make sure search returns a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

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

/**
 * Load and search two files.
 */
test("load two files and search them sequentially", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("search City/Town RI");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();

  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ri_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("search City/Town RI");

  await page.getByRole("button", { name: "Submit" }).click();
});

/**
 * This test is to see if verbose mode and search function works well even if we load two files.
 */
test("load two files, verbose mode, and make sure search returns a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

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

/**
 * This test is to see what happens when we load the empty csv file.
 */
test("load and view empty csv file", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();
});

/**
 * This test is to see what happens when we search on the empty csv file.
 */

test("load and search empty csv file", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("search City/Town RI");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();
});

/**
 * This test is to see what happens when we search on CSV file of one column.
 */

test("load and search one column", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file one_column.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").fill("search City/Town RI");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("table")).toBeVisible();
});

/**
 * This test is to see when we load the valid file path and if it functions properly.
 */

test("load valid file path", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("File successfully loaded")).toBeVisible();
});

/**
 * This test is to see what happens when we load the invalid file path.
 */
test("load invalid file path", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file nonexistentfile.csv");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("File not found in directory")).toBeVisible();
});

/**
 * This test is to see what happens when we load too many arguments.
 */

test("load incorrect number of arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file fakefolder/data/ny_earnings.csv blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Wrong number of arguments for load command")
  ).toBeVisible();
});

/**
 * This test is to see what happens if we ask to view, when we loaded incorrect file format.
 */

test("view before load with incorrect arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("view fakefolder/data/ny_earnings.csv blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Cannot call view before load")).toBeVisible();
});

/**
 * This test is to see what happens when we click view after loading with invalid arguments.
 */
test("view after load with incorrect arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

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

/**
 * This test to see what happens when we try to search after loading incorrect number of arguments.
 */
test("search before load with incorrect number of arguments", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Cannot call search before load")).toBeVisible();
});

/**
 * This test is to see what happens when we try to search after loading incorrect number of arguments.
 */
test("search after load with incorrect arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

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

/**
 * This test is to see what happens when we input incorrect number of arguments when we call mode.
 */
test("mode incorrect number of arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode blahblahblah");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Wrong number of arguments for mode command")
  ).toBeVisible();
});

/**
 * This test is to see what happens when we load two files, use verbose mode, search for the values that are not valid.
 */

test("load two files, verbose mode, and testing for value that is not present", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

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

  await page.getByLabel("Command input").fill("search City/Town ABCDEFG");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("Command does not exist in mocked search data")
  ).toBeVisible();
});
