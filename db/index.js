// ! Functions for work with db (contacts.json)

// У Node.js починаючи з v18.0.0 для імпорту JSON через import потрібно вказувати атрибут assert з типом json.
import contacts from "./contacts.json" assert { type: "json" };
// const contacts = require("./contacts");

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAll = async () => {
  const contactsBookBuffer = await fs.readFile(
    path.join(__dirname, "contacts.json"),
  );
  return JSON.parse(contactsBookBuffer);
};

export { getAll };
