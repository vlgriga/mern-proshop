import React from 'react';
import Message from '../../components/Message';

type Props = {
  isPaid: boolean;
  paymentMethod: string;
};

function PaymentMethod(props: Props) {
  const { paymentMethod, isPaid } = props;
  
  return (
    <>
      <h2>Payment Method</h2>
      <p>
        <strong>Method:</strong> {paymentMethod}
      </p>
      {isPaid ? (
        <Message variant='success'>The order is paid</Message>
      ) : (
        <Message variant='danger'>The order is not paid</Message>
      )}
    </>
  );
}

export default PaymentMethod;
