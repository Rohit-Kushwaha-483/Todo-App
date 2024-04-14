import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then((c) => console.log(`Connected to the DataBase || HOST : ${c.connection.host}`))
    .catch((err) => console.log("ERROR :", err));
};
