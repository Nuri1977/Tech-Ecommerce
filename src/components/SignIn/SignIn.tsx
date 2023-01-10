import React, { useState } from 'react';
import './SignIn.scss';
import Input from '../Forms/Input/Input';
import Button from '../Forms/Button/Button';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!email || !password) {
      setErrors(['Fields can not be blank']);
      return;
    } else {
      setErrors([]);
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => setErrors([error.message]))
      .finally(() => setLoading(false));
  };

  const handleGooglePopup = () => {
    signInWithPopup(auth, provider).catch((error) => setErrors([error.message]));
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading..' : 'Login'}
            </Button>

            <div className="socialSignIn">
              <div className="row">
                <Button type="button" disabled={loading} onClick={handleGooglePopup}>
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
