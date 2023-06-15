import { ListGroup, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

type Props = {
  orderItems: any;
  totalPrice: number;
};

const OrderItems = (props: Props) => {
  const { orderItems, totalPrice } = props;

  return (
    <>
      <h2>Order Items</h2>
      {orderItems.length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <ListGroup variant='flush'>
          {orderItems.map((item: any) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={1}>
                  <Image src={item.image} alt={item.name} fluid rounded />
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
    </>
  );
};

export default OrderItems;
