import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});