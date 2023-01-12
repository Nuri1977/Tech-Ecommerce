import React, { useEffect, useState } from 'react';
import './SignUp.scss';
import Button from '../Forms/Button/Button';
import Input from '../Forms/Input/Input';
import { clearAuthErrors } from '../../redux/authentication/authSlice';
import { signUpEmailPassword } from '../../redux/authentication/authThunk';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const { authError, loading, dispatch } = useAuth();

  const [userInput, setUserInput] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const { displayName, email, password, confirmPassword } = userInput;
  const clearErrors = () => {
    setTimeout(() => {
      setErrors(['']);
      dispatch(clearAuthErrors());
    }, 3000);
  };

  useEffect(() => {
    if (authError) {
      setErrors([authError]);
      clearErrors();
    }
  }, [authError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // eslint-disable-next-line quotes
      setErrors(["Password don't match"]);
      clearErrors();
      return;
    } else if (!displayName || !email || !password) {
      setErrors(['Fields can not be blank']);
      clearErrors();
      return;
    } else {
      setErrors([]);
    }
    dispatch(signUpEmailPassword({ email, password }));
  };

  return (
    <div className="signUp">
      <div className="wrap">
        <h2>Signup</h2>
        {errors.length > 0 && errors.map((error, index) => <span key={index}>{error}</span>)}

        <div className="formWrap">
          <form onSubmit={onSubmitHandler}>
            <Input
              type="text"
              name="displayName"
              placeholder="Full name"
              value={displayName}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
            />
            <Button disabled={loading}>{loading ? 'Loading..' : 'Submit'}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
