const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(
  __dirname,
  "/db/contacts.json"
);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const data = await contacts.find(
    (contact) => contact.id === contactId
  );
  return data || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) {
    return null;
  }
  const [data] = contacts.splice(index, 1);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return data;
}

async function addContact({
  name,
  email,
  phone,
}) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
