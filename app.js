// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";

// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import { program } from "commander";
import * as db from "./db/index.js";

const contactsProcessing = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "readAllContacts":
      // If await set before fn who return promise, then fn return result of promise fulfillment
      const contacts = await db.getAllContacts();
      return console.log("all contacts:::", contacts);

    case "getContactById":
      // const stringedId = String(id); // for yargs package
      const contactById = await db.getContactById(id);
      return console.log("contact by id:::", contactById);

    case "addContact":
      const newContact = await db.addContact({ name, email, phone });
      return console.log("new contact:::", newContact);

    case "editContact":
      const editedContact = await db.editContact({ id, name, email, phone });
      return console.log("edited contact:::", editedContact);

    case "deleteContact":
      const deletedContact = await db.deleteContact_v3(id);
      return console.log("deleted contact:::", deletedContact);

    default:
      return console.log("Unknown action");
  }
};

// * settings for yargs:
// const arr = hideBin(process.argv); // deleting from array first two elements
// const { argv } = yargs(arr); // return obj following type: {command: value}
// // node app --action readAllContacts
// console.log("argv:::", argv); // {action: "readAllContacts"}
// contactsProcessing(argv);  // will execute user's command

// * settings of commander:
program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");
program.parse();

const options = program.opts(); // reading process.argv
// node app --action readAllContacts
console.log("options:::", options); // {action: "readAllContacts"}
contactsProcessing(options); // will execute user's command

// 1)
// contactsProcessing({ action: "readAllContacts" });

// 2)
// contactsProcessing({ action: "getContactById", id: "qdggE76Jtbfd9eWJHrssH" });

// 3)
// contactsProcessing({
//   action: "addContact",
//   name: "Andrii",
//   email: "andrii@mail.com",
//   phone: "555 555 5555",
// });

// 4)
// contactsProcessing({
//   action: "editContact",
//   id: "2mxsoFRHK5atAIMRGPP1N",
//   name: "Andrii-3",
//   email: "andrii@mail.com",
//   phone: "555 555 5555",
// });

// 5)
// contactsProcessing({ action: "deleteContact", id: "j-Uk9EQJ9TeIFLu-paHOQ" });
