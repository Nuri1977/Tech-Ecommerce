import React from 'react';
import './SignIn.scss';
import Button from '../Forms/Button/Button';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebaseConfig';

const SignIn = () => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    signInWithPopup(auth, provider).then((user) => console.log(user));
  };
  return (
    <div className="signIn">
      <div className="wrap">
        <h2>LogIn</h2>
        <div className="formWrap">
          <form onSubmit={(event) => onSubmitHandler(event)}>
            <div className="socialSignIn">
              <div className="row">
                <Button>Sing in with google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
