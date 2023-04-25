import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendInterviewLink } from '../../actions/userActions';

const UserInterviewForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const { successMessage, errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendInterviewLink(name, email));
  };
      // {successMessage && <p>{successMessage}</p>}
            // {errorMessage && <p>{errorMessage}</p>}


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Send interview link</button>
      </form>
    </div>
  );
};

export default UserInterviewForm;
