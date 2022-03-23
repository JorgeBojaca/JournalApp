import React from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ title, show, hideModal, children }) => {
  return (
    <>
      {show && (
        <div className="modal__container" onClick={hideModal}>
          <div
            className="modal__box-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__box-container-title">
              <h1>{title}</h1>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

/**
 * Ejemplo:
      <Modal show={show} hideModal={hideModal} title="New Entry">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            autoComplete="off"
            onChange={handleInput}
            value={form.title}
          />
          <input
            type="text"
            name="task"
            placeholder="Task"
            autoComplete="off"
            onChange={handleInput}
            value={form.task}
          />
          <button type="submit">Add</button>
        </form>
      </Modal>
 * 
 */
