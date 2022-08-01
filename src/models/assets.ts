import Assets from "../services/assets";

const assets = Assets.use("assets");

export class AssetsModel {
	static async uploadFile(filePath: string, content: any) {
		return assets.uploadFileContent(filePath, content);
	}

	static async getFile(filePath: string) {
		return assets.getFile(filePath);
	}
}
