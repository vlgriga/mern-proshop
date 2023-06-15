import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById, payOrder } from '../store/reducers/orderSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';
import OrderSummary from '../molecules/OrderPage/OrderSummary';
import PaymentMethod from '../molecules/OrderPage/PaymentMethod';
import Shipping from '../molecules/OrderPage/Shipping';
import OrderItems from '../molecules/OrderPage/OrderItems';

function OrderScreen() {
  let { id } = useParams();
  const dispath = useAppDispatch();
  const { orderItem } = useAppSelector((state) => state.order);
  const { userInfo } = useAppSelector((state) => state.user);

  const [clientId, setClientId] = useState<string>('');

  const getClientId = async () => {
    const { data } = await axios.get('/api/config/paypal');
    setClientId(data);
  };

  useEffect(() => {
    if (!orderItem) {
      id && dispath(getOrderById({ id, token: userInfo?.token }));
    }

    getClientId();
  }, [dispath, id, orderItem, userInfo?.token]);

  const onSuccessHandler = (details: any) => {
    const params = { orderId: orderItem._id, paymentResult: details };
    dispath(payOrder({ params, token: userInfo?.token }));
  };

  if (!orderItem) return <Loader />;

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    taxPrice,
    shippingPrice,
    isPaid,
    isDelivered,
  } = orderItem;

  const { address, city, postalCode, country } = shippingAddress;

  return (
    <>
      <h1>Order {orderItem._id}</h1>
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Shipping
                  isDelivered={isDelivered}
                  email={userInfo?.email}
                  name={userInfo?.name}
                  address={address}
                  city={city}
                  postalCode={postalCode}
                  country={country}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <PaymentMethod isPaid={isPaid} paymentMethod={paymentMethod} />
              </ListGroup.Item>

              <ListGroup.Item>
                <OrderItems totalPrice={totalPrice} orderItems={orderItems} />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <OrderSummary
            clientId={clientId}
            totalPrice={totalPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            onSubmit={onSuccessHandler}
          />
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
