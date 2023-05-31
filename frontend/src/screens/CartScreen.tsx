import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const navigate = useNavigate();
  const cartItemsList = useAppSelector((state) => state.cartItems.list);

  const onCheckout = () => {
    navigate('/login?redirect=checkout');
  };

  console.log(cartItemsList);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItemsList.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItemsList.map((item) => (
              <CartItem item={item} />
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItemsList.length}) items</h2>$
              {cartItemsList
                .reduce((total, item) => total + item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' onClick={onCheckout}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
