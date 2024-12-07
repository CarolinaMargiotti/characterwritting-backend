const { db, ref, set, get, remove, update, push } = require("../database");

class Message {
	constructor(id, characterId, message, sceneId, chapterId, bookId) {
		this.id = id;
        this.characterId = characterId;
        this.message = message;
        this.sceneId = sceneId;
        this.chapterId = chapterId;
        this.bookId = bookId;
	}

	static fromSnapshot(snapshot) {
		const data = snapshot.val();
		return new Message(
			snapshot.key,
			data.characterId,
			data.message,
			data.sceneId,
			data.chapterId,
			data.bookId
		);
	}

	toFirebaseObject() {
		return {
			id: this.id,
            characterId: this.characterId,
            message: this.message,
			sceneId: this.sceneId,
			chapterId: this.chapterId,
			bookId: this.bookId
		};
	}

	messagePath(){
		return `book/${this.bookId}/chapter/${this.chapterId}/scene/${this.sceneId}/message`;
	}

	messagePathId(id){
		return `${this.messagePath()}/${id}`;
	}

	static async getById(id) {
		const messageRef = ref(db, this.messagePathId(id));
		const snapshot = await get(messageRef);
		if (!snapshot.exists()) {
			throw new Error("Message not found");
		}
		const character = this.fromSnapshot(snapshot);

		return character;
	}

	static async getAll() {
		const messagesRef = ref(db, this.messagePath());
		const snapshot = await get(messagesRef);

		if (!snapshot.exists()) {
			throw new Error("No messages found");
		}

		return snapshot.val();
	}

	static async deleteMessage(id) {
		const messageRef = ref(db, this.messagePathId(id));
		await remove(messageRef);
	}

	async save() {
		const messageRef = ref(db, this.messagePath());
		const newRef = push(messageRef);
		this.id = newRef.key;

		await set(newRef, this.toFirebaseObject());
	}

	async updateMessage() {
		const messageRef = ref(db, this.messagePathId(this.id));
		await update(messageRef, this.toFirebaseObject());
	}
}
module.exports = Message;
