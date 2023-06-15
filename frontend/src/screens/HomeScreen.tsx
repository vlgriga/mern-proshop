import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../store/reducers/productApiSlice';

function HomeScreen() {
  const { data: list = [], isLoading, error } = useGetProductsQuery({});

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.toString()}</Message>
        ) : (
          list.map((product: any) => (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default HomeScreen;
