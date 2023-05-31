import { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateProfileDetails } from '../store/reducers/userSlice';
import Message from '../components/Message';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { userInfo, error } = user;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [state, setState] = useState({
    name: (userInfo && userInfo.name) || '',
    email: (userInfo && userInfo.email) || '',
    password: '',
    confirmPassword: '',
  });

  const inputHandler = (e: any) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = state;
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
    } else {
      dispatch(
        updateProfileDetails({ name, email, password, token: userInfo?.token })
      );
      setSuccessMessage('Profile Updated');
      setErrorMessage('');
    }
    console.log(state);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    }
  });

  return (
    <Row>
      <Col md={3}>
        <h1>User profile</h1>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {successMessage && (
          <Message variant='success'>{successMessage}</Message>
        )}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My orders</h1>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
