// ! Functions for work with db (aka contacts.json)

import { nanoid } from "nanoid";
// У Node.js починаючи з v18.0.0 для імпорту JSON через import потрібно вказувати атрибут assert з типом json.
import contacts from "./contacts.json" assert { type: "json" };
// const contacts = require("./contacts");

import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from "url";
// % v1.: Starting with Node.js 20.11/21.2, you can use import.meta.dirname (https://nodejs.org/api/esm.html#importmetadirname):
// const __dirname = import.meta.dirname;

// % v2.: For Node.js 10.12 and higher there's an alternative that doesn't require creating multiple files and handles special characters in filenames across platforms:
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
// const __dirname = dirname(fileURLToPath(import.meta.url));

// The built-in modules 'path' and 'url' can be optionally prefixed with the node scheme as 'node:path' and 'node:url' since Node.js 14.14.

// % v3.:
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
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === data.id);

  if (index === -1) {
    console.log("This id is not in the db");
    return null;
  }

  contacts[index] = data;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

// ~ No mutation, but two iteration of array
export const deleteContact_v1 = async id => {
  const contacts = await getAllContacts();
  const deletedContact = contacts.find(contact => contact.id === id);
  const updatedContacts = contacts.filter(contact => contact.id !== id);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return deletedContact || null;
};

// ~ One iteration, but mutation of array
export const deleteContact_v2 = async id => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex(item => item.id === id);

  if (idx === -1) return null;

  const [deletedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact || null;
};

// ~ Opt.3: One iteration (combining findIndex() and filter() in one - reduce())
const separateContact = (contacts, id) => {
  return contacts.reduce(
    (acc, contact) => {
      if (contact.id === id) {
        acc.deletedContact = contact;
      } else {
        acc.updatedContacts.push(contact);
      }
      return acc;
    },
    { updatedContacts: [], deletedContact: null },
  );
};

export const deleteContact_v3 = async id => {
  const contacts = await getAllContacts();
  const { updatedContacts, deletedContact } = separateContact(contacts, id);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return deletedContact || null;
};

// fs.readFile(filename, [options]) – читання файлу
// fs.writeFile(filename, data, [options]) – запис файлу
// fs.appendFile(filename, data, [options]) – додавання у файл
// fs.rename(oldPath, newPath) – перейменування файлу.
// fs.unlink(path, callback) – видалення файлу.
