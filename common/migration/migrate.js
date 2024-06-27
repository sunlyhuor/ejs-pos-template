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


async function createTables(sql){
  const client = await myDataSource.connect();
    try {
        await client.query(sql);
        console.log("Migration successfully")
    }catch(e){
      console.log(e)
    }
    finally {
        await client.release();
    }
}
  
if( params[0] == "migrate" ){
    const sql = fs.readFileSync( path.join("sql", "table.sql") , 'utf8');
    createTables( sql )
    
}else if(  params[0] == "clear" ){
  clearTable()
}else{
  help()
  process.exit(1)
}