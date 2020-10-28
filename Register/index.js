import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import axios from '../../services/axios';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import history from '../../services/history';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if(name.length < 3 || name.length > 20) {
      formErrors = true;
      toast.error('The name must be between 3 and 20 characters');
    }

    if(password.length < 6 || password.length > 20) {
      formErrors = true;
      toast.error('The password must be between 3 and 20 characters');
    }

    if(!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid E-mail');
    }

    if(formErrors) return;

    try {
      await axios.post('/users/', {
        name,
        password,
        email,
      });
      toast.success('successfully registered');
      history.push('/');
    } catch(err) {
      //const status = get(e, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      errors.map(error => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Create my count</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="name">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu E-mail"
          />
        </label>

        <label htmlFor="name">
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Create my count</button>
      </Form>
    </Container>
  );
}

export default Register;
