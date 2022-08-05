import express from "express";

import logs from "../utils/logs";
import { messages } from "../utils/response-status-codes";

const ignoreRequestStrings: Array<string> = [
	"js/",
	"css/",
	"img/",
	"assets/",
	"static/",
	"manifest.json",
]; // Don't log request if one of the strings are in URL

export function routeLog(
	req: express.Request,
	_res: express.Response,
	next: express.NextFunction
) {
	if (
		ignoreRequestStrings.some((value) => req.originalUrl.includes(value)) ||
		req.method === "HEAD"
	) {
		return next();
	}
	const dateOb = new Date();
	const date = ("0" + dateOb.getDate()).slice(-2);
	const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
	const year = dateOb.getFullYear();
	const hours = dateOb.getHours();
	const minutes = dateOb.getMinutes();
	const seconds = dateOb.getSeconds();
	const time =
		year +
		"-" +
		month +
		"-" +
		date +
		" " +
		hours +
		":" +
		minutes +
		":" +
		seconds;
	logs.request(`${time} ${req.method} ${req.originalUrl}`);
	next();
}

export function disableCaching(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	if (req.originalUrl === "/") {
		res.set("Cache-control", "no-store");
	}

	next();
}

export function sendResponse(
	_req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	res.ok = (data?: any) => {
		res.json({
			status: 200,
			message: "ok",
			...(data && data.last && { last: data.last }),
			...(data && data.count !== undefined && data.items !== undefined
				? { data: data.items }
				: { data }),
		});
	};

	res.fail = (statusCode: number, err?: any, statusMessage?: string) => {
		const status = statusCode || 500;
		const message = messages[statusCode];

		let error;

		if (!err) {
			error = { message: statusMessage || "Unkown error ocurred" };
		} else if (typeof err === "string") {
			error = { message: err };
		} else if (!err.message || statusMessage !== undefined) {
			error = {
				...err,
				message: statusMessage || "Unkown error ocurred",
			};
		} else {
			error = err;
		}

		res.status(status).json({
			status,
			message,
			error,
		});
	};

	next();
}

export function parsePaginate(
	req: express.Request,
	_res: express.Response,
	next: express.NextFunction
) {
	const rawLimit = (req.query.limit as string) || "10";
	const page = (req.query.page as string) || "1";
	const last = req.query.last as string | undefined;

	if (rawLimit === "0") {
		return next();
	}

	req.paginate = {
		last,
		limit: parseInt(rawLimit),
	};

	next();
}
