const { myDataSource } = require('../../libs/database');
const fs = require('fs');
const path = require('path')

if(!process.argv.slice(2)[0]){
    console.log("U can't migrate")
}

function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


fs.readdir( path.join("common", "entity") , async (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  // Listing all files using forEach
  const client = await myDataSource.connect();
  files.forEach( async (file) => {
    try {
        const requiredModule = require("../entity/"+file)
        const modules = {};
        const variableName =  capitalizeFirstLetter(file.split(".")[0]) + "MigrateEntity"
        console.log(variableName)

        // Store the module in the 'modules' object
        modules[variableName] = requiredModule;

        let query = ""
        const entityObject = (modules[variableName][variableName])
        for( let k in entityObject){
            if( Object.keys(entityObject)[Object.keys(entityObject).length - 1] != k ){
                query += k + " " + entityObject["name"] + ","
            }else{
                query += k + " " + entityObject[k]
            }
        }
        const result = await client.query(`CREATE TABLE ${file.split(".")[0]}( ${query} )`);
    } catch (err) {
        console.error(err);
        client.release();
        return
    }
    client.release();
    console.log("Migrated successfully")
    return
  });
});