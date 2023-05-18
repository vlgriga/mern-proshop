import { Col, Row } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';
import { useLoaderData, useParams } from 'react-router-dom';

function HomeScreen() {

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
