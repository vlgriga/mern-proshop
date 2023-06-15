import { useEffect } from 'react';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Message from '../../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../store/reducers/orderSlice';

function PlaceOrderScreen() {
  const cart = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.user);
  const { orderItem } = useAppSelector((state) => state.order);
  const { shippingAddress, paymentMethod, list } = cart;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemsPrice = list.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = Number(itemsPrice > 100 ? 0 : 100).toFixed(2);
  const taxPrice = Number(0.15 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const onCreateOrder = () => {
    dispatch(
      createOrder({
        orderItems: list,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        token: userInfo?.token,
      })
    );

    navigate(`/order/${orderItem._id}`);
  };

  useEffect(() => {
    // if (orderItem) navigate(`/order/${orderItem._id}`); TODO
  }, [navigate, orderItem]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shippingAddress.address},{' '}
                {shippingAddress.city} {shippingAddress.city},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong> {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {list.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {list.map((item, index) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${totalPrice}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={onCreateOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
