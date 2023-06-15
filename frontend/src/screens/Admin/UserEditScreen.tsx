import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../store/reducers/usersApiSlice';
import { useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Form, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useEffect, useState } from 'react';

type Props = {};

const UserEditScreen = (props: Props) => {
  let { id: userId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { userInfo } = user;

  const [state, setState] = useState({
    name: '',
    email: '',
    isAdmin: false,
  });

  const [updateUser] = useUpdateUserMutation();
  const { data, refetch } = useGetUserByIdQuery({
    token: userInfo?.token,
    id: userId,
  });

  const inputHandler = (e: any) => {
    if (e.target.id === 'isAdmin') {
      setState({ ...state, [e.target.id]: e.target.checked });
    } else {
      setState({ ...state, [e.target.id]: e.target.value });
    }
  };

  useEffect(() => {
    if (data) {
      const { name, email, isAdmin } = data;
      setState({ name, email, isAdmin });
    }
  }, [data]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { name, email, isAdmin } = state;
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
        token: userInfo?.token,
      });
      refetch();
      navigate('/admin/userList');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormContainer>
      <h1>Edit Profile</h1>
      {/* {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {error && <Message variant='danger'>{error}</Message>} */}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
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

        <Form.Group controlId='isAdmin' className='my-4'>
          <Form.Check
            type='checkbox'
            label='Is Admin'
            checked={state.isAdmin}
            onChange={inputHandler}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='text-right'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserEditScreen;
