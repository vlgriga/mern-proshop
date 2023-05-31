import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { IProduct } from '../store/reducers/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/reducers/cartSlice';

type Props = {
  product: IProduct;
};

const ProductCard = ({ product }: Props) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCount = (e: any) => {
    setCount(e.target.value);
  };

  const onAddToCart = () => {
    console.log(count);
    const cartProduct = { ...product, qty: Number(count) };
    dispatch(addToCart({ product: cartProduct }));
    navigate(`/cart`);
  };

  return (
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>

          <ListGroup.Item>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </ListGroup.Item>

          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

          <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>

            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control
                      as='select'
                      value={count}
                      onChange={handleCount}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item className='d-grid'>
              <Button
                type='button'
                disabled={product.countInStock === 0}
                onClick={onAddToCart}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCard;
