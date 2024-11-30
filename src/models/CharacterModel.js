const { db, ref, set, get, remove, update } = require("../database");
const { getLastId, updateId } = require("./UtilModel");
const { uploadBase64ToFirebase } = require("../util/imageHandle");

class Character {
	lastId = NaN;
	constructor(id, name, color, age, image) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.age = age;
		this.image = image;
	}

	static fromSnapshot(snapshot) {
		const data = snapshot.val();
		return new Character(snapshot.key, data.name, data.color, data.age, data.image);
	}

	toFirebaseObject() {
		return {
			name: this.name,
			color: this.color,
			age: this.age,
			image: this.image
		};
	}

	static async getById(id) {
		const characterRef = ref(db, `characters/${id}`);
		const snapshot = await get(characterRef);
		if (!snapshot.exists()) {
			throw new Error("Character not found");
		}
		const character =  this.fromSnapshot(snapshot);

		return character;
	}

	static async getAll() {
		const charactersRef = ref(db, `characters`);
		const snapshot = await get(charactersRef);

		if (!snapshot.exists()) {
			throw new Error("No characters found");
		}

		return snapshot.val();
	}

	static async deleteCharacter(id) {
		const characterRef = ref(db, `characters/${id}`);
		await remove(characterRef);
	}

	async save() {
		updateId();
		const id = getLastId();
		const characterRef = ref(db, `characters/${id}`);
		const downloadUrl = await uploadBase64ToFirebase(`characters/${id}`,this.image.base64, this.image.type);
		this.image = downloadUrl;

		await set(characterRef, this.toFirebaseObject());
	}

	async updateCharacter() {
		const characterRef = ref(db, `characters/${this.id}`);
		await update(characterRef, this.toFirebaseObject());
	}
}
module.exports = Character;
