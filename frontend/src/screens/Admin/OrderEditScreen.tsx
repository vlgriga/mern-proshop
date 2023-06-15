import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import Loader from 'components/Loader';
import OrderSummary from 'molecules/OrderPage/OrderSummary';
import PaymentMethod from 'molecules/OrderPage/PaymentMethod';
import Shipping from 'molecules/OrderPage/Shipping';
import OrderItems from 'molecules/OrderPage/OrderItems';
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
} from 'store/reducers/ordersApiSlice';

function OrderScreen() {
  let { id } = useParams();

  const { data: order, refetch } = useGetOrderByIdQuery(id);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  if (!order) return <Loader />;

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    taxPrice,
    shippingPrice,
    isPaid,
    isDelivered,
    user,
  } = order;

  const { address, city, postalCode, country } = shippingAddress;

  const deliverHandler = async () => {
    await deliverOrder(id);
    refetch();
  };

  return (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Shipping
                  isDelivered={isDelivered}
                  email={user.email}
                  name={user.name}
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
            totalPrice={totalPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
          />

          {!isDelivered && !loadingDeliver && (
            <Button className='mx-auto my-4' onClick={deliverHandler}>
              Mark As Delivered
            </Button>
          )}
          {loadingDeliver && <Loader />}
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
