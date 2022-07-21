import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";
import path from "path";
import * as runningAt from "running-at";
import router from './routes';

dotenv.config();

const app: Express = express();
// const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

app.use(router);

app.get("*", (_req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    next();
    return;
  }

  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

if (require.main === module) {
  try {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => runningAt.print(PORT));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  }
}

export default app;
