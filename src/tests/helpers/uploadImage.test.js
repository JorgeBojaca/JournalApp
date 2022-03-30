import deleteImage from '../../helpers/deleteImage';
import uploadImage from '../../helpers/uploadImage';

describe('Pruebas para el helper uploadImage', () => {
  test('Debe de retornar una url al subir una imágen ', async () => {
    const resp = await fetch(
      'https://i.postimg.cc/25vhbQL5/que-ver-sevilla-real-alcazar-3.jpg'
    );
    const img = await resp.blob();
    const file = new File([img], 'sevilla.jpg');
    const url = await uploadImage(file);
    expect(typeof url).toBe('string');
    await deleteImage(url);
  });
  test('Debe de retornar un error al no adjuntar imágen ', async () => {
    const file = new File([], 'sevilla.jpg');
    const url = await uploadImage(file);
    expect(url).toBe(null);
  });
});
