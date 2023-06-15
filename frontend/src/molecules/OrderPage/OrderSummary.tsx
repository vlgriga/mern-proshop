import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';

type Props = {
  totalPrice: number;
  shippingPrice: number;
  taxPrice: number;
  onSubmit?: (details: any) => void;
  clientId?: string;
};

function OrderSummary(props: Props) {
  const { totalPrice, shippingPrice, taxPrice, clientId, onSubmit } = props;

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h3>Order Summary</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${totalPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${shippingPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>${taxPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          {clientId && (
            <PayPalButton
              amount={totalPrice}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={onSubmit}
              options={{ clientId }}
            />
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default OrderSummary;
