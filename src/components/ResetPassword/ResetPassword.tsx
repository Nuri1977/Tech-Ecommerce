import React, { useState } from 'react';
import Button from '../../components/Forms/Button/Button';
import Input from '../../components/Forms/Input/Input';
import useAuth from '../../hooks/useAuth';
import { sendResetPassword } from '../../redux/authentication/authThunk';
import './ResetPassword.scss';

const ResetPassword = () => {
  const { resetPassword, authError, loading, dispatch } = useAuth();

  const [errors, setErrors] = useState<string[]>([]);
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
        {authError && <span>{authError}</span>}
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading..' : 'Send email'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
