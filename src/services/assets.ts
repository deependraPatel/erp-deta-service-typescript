import db from "./db";

export default class Assets {
	private detaDrive: any;

	constructor(driveName: string) {
		this.detaDrive = db.Drive(driveName);
	}

	async uploadFileContent(filePath: string, content: any) {
		const { error, response } = await this.detaDrive.put(filePath, {
			data: content,
		});
		if (error) {
			return error;
		}

		return response;
	}

	async getFile(filePath: string) {
		const file = await this.detaDrive.get(filePath);
		const buffer = await file.arrayBuffer();

		return Buffer.from(buffer);
	}

	async deleteFile(filePath: string) {
		return await this.detaDrive.delete(filePath);
	}

	static use(driveName: string): Assets {
		return new Assets(driveName);
	}
}
