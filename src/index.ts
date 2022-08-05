import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";
import compression from 'compression';
import path from "path";
import * as runningAt from "running-at";

import logs from "./utils/logs";
import { routeLog, sendResponse, disableCaching } from "./middleware";
import router from "./routes";

dotenv.config();

const app: Express = express();

// app.set('view engine', 'ejs');
app.use(routeLog);
app.use(sendResponse);

app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(disableCaching);

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

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!err) {
      return next();
    }

    let returnStatus;
    let message = err.message || "An unkown error ocurred, please try again.";
    if (err.name === "HTTPError") {
      logs.warn("Metdata parsing failed: " + err.message);
      returnStatus = 500;
      message = "Could not get metadata for url";
    } else {
      logs.fatal(err);
      returnStatus = typeof err === "number" ? err : 400;
    }

    res.fail(returnStatus, err.message, message);
  }
);

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
