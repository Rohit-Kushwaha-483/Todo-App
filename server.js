import { app } from "./app.js";
import { connectDb } from "./database/db.js";

connectDb();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is Listening at ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
