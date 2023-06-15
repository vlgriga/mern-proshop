import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormContainer from '../../components/FormContainer';
import { IShippingAddress } from '../../store/reducers/types';
import { saveShippingAddress } from '../../store/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';

function ShippingScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [state, setState] = useState<IShippingAddress>({ ...shippingAddress });
  const inputHandler = (e: any) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ ...state }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-4'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={state.address}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='city' className='my-4'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={state.city}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-4'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={state.postalCode}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='country' className='my-4'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={state.country}
            onChange={inputHandler}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
