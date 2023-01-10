import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Button from '../../components/Forms/Button/Button';
import Input from '../../components/Forms/Input/Input';
import { auth } from '../../firebase/firebaseConfig';
import './Recovery.scss';

const Reovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [confirm, setConfirm] = useState('');

  const resetConfigSettings = {
    url: 'http://localhost:3000/login'
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!email) {
      setErrors(['Fields can not be blank']);
      return;
    } else {
      setErrors([]);
    }
    setLoading(true);
    sendPasswordResetEmail(auth, email, resetConfigSettings)
      .then(() => setConfirm('Email was send successfully'))
      .catch((error) => {
        setErrors([error.message]), setConfirm('');
      })
      .finally(() => {
        setLoading(false);
        setEmail('');
      });
  };

  return (
    <div className="signIn">
      <div className="wrap">
        <h2>Recover Password</h2>
        {errors.length > 0 && errors.map((error, index) => <span key={index}>{error}</span>)}
        {confirm && <div>{confirm}</div>}

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

export default Reovery;
