// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import * as db from "./db/index.js";

const contactsProcessing = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "readContact":
      const contacts = await db.getAllContacts();
      return console.log("all contacts:::", contacts);

    case "getContactById":
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

// contactsProcessing({ action: "readContact" });

// contactsProcessing({ action: "getContactById", id: "qdggE76Jtbfd9eWJHrssH" });

// contactsProcessing({
//   action: "addContact",
//   name: "Andrii",
//   email: "andrii@mail.com",
//   phone: "555 555 5555",
// });

// contactsProcessing({
//   action: "editContact",
//   id: "2mxsoFRHK5atAIMRGPP1N",
//   name: "Andrii-3",
//   email: "andrii@mail.com",
//   phone: "555 555 5555",
// });

contactsProcessing({ action: "deleteContact", id: "j-Uk9EQJ9TeIFLu-paHOQ" });
