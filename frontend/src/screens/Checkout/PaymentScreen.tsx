import { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import FormContainer from '../../components/FormContainer';
import { savePaymentMethod } from '../../store/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';

function PaymentScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState('paypal');

  const inputHandler = (e: any) => {
    setState(e.target.value);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(savePaymentMethod(state));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Payment methods</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col className='my-4'>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethod'
              value='paypal'
              checked
              onChange={inputHandler}
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
