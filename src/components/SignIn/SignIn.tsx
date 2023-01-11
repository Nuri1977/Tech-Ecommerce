import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import Input from '../Forms/Input/Input';
import Button from '../Forms/Button/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { signInEmailPassword, signInPopup } from '../../redux/authentication/authThunk';
import { clearAuthErrors, selectAuth } from '../../redux/authentication/authSlice';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { signInError, signInLoading, signInPopupLoading, signInPopupError } =
    useAppSelector(selectAuth);

  const clearErrors = () => {
    setTimeout(() => {
      setErrors(['']);
      dispatch(clearAuthErrors());
    }, 3000);
  };

  useEffect(() => {
    if (signInError) setErrors([signInError]);
    clearErrors();
  }, [signInError]);

  useEffect(() => {
    if (signInPopupError) setErrors([signInPopupError]);
    clearErrors();
  }, [signInPopupError]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!email || !password) {
      setErrors(['Fields can not be blank']);
      return;
    } else {
      setErrors([]);
    }
    dispatch(signInEmailPassword({ email, password }));
    // setLoading(true);
    // signInWithEmailAndPassword(auth, email, password)
    //   .catch((error) => setErrors([error.message]))
    //   .finally(() => setLoading(false));
  };

  const handleGooglePopup = () => {
    dispatch(signInPopup());
  };

  return (
    <div className="signIn">
      <div className="wrap">
        <h2>LogIn</h2>
        {errors.length > 0 && errors.map((error, index) => <span key={index}>{error}</span>)}

        <div className="formWrap">
          <form onSubmit={(event) => onSubmitHandler(event)}>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            <Button type="submit" disabled={signInLoading}>
              {signInLoading ? 'Loading..' : 'Login'}
            </Button>

            <div className="socialSignIn">
              <div className="row">
                <Button type="button" disabled={signInPopupLoading} onClick={handleGooglePopup}>
                  Sing in with google
                </Button>
              </div>
            </div>
            <div>
              <Link to="/recovery"> Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
