const { storage, storageRef, uploadString, getDownloadURL } = require("../database");


async function uploadBase64ToFirebase(
	filePathAndName,
	base64String,
	contentType
) {
	const fileRef = storageRef(storage, filePathAndName);

	const snapshot = await uploadString(fileRef, base64String, "base64", {
		contentType,
	});

	const downloadURL = await getDownloadURL(snapshot.ref);
	return downloadURL;
}

function replaceFileName(oldName, newName) {
	const dotIndex = oldName.indexOf(".");
	const name = oldName.substring(0, dotIndex);

	return oldName.replace(name, newName);
}

module.exports = { uploadBase64ToFirebase };
