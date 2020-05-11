const inventor = {
    first: "Nikola",
    last: "Tesla",
    year: 1856
}
const updateData = { $set: { "year": 2020 } }
const filter = {first: "Nikola"}

const mongoClient = require('mongodb').MongoClient;
const uriDatabase = "mongodb+srv://pablo:ClusterPass2020@cluster-000-mjcet.azure.mongodb.net/test?retryWrites=true&w=majority";

const chalk = require('chalk');

const client = new mongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((error, result) => {
    if (!error) {
        console.log(chalk.green("Conexión exitosa"));
        const collectionInventors = result.db('sample_betp2').collection('inventors');

        (async function(){
          await insertInventor(collectionInventors, inventor).then(message => console.log(message))
          await updInventor(collectionInventors, filter, updateData).then(message => console.log(message))
          await deleteInventor(collectionInventors, filter).then(message => console.log(message))
          client.close()
        })()

    } else {
        console.log(chalk.red(error));
    }
});

function insertInventor(invConnect, inventor) {
  return new Promise((resolve, reject) => {
    invConnect.insertOne(inventor, (error, result) => {
      if (!error) {
        resolve(chalk.green("Iventor insertado correctamente", result));
      } else {
        reject(chalk.red("Falla, iventor no insertado.", error));
      }
    });
  })
}

function updInventor(invConnect, filter, updateInventor) {
  return new Promise((resolve, reject) => {
    invConnect.updateOne(filter, updateInventor, (error, result) => {
      if (!error) {
        resolve(chalk.green("Iventor insertado correctamente", result));
      } else {
        reject(chalk.red("Falla, iventor no updateado.", error));
      }
    });
  })
}

function deleteInventor(invConnect, inventor) {
  return new Promise((resolve, reject) => {
    invConnect.deleteOne(inventor, (error, result) => {
        if (!error) {
            resolve (chalk.green("Iventor eliminado correctamente", result));
        } else {
            reject (chalk.red("Falla, iventor no eliminado.", error));
        }
    });
  })
}