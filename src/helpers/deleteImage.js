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

export const getImageId = (urlImage) => {
  const segments = urlImage.split('/');
  const imgSegment = segments.pop();
  const imgId = imgSegment.substring(0, imgSegment.indexOf('.'));
  return imgId;
};

export default deleteImage;
