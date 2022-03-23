import createFormDataSign from './createFormDataSign';

const deleteImage = async (urlImage) => {
  const imageId = getImageId(urlImage);
  if (imageId) {
    const timestamp = new Date().getTime();
    const public_id = imageId;

    const formData = await createFormDataSign({
      timestamp,
      public_id,
    });
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dzavnsubr/image/destroy',
      { method: 'POST', body: formData }
    );
    const jsonRes = await res.json();
    return jsonRes;
  }
  return null;
};

const getImageId = (urlImage) => {
  const urlImage_rev = urlImage.split('').reverse().join('');

  const dotIdx = urlImage_rev.indexOf('.');
  const slaIdx = urlImage_rev.indexOf('/');
  if (dotIdx !== -1 && slaIdx !== -1) {
    const idImage_rev = urlImage_rev.substring(dotIdx + 1, slaIdx);

    const idImage = idImage_rev.split('').reverse().join('');
    return idImage;
  }
  return null;
};

export default deleteImage;
