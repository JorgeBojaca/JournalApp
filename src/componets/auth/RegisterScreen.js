import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeErrorMsg, setErrorMsg } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import isEmail from 'validator/lib/isEmail';
import { startRegisterNameEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uiErrorMsg } = useSelector((state) => state.ui);

  const { form, handleInput, validateForm, errorForm } = useForm(
    {
      name: 'Jorge',
      email: 'jl@bojaca.com',
      password: '123456',
      password_confirm: '123456',
    },
    ['name', 'email', 'password', 'password_confirm'],
    [['password', 'password_confirm']]
  );
  const isValidForm = () => {
    const [isValid, errorMessage] = validateForm();
    if (!isValid) {
      dispatch(setErrorMsg(errorMessage));
      return false;
    } else if (!isEmail(form.email)) {
      dispatch(setErrorMsg('Escriba un correo válido'));
      return false;
    } else if (form.password.length < 6) {
      dispatch(setErrorMsg('La contraseña debe tener al menos 6 caracteres'));
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidForm()) {
      console.log(form); // everything ok
      dispatch(removeErrorMsg());
      dispatch(
        startRegisterNameEmailPassword(form.email, form.password, form.name)
      );
      // navigate('/auth/login');
    }
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
      {uiErrorMsg && <div className="auth__box-error">{uiErrorMsg}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Name"
          name="name"
          className={`${errorForm.name ? 'auth__input error' : 'auth__input'}`}
          onChange={handleInput}
          value={form.name}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          name="email"
          className={`${errorForm.email ? 'auth__input error' : 'auth__input'}`}
          onChange={handleInput}
          value={form.email}
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          name="password"
          className={`${
            errorForm.password ? 'auth__input error' : 'auth__input'
          }`}
          onChange={handleInput}
          value={form.password}
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Confirm password"
          name="password_confirm"
          className={`${
            errorForm.password_confirm ? 'auth__input error' : 'auth__input'
          }`}
          onChange={handleInput}
          value={form.password_confirm}
        />
        <button type="submit" className="btn btn-primary btn-block mb-1">
          Save
        </button>
      </form>
      <Link
        to="/auth/login"
        className="link"
        onClick={() => dispatch(removeErrorMsg())}
      >
        Already registered?
      </Link>
    </>
  );
};
