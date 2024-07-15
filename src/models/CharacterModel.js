const { db, ref, set, get, remove, update } = require("../database");

class Character {
	constructor(id, name, color, age, image) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.age = age;
		this.image = image;
	}

	static fromSnapshot(snapshot) {
		const data = snapshot.val();
		return new Character(
			snapshot.key,
			data.name,
			data.color,
			data.age,
			data.image
		);
	}

	toFirebaseObject() {
		return {
			name: this.name,
			color: this.color,
			age: this.age,
			image: this.image,
		};
	}

	static async getById(id) {
		const characterRef = ref(db, `characters/${id}`);
		const snapshot = await get(characterRef);
		if (!snapshot.exists()) {
			throw new Error("Character not found");
		}
		return Character.fromSnapshot(snapshot);
	}

	static async deleteCharacter(id) {
		const characterRef = ref(db, `characters/${id}`);
		await remove(characterRef);
	}

	async save() {
		const characterRef = ref(db, `characters/${this.id}`);
		await set(characterRef, this.toFirebaseObject());
	}

	async updateCharacter() {
		const characterRef = ref(db, `characters/${this.id}`);
		await update(characterRef, this.toFirebaseObject());
	}
}
module.exports = Character;
