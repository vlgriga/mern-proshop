import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { addToCart, removeFromCart } from '../store/reducers/cartSlice';
import { ICartProduct } from '../store/reducers/types';

type Props = {
  item: ICartProduct;
};

const CartItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const onSetItemsQty = (e: any) => {
    const product = { ...item, qty: Number(e.target.value) };
    dispatch(addToCart({ product }));
  };

  const onRemove = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={2}>${item.price}</Col>
        <Col md={2}>
          <Form.Control as='select' value={item.qty} onChange={onSetItemsQty}>
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button type='button' variant='light' onClick={onRemove}>
            <i className='fas fa-trash'></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
