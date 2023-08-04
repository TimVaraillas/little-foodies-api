import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.MONGODB_URI || "";

console.log("dbUri", dbUri)

mongoose.connect(dbUri);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

export default database;