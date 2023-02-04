const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://ihrow:${password}@cluster0.j85wwvs.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  mongoose.connect(url).then(() => {
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
    });
    mongoose.connection.close();
  });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected to MongoDB");

      const person = new Person({
        name: name,
        number: number,
      });

      return person.save();
    })
    .then(() => {
      console.log("person saved!");
      return mongoose.connection.close();
    })
    .catch((error) => {
      console.log(error);
    });
}
