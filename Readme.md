# Make console line implementation (cli)

User should write command and this command must fulfillment
Example:

- `node app --action readAllContacts` should return all entries of db
- `node app --action getContactById --id rsKkOQUi80UsgVPCcLZZW` should return one entry whose id equal `rsKkOQUi80UsgVPCcLZZW`

#### Develop fns of:

- read all entries in db (contacts.json file),
- read one entry in db by id,
- add to db new entry of the following type:

```
  {
  "id": "rsKkOQUi80UsgVPCcLZZW",
  "name": "Alec Howard",
  "email": "Donec.elementum@scelerisquescelerisquedui.net",
  "phone": "(748) 206-2688"
  }
```

- edit entry in db (select entry by id),
- delete entry in db (select entry by id)

=====================

All what user write in command line the Node.js save in global variable `process.arg`.

The `process.arg` it is array, which first two elements it is path to Node.js on PC and path to file.

All elements the array from third and next it is users commands after "`node app`".

For search command and value you can use `indexOf`:

```
const actionIdx = process.argv.indexOf("--action");
if (actionIdx !== 1) {
  const action = process.argv(actionIdx + 1);
  contactsProcessing({ action });
}
```

But it's not convenient to search this way. Therefore you can use [commander](https://www.npmjs.com/package/commander) or [yargs](https://www.npmjs.com/package/yargs) packages.

## yargs

    const arr = hideBin(process.argv); // delete from array first two elements
    const { argv } = yargs(arr); // return obj following type: {command: value}

Command in cli: `node app --action readAllContacts` will return: {action: "readAllContacts"}

    contactsProcessing(argv); // will execute user's command

Numbers as string in yargs will by as Number. So you must convert numbers to string (for example if ids will be as numbers).

      ...
      case "getContactById":
      const stringedId = String(id);
      ...

## commander

    program
      .option("--action, -a, <type>")
      .option("--id, -i, <type>")
      .option("--name, -n, <type>")
      .option("--email, -e, <type>")
      .option("--phone, -p, <type>");
    program.parse();

    const options = program.opts(); // reading process.argv

Command in cli: `node app --action readAllContacts`

    console.log("options:::", options); // {action: "readAllContacts"}
    contactsProcessing(options); // will execute user's command
