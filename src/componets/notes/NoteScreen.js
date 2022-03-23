import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNoteFireStore } from '../../actions/notes';
import deleteImage from '../../helpers/deleteImage';
import { swalLoader, swalClose } from '../../helpers/swalHelper';
import uploadImage from '../../helpers/uploadImage';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const [imgUpload, setImgUpload] = useState({
    upload: false,
    url: '',
  });
  const { active } = useSelector(({ notes }) => notes);

  const { form, handleInput, resetForm, setUrlImage } = useForm(active);

  const { title, body, urlImage } = form;

  useEffect(() => {
    deleteNoUpdatedImg();
    resetForm();
  }, [active]);

  const setSubmitted = () => resetImgUpload();
  const resetImgUpload = () => setImgUpload({ upload: false, url: '' });

  const deleteNoUpdatedImg = () => {
    if (imgUpload.upload) {
      deleteImage(imgUpload.url);
      resetImgUpload();
    }
  };

  const setPicture = async (e) => {
    if (e.target.value) {
      deleteNoUpdatedImg();
      const imgFile = e.target.files[0];
      if (imgFile) {
        swalLoader('Subiendo imagen...');
        const urlImageCloud = await uploadImage(imgFile);
        setUrlImage(urlImageCloud);
        setImgUpload((prevState) => ({
          ...prevState,
          upload: true,
          url: urlImageCloud,
        }));
        swalClose();
        e.target.value = '';
      }
    }
  };

  const handleDelete = () => {
    dispatch(deleteNoteFireStore(active.id));
  };

  return (
    <>
      <div className="notes__main-content">
        <NotesAppBar
          setPicture={setPicture}
          setSubmitted={setSubmitted}
          note={form}
        />
        <div className="notes__content">
          <input
            className="notes__input"
            placeholder="Escribe un título increíble!"
            name="title"
            onChange={handleInput}
            value={title}
          ></input>
          <textarea
            className="notes__textarea"
            placeholder="¿Qué te pasó el día de hoy?"
            name="body"
            onChange={handleInput}
            value={body}
          ></textarea>
          {urlImage && (
            <div className="notes__imagen">
              <img src={urlImage} alt="img" />
            </div>
          )}
        </div>
        {active.id && (
          <button className="btn btn-delete" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </div>
    </>
  );
};
