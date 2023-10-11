const data: { [key: string]: any } = {};

data["fakefolder/data/ri_earnings.csv"] = [
  [
    "City/Town",
    "Median Household Income",
    "Median Family Income",
    "Per Capita Income",
  ],
  ["RI", "74,489.00", "95,198.00", "39,603.00"],
  ["RI", "28,371.00", "18,003.00", "98,321.00"],
  ["BR", "65,293.00", "87,392.00", "42,012.00"],
];

data["fakefolder/data/ny_earnings.csv"] = [
  ["Item 1A", "Item 1B", "Item 1C", "Item 1D"],
];

data["empty.csv"] = [];

const search_data: { [key: string]: any } = {};

search_data["fakefolder/data/ri_earnings.csv"] = {};
search_data["fakefolder/data/ri_earnings.csv"][
  JSON.stringify(["City/Town", "RI"])
] = [
  [
    "City/Town",
    "Median Household Income",
    "Median Family Income",
    "Per Capita Income",
  ],
  ["Rhode Island", "74,489.00", "95,198.00", "39,603.00"],
  ["Rhode Island", "28,371.00", "18,003.00", "98,321.00"],
];

const all_data: { [key: string]: { [key: string]: any } } = {};

all_data["data"] = data;
all_data["search_data"] = search_data;

export default all_data;
