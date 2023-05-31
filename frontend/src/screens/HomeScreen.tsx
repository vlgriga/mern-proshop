import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProductList } from '../store/reducers/productListSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomeScreen() {
  const dispath = useAppDispatch();
  const products = useAppSelector((state) => state.productList);
  const { list, loading, error } = products;

  useEffect(() => {
    dispath(fetchProductList());
  }, [dispath]);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          list.map((product) => (
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
