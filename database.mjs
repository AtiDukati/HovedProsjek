import pg from "pg";

const url =
  "postgres://cffuzpghjtwtrb:22730d294f419c6db2018f712b7aee7ed90143c825fa1c449e4cb7f71e89aa11@ec2-34-251-233-253.eu-west-1.compute.amazonaws.com:5432/d36k4deoigdirj";

class sqlActions {
  constructor() {
    this.client = null;
    this.credentials = {
      connectionString: process.env.DATABASE_URL || url,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  async connectToDatabase(params) {
    this.client = new pg.Client(this.credentials);

    try {
      await this.client.connect();
      console.log("Connected to database");
    } catch (err) {
      console.error("Error connecting to database", err);
    }
  }
  //==========================================PROFILE SHOW ALL===================================
  async showAllProfile(username) {
    await this.connectToDatabase();

    try {
      console.log(username);
      const result = await this.client.query(
        `SELECT * FROM scorboard WHERE username= '${username}'`
      );

      this.client.end();
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error);
      return null;
    }
  }

  //==========================================SHOW ALL===================================
  async showAll() {
    await this.connectToDatabase();
    try {
      const result = await this.client.query(
        `SELECT * FROM scorboard ORDER BY score ASC;`
      );

      this.client.end();
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error);
      return null;
    }
  }
  //==========================================REGISTER NEW USER===================================
  async registerNewUser(userName, userPass) {
    await this.connectToDatabase();
    try {
      // Insert data into the users table
      await this.client.query(
        `INSERT INTO users (username , password) VALUES ('${userName}', '${userPass}')`
      );
      this.client.end();
    } catch (error) {
      console.error("Error executing query", error);
    }
  }

  //==========================================DELETE USER===================================

  async deleteUser(userName) {
    await this.connectToDatabase();
    try {
      // Insert data into the users table
      await this.client.query(`DELETE FROM users WHERE username='${userName}'`);
      await this.client.query(
        `DELETE FROM scorboard WHERE username='${userName}'`
      );

      this.client.end();
    } catch (error) {
      return false;
      console.error("Error executing query", error);
    }
  }

  //==========================================LOGIN CHECK===================================
  async loginCheck(userName, userPass) {
    await this.connectToDatabase();
    try {
      let loginCheck = await this.client.query(
        `SELECT * FROM users WHERE username = '${userName}' AND password = '${userPass}'`
      );

      if (loginCheck.rows.length > 0) {
        console.log("Login successful");
        this.client.end();
        return loginCheck.rows[0];
      } else {
        console.log("Invalid username or password");
        this.client.end();
        return null;
      }
    } catch (error) {
      console.log("either username or password is incorrect", error);
      return null;
    }
  }
  //==========================================SUBMIT SCORE===================================
  async submitScore(user, score) {
    await this.connectToDatabase();
    try {
      await this.client.query(
        `INSERT INTO scorboard (username, score) VALUES ('${user}', '${score}')`
      );
      this.client.end();
    } catch (error) {
      console.log("Error executing query", error);
    }
  }
}

export default sqlActions;
