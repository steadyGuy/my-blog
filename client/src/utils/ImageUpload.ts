import { IUploadedImageData } from '../interfaces';

const mimeList = ['jpeg', 'pjpeg', 'png', 'gif'];

export const checkImage = (file: File) => {
  if (!file) {
    return 'Файл не существует';
  }

  if (file.size > 1024 * 1024) {
    return 'Размер изображения не должен превышать 1MB';
  }

  const [MIME, innerMIME] = file.type.split('/');

  if (MIME !== 'image') {
    return 'Вы должны передать фотографию';
  }

  if (!mimeList.includes(innerMIME)) {
    return `Поддерживаемые форматы изображений: ${mimeList.join()}`
  }

  return null;
}

export const imageUpload = async (file: File | null, files?: File[]):
  Promise<IUploadedImageData[]> => {
  const formData = new FormData();

  formData.set("upload_preset", "xkxrxuju");
  formData.set("bestfiles", "bestfiles");
  if (file) formData.set("file", file);

  try {
    if (files) {
      const requests = files.map(file => {
        formData.set('file', file);
        return getApi();
      });

      return Promise.all(requests);
    }

    const data = await getApi();
    return [{ public_id: data.public_id, url: data.secure_url }];
  } catch (err) {
    return err;
  }

  async function getApi() {
    const res = await fetch('https://api.cloudinary.com/v1_1/bestfiles/upload', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    return json;
  }

}