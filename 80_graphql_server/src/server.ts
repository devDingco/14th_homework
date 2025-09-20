import { dbconnect } from "@/lib/database.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { app } from "./app.js";

const startServer = async () => {
  try {
    await dbconnect();
    startStandaloneServer(app, {
      listen: { port: 4000 },
    }).then(({ url }) => {
      console.log(`Server Start: ${url}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error}`);
  }
};

startServer();
