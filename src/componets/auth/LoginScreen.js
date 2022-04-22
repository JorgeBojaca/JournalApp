import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPass } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ ui }) => ui);

  const { form, handleInput, validateForm, errorForm } = useForm(
    {
      email: 'vscode.dev',
      password: '',
    },
    ['email', 'password']
  );
  const { email, password } = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    const [isValid] = validateForm();
    if (isValid) {
      dispatch(startLoginEmailPass(email, password));
    }
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  return (
    <div className="animate__animated animate__bounceIn">
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          name="email"
          className={`${errorForm.email ? 'auth__input error' : 'auth__input'}`}
          onChange={handleInput}
          value={email}
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
          value={password}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={loading}
        >
          Login
        </button>
      </form>
      <div className="button-google">
        <span className="logo"></span>
        <button onClick={handleGoogleLogin}>Sign in with google</button>
      </div>
      <Link to="/auth/register" className="link">
        Create new account
      </Link>
    </div>
  );
};
