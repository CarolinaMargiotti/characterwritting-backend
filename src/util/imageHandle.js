const { storageRef, storage, uploadBytes } = require("../database");

async function uploadSingleImage(file, filename, path) {
	file.originalname = replaceFileName(file.originalname, filename);
	const refImage = storageRef(storage, `${path}/${file.originalname}`);

	await uploadBytes(refImage, file.buffer, {
		contentType: file.mimetype,
	})
		.then((snapshot) => {
			console.log("uploaded file");
		})
		.catch((error) => {
			console.log("error: ", error.message);
		});
}

function replaceFileName(oldName, newName) {
	const dotIndex = oldName.indexOf(".");
	const name = oldName.substring(0, dotIndex);

	return oldName.replace(name, newName);
}

module.exports = { uploadSingleImage };
