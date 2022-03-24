import { useState } from 'react';
/**
 *
 * @param {{}} initialForm Campos para el formulario
 * @param {[]} requiredFilds Campos del formulario que son requeridos
 * @param {[[]]} equalFilds Campos que deben tener el mismo valor agrupados en arrays
 *
 * @returns {{form:{},handleInput:function,validateForm:function,errorForm:{},restForm:function}}
 * form: Objeto con todos los campos del formulario
 *
 * handleInput: Función para manejar el cambio de los inputs
 *
 * validateForm: Función para validar el formulario
 *
 * errorForm: Objeto como el form pero con valores booleanos, si hay un error wl campo se marca como true
 *
 * restForm: Función para resetear el form
 */

export const useForm = (initialForm, requiredFilds = [], equalFilds = []) => {
  const [form, setForm] = useState(initialForm);
  const initialError = () => {
    const errors = { ...form };
    for (const name in errors) {
      errors[name] = false;
    }
    return errors;
  };
  const [errorForm, setErrorForm] = useState(initialError);

  const resetForm = () => {
    setForm(initialForm);
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let arrError = [];
    let [isValidR, arrErrorR] = validateRequiredFilds();
    if (isValidR) {
      let [isValidE, arrErrorE] = validateEqualFilds();
      if (isValidE) {
        return [true];
      }
      arrError = arrErrorE;
    } else {
      arrError = arrErrorR;
    }
    const errorMessage = getErrorMessage(arrError);
    return [false, errorMessage];
  };

  const getErrorMessage = (arrError) => {
    let message = '';
    if (arrError.length === 1) {
      message =
        typeof arrError[0] === 'object'
          ? `Los siguientes campos deben ser iguales: ${arrError[0].join(', ')}`
          : `Verifique el siguiente campo: ${[arrError[0]]}`;
    } else if (arrError.length > 1) {
      message = `Verifique los siguentes campos: ${arrError.join(', ')}`;
    }
    return message;
  };

  const validateRequiredFilds = () => {
    const errors = { ...errorForm };
    const errArray = [];
    for (const name in form) {
      errors[name] = false;
      if (requiredFilds.includes(name)) {
        const value = form[name].trim();
        if (!value) {
          errors[name] = true;
          errArray.push(name);
        }
      }
    }
    if (errArray.length > 0) {
      setErrorForm(errors);
      return [false, errArray];
    }
    return [true];
  };

  const validateEqualFilds = () => {
    const errors = { ...errorForm };
    const auxForm = { ...form };
    const errArray = [];
    equalFilds.forEach((fields) => {
      let isDiff = false;
      let value = form[fields[0]];
      for (const name of fields) {
        //Busca si hay un campo diferente
        if (value !== form[name]) {
          isDiff = true;
          break;
        }
      }
      if (isDiff) {
        //Actualiza el objeto y el array de errores y actualiza el valor de los campos del form
        errArray.push([...fields]);
        for (const name in errors) {
          if (fields.includes(name)) {
            errors[name] = true; //Para actualizar el objeto ErrorForm
            auxForm[name] = ''; //Para actualizar el objeto Form y settear el campo en '' ya que es incorrecto
          }
        }
      }
    });
    if (errArray.length > 0) {
      setErrorForm(errors);
      setForm(auxForm);
      return [false, errArray];
    }
    return [true];
  };
  const getSetters = () => {
    const setters = {};
    for (const key in form) {
      const nameFunc = 'set' + key[0].toUpperCase() + key.substring(1);
      setters[nameFunc] = (val) => {
        setForm({ ...form, [key]: val });
      };
    }
    return setters;
  };
  return {
    form,
    handleInput,
    validateForm,
    errorForm,
    resetForm,
    ...getSetters(),
  };
};
