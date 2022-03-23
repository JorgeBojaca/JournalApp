const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');
  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dzavnsubr/image/upload',
    { method: 'POST', body: formData }
  );
  const jsonRes = await res.json();
  return jsonRes.secure_url;
};

export default uploadImage;
