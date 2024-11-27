// ! Functions for work with db (aka contacts.json)

import { nanoid } from "nanoid";
// У Node.js починаючи з v18.0.0 для імпорту JSON через import потрібно вказувати атрибут assert з типом json.
import contacts from "./contacts.json" assert { type: "json" };
// const contacts = require("./contacts");

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // path to file in ESM
const __dirname = path.dirname(__filename); // path to dir in ESM
const contactsPath = path.join(__dirname, "contacts.json"); // Normalize slashes

export const getAllContacts = async () => {
  const contactsBookBuffer = await fs.readFile(contactsPath);
  return JSON.parse(contactsBookBuffer); // make obj from json
};

export const getContactById = async id => {
  const contacts = await getAllContacts();
  const contact = contacts.find(contact => contact.id === id); // find contact by id
  return contact || null; // real database behavior
};

export const addContact = async data => {
  const contacts = await getAllContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact); // add to contacts array

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // 2 - number off spaces. Making .json-file with normal formatting (otherwise all will bi in one line)

  return newContact;
};

export const editContact = async data => {
  console.log("editContact >> data:::", data);
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === data.id);
  console.log("editContact >> index:::", index);
  if (index === -1) {
    console.log("This id not in our db");
    return null;
  }
  contacts[index] = data;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

// fs.readFile(filename, [options]) – читання файлу
// fs.writeFile(filename, data, [options]) – запис файлу
// fs.appendFile(filename, data, [options]) – додавання у файл
// fs.rename(oldPath, newPath) – перейменування файлу.
// fs.unlink(path, callback) – видалення файлу.
