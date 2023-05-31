import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../store/reducers/userSlice';
import Message from '../components/Message';

type Props = {};

function LoginScreen({}: Props) {
  const [state, setState] = useState({ email: '', password: '' });
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
    const { email, password } = state;
    e.preventDefault();
    dispatch(login({ email, password }));
    console.log(state);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>

          {error && <Message variant='danger'>{error}</Message>}

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

        <Button type='submit' variant='primary' className='text-right'>
          Sing In
        </Button>

        <Row className='py-3 px-2 text-right'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register/redirect=${redirect}` : `/register`}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
