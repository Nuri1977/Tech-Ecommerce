import React, { useState } from 'react';
import Button from '../../components/Forms/Button/Button';
import Input from '../../components/Forms/Input/Input';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/authentication/authSlice';
import { sendResetPassword } from '../../redux/authentication/authThunk';
import './Recovery.scss';

const Reovery = () => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const { resetPassword, resetPasswordError, resetPasswordLoading } = useAppSelector(selectAuth);
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!email) {
      setErrors(['Fields can not be blank']);
      return;
    } else {
      setErrors([]);
    }
    dispatch(sendResetPassword(email));
  };

  return (
    <div className="signIn">
      <div className="wrap">
        <h2>Recover Password</h2>
        {errors.length > 0 && errors.map((error, index) => <span key={index}>{error}</span>)}
        {resetPasswordError && <span>{resetPasswordError}</span>}
        {resetPassword && <div>{resetPassword}</div>}

        <div className="formWrap">
          <form onSubmit={(event) => onSubmitHandler(event)}>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            <Button type="submit" disabled={resetPasswordLoading}>
              {resetPasswordLoading ? 'Loading..' : 'Send email'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reovery;
