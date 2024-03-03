import { fireStore } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage(fireStore);

export const uploadFileToStorage = async (file: any, fileName: string) => {
  const storageRef = ref(storage, fileName);
  const metadata = {
    contentType: file.mimetype,
  };

  try {
    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    if (!snapshot) {
      throw new Error(`${file.originalname} upload failed`);
    }
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error(`Error uploading ${file.originalname}:`, error);
    throw error;
  }
};
