const { myDataSource } = require('../../libs/database');
const fs = require('fs');
const path = require('path')

const params = process.argv.slice(2)

function help(){
  console.table([
    {
      migrate: "For migration",
      clear: "For  clear all table",
    }
  ])
}

async function clearTable(){
  const query = `
        DO
        $$
        DECLARE
            rec RECORD;
        BEGIN
            -- Loop through each table in the public schema
            FOR rec IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                -- Construct and execute the DROP TABLE statement with CASCADE
                EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(rec.tablename) || ' CASCADE';
            END LOOP;
        END
        $$;
    `
    const client = await myDataSource.connect();
    try{
      await client.query(query);
      console.log("Clean successfully")
      client.release();
    }catch(e){
      console.error(e)
      client.release();
    }
}

if(!params[0]){
    console.log("U can't migrate")
}

if( params[0] == "h" || params[0] == "--help" || params[0] == "" ){

  help()
  process.exit(1)

}

function capitalizeFirstLetter(string) {
      if (typeof string !== 'string' || string.length === 0) {
        return '';
      }
      return string.charAt(0).toUpperCase() + string.slice(1); 
}
  
if( params[0] == "migrate" ){
    fs.readdir( path.join("common", "entity") , async (err, files) => {
      if (err) {
        return console.error('Unable to scan directory: ' + err);
      }
      // Listing all files using forEach
      files.forEach( async (file) => {
        const client = await myDataSource.connect();
        try {
            const requiredModule = require("../entity/"+file)
            const modules = {};
            const variableName =  capitalizeFirstLetter(file.split(".")[1]) + "MigrateEntity"

            // Store the module in the 'modules' object
            modules[variableName] = requiredModule;

            let query = ""
            const entityObject = (modules[variableName][variableName])
            for( let k in entityObject){
                if( Object.keys(entityObject)[Object.keys(entityObject).length - 1] != k ){
                    query += k + " " + entityObject[k] + ","
                }else{
                    query += k + " " + entityObject[k]
                }
            }
            // console.log(query)
            await client.query(`CREATE TABLE IF NOT EXISTS ${file.split(".")[1]}( ${query} )`);
            console.log("Migrated " + file.split(".")[1] + "table successfully")
        } catch (err) {
            console.error(err);
            client.release();
            return
        }
        client.release();
      });
    });
}else if(  params[0] == "clear" ){
  clearTable()
}else{
  help()
  process.exit(1)
}