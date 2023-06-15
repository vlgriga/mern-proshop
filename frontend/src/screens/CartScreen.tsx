import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../hooks';
import CartItemsList from '../molecules/CartPage/CartItemsList';
import SubtotalCard from '../molecules/CartPage/SubtotalCard';

const CartScreen = () => {
  const cartItemsList = useAppSelector((state) => state.cart.list);

  return (
    <Row>
      <Col md={8}>
        <CartItemsList itemsList={cartItemsList} />
      </Col>

      <Col md={4}>
        <SubtotalCard itemsList={cartItemsList} />
      </Col>
    </Row>
  );
};

export default CartScreen;
