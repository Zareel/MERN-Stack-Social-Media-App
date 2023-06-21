import mongoose from "mongoose";
import app from "./src/app.js";
import colors from "colors";
import config from "./src/config/index.js";

const PORT = config.PORT;

(async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URL);
    console.log(`DB Connected! ${conn.connection.host}`.bgMagenta.white);

    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });

    const onListening = () => {
      console.log(`Listening on PORT: ${PORT}`.bgBlue.white);
    };
    app.listen(PORT, onListening);
  } catch (error) {
    console.log(`Erron in MongoDB connection ${error}`.bgRed.white);
  }
})();
