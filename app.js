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
      return console.log("contacts:::", contacts);

    case "getContactById":
      const contactById = await db.getContactById(id);
      return console.log("contactById:::", contactById);

    case "addContact":
      const newContact = await db.addContact({ name, email, phone });
      return console.log("newContact:::", newContact);

    case "editContact":
      const editedContact = await db.editContact({ id, name, email, phone });
      return console.log("editedContact:::", editedContact);

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

contactsProcessing({
  action: "editContact",
  id: "2mxsoFRHK5atAIMRGPP1N",
  name: "Andrii-2",
  email: "andrii@mail.com",
  phone: "555 555 5555",
});
