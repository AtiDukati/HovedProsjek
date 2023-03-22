import pg from "pg";

const url =
  "postgres://cffuzpghjtwtrb:22730d294f419c6db2018f712b7aee7ed90143c825fa1c449e4cb7f71e89aa11@ec2-34-251-233-253.eu-west-1.compute.amazonaws.com:5432/d36k4deoigdirj";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL || url,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
})();

class sqlActions {
  constructor() {
    //this.value1 = value1;
    // this.value2 = value2;
  }

  async showAll() {
    try {
      client
        .query(`SELECT * FROM users`)
        .then((res) => console.log(res.rows))
        .catch((err) => console.error("Error executing query", err))
        .finally(() => client.end());
    } catch (error) {
      console.error("Error executing query", error);
    }
  }

  async registerNewUser(userName, userPass) {
    try {
      // Insert data into the users table
      await client.query(
        `INSERT INTO users (username , password) VALUES ('${userName}', '${userPass}')`
      );
      client.end();
    } catch (error) {
      console.error("Error executing query", error);
    }
  }

  async loginCheck(userName, userPass) {
    try {
      // Insert data into the users table
      let loginCheck = await client.query(
        `SELECT * FROM users WHERE username = '${userName}' AND password = '${userPass}'`
      );
      client.end();

      if (loginCheck.rows.length >= 0) {
        console.log("Login successful");
        return loginCheck.rows[0];
      } else {
        console.log("Invalid username or password");
        return null;
      }
    } catch (error) {
      console.log("either username or password is incorrect", error);
      return null;
    }
  }
}

export default sqlActions;
