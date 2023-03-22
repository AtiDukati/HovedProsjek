const {client} = require ("pg");

const DATABASE_URL = "cffuzpghjtwtrb:22730d294f419c6db2018f712b7aee7ed90143c825fa1c449e4cb7f71e89aa11@ec2-34-251-233-253.eu-west-1.compute.amazonaws.com:5432/d36k4deoigdirj";

const client = new client({
    connectionString: process.env.DATABASE_URL || DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async ()=>{
    try{
        await client.connect();
        console.log("Connected to database");
    }catch (err){
        console.error("Error connecting to database", err);
    }
})();

// client.query('SELECT * FROM my_table')
//   .then(res => console.log(res.rows))
//   .catch(err => console.error('Error executing query', err))
//   .finally(() => client.end());