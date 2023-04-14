const url = process.env.REACT_APP_CLOUDINARY_URL || '';

export function imageUpload(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_PRESET || ''
  );
  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data.url;
    })
    .catch((error) => {
      console.error(error);
    });
}
