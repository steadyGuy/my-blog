const mimeList = ['jpeg', 'pjpeg', 'png']

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

export const imageUpload = async (file: File) => {
  const formData = new FormData();

  formData.set("file", file);
  formData.set("upload_preset", "xkxrxuju");
  formData.set("bestfiles", "bestfiles");

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/bestfiles/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    debugger;
    return { public_id: data.public_id, url: data.secure_url };
  } catch (err) {
    return err;
  }

}