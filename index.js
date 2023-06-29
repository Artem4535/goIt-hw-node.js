const func = require("./contacts");
const { Command } = require("commander");

async function invokeAction({
  action,
  id,
  name,
  email,
  phone,
}) {
  switch (action) {
    case "list":
      const allContacts =
        await func.listContacts();
      return console.log(allContacts);

    case "get":
      const foundContact =
        await func.getContactById(id);
      return console.log(foundContact);

    case "add":
      const addConctact = await func.addContact({
        name,
        email,
        phone,
      });
      return console.log(addConctact);

    case "remove":
      const deletedContact =
        await func.removeContact(id);
      return console.log(deletedContact);

    default:
      return console.log("Unknown action");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
