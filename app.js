// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import { getAll } from "./db/index.js";
console.log("getAll:::", getAll);

const contactsProcessing = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const contacts = await getAll();
      return console.log("contactsProcessing >> contacts:::", contacts);

    // case "getById":
    // case "deleteById":
    default:
      return console.log("Unknown action");
  }
};

contactsProcessing({ action: "read" });
// contactsProcessing({ action: "getById", id: "qdggE76Jtbfd9eWJHrssH" });
// contactsProcessing({ action: "deleteById" });
