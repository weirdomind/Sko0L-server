import { cyanBright, redBright } from "ansi-colors";
import { connect } from "mongoose";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster.sxsst.mongodb.net/skool?retryWrites=true&w=majority`;

const db = connect(uri)
  .then(() => console.log(cyanBright("    Connected to MongoDB")))
  .catch((err) => {
    console.log(redBright("    Error connecting to MongoDB"));
    console.error(err);
  });

export default db;
