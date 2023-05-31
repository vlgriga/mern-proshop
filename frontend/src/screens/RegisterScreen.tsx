import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { register } from '../store/reducers/userSlice';
import Message from '../components/Message';

function RegisterScreen() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { userInfo, error } = user;

  const inputHandler = (e: any) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = state;
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
    console.log(state);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {error && <Message variant='danger'>{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={state.name}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='email' className='my-4'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={state.email}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={state.password}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-4'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={state.confirmPassword}
            onChange={inputHandler}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='text-right'>
          Register
        </Button>

        <Row className='py-3 px-2 text-right'>
          <Col className='text-right'>
            Have an account?{' '}
            <Link to={redirect ? `/login/redirect=${redirect}` : `/login`}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default RegisterScreen;
