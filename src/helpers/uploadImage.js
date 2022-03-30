const uploadImage = async (file) => {
  if (file.size === 0) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');
  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dzavnsubr/image/upload',
      { method: 'POST', body: formData }
    );
    const jsonRes = await res.json();
    return jsonRes.secure_url;
  } catch (error) {
    return null;
  }
};

export default uploadImage;
