import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { IProduct } from '../store/reducers/types';

type Props = {
  product: IProduct;
};

function Product({ product }: Props) {
  return (
    <Card className='my-3 p3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
