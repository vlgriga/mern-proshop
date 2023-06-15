import React from 'react';
import Message from '../../components/Message';
import { ListGroup } from 'react-bootstrap';
import CartItem from '../../components/CartItem';
import { Link } from 'react-router-dom';
import { ICartProduct } from '../../store/reducers/types';

type Props = {
  itemsList: ICartProduct[];
};

const CartItemsList = ({ itemsList }: Props) => {
  return (
    <>
      <h1>Shopping Cart</h1>
      {itemsList.length === 0 ? (
        <Message variant='info'>
          Your cart is empty <Link to='/'>Go back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {itemsList.map((item) => (
            <CartItem item={item} />
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default CartItemsList;
