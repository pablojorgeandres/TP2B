const mongoClient = require('mongodb').MongoClient;
const uriDatabase = "mongodb+srv://pablo:ClusterPass2020@cluster-000-mjcet.azure.mongodb.net/test?retryWrites=true&w=majority";
const chalk = require('chalk');

const client = new mongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

const ins = "insert"
const updt = "update"
const del = "delete";

const inventor = {
    first: "Nikola",
    last: "Tesla",
    year: 1856
}
const inventor2 = {
    first: "Alan",
    last: "Turing",
    year: 1912
}
const updateData = { $set: { "year": 1910 } }
const updateID = { "first": "Alan" };

const deleteData = {
    "first": "Alan",
}

async function connectWithDB(op, object, filter) {
    return new Promise((resolve, reject) => {
        client.connect((error, result) => {
            if (!error) {
                console.log(chalk.green("Conexión exitosa"));
                const collectionInventors = result.db('sample_betp2').collection('inventors');
                switch (op) {
                    case "insert":
                        collectionInventors.insertOne(object, (error, result) => {
                            if (!error) {
                                console.log(chalk.green("Iventor insertado correctamente", result));
                            } else {
                                console.log(chalk.red("Falla, iventor no insertado.", error));
                            }
                        });
                        break;
                    case "update":
                        collectionInventors.updateOne(filter, object, (error, result) => {
                            if (!error) {
                                console.log(chalk.green("Iventor updateado correctamente", result));
                            } else {
                                console.log(chalk.red("Falla, iventor no updateado.", error));
                            }
                        });
                        break;
                    case "delete":
                        collectionInventors.deleteOne(object, (error, result) => {
                            if (!error) {
                                console.log(chalk.green("Iventor eliminado correctamente", result));
                            } else {
                                console.log(chalk.red("Falla, iventor no eliminado.", error));
                            }
                        });
                        break;
                    default:
                        break;
                }

            } else {
                console.log(chalk.red(error));
            }
        });
    })
}

async function executeAsyncToDB(op, object, filter) {
    console.log('llamando ...')
    const resultado = await connectWithDB(op, object, filter)
    console.log(resultado)
    client.close()
}

/**** Descomentar la operación que desea ejecutar ****/

/* Insert */
executeAsyncToDB(ins, inventor2, null);

/* Update */
// executeAsyncToDB(updt, updateData, updateID);

/* Delete */
// executeAsyncToDB(del, deleteData, null);