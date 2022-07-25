import Crud from "../services/crud";

const db = Crud.use("forms");

export interface Columns {
	elementJsonStiring: string;
}

export interface Rows {
	columns: Columns[];
}

export interface FormsModel {
	id: string;
	formTitle: string;
	formSubTitle: string;
	dataModelName: string;
	routePath: String;
	rows: Rows[];
	addedAt: Date;
}


// main class
export class Forms {
	id: string;
	formTitle: string;
	formSubTitle: string;
	dataModelName: string;
	routePath: String;
	rows: Rows[];
	addedAt: Date;
	updatedAt: Date;

	constructor(formsData: FormsModel) {
		this.id = formsData.id;
		this.formTitle = formsData.formTitle;
		this.formSubTitle = formsData.formSubTitle;
		this.dataModelName = formsData.dataModelName;
		this.routePath = formsData.routePath;
		this.rows = formsData.rows;
		this.addedAt = formsData.addedAt;
		this.updatedAt = new Date();
	}

	async update(changes: any) {
		await db.findByIdAndUpdate(this.id, changes);
	}

	async delete() {
		await db.findByIdAndDelete(this.id);
	}

	static async create(formData: FormsModel): Promise<Forms> {
		const newCrate = await db.create(formData);
		return new Forms(newCrate);
	}

	static async find(query: any = {}, limit?: number, lastId?: string) {
		const { items, count, last } = await db.find(query, limit, lastId);

		if (!items) return { items: [], count: 0, last: undefined };

		return {
			count,
			last,
			items: items.map((form: Forms) => new Forms(form)),
		};
	}

	static async findOne(query: any) {
		const form = await db.findOne(query);

		if (!form) return null;

		return new Forms(form);
	}

	static async findById(id: string) {
		const form = await db.findById(id);

		if (!form) return null;

		return new Forms(form);
	}

	static async findByIds(ids: Array<string>) {
		const formData = await Promise.all(
			ids.map(async (id) => {
				const data = await db.findById(id);
				if (!data) return undefined;

				return new Forms(data);
			})
		);

		return formData.filter((item) => item !== undefined) as Array<Forms>;
	}
}
