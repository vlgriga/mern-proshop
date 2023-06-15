import { Card, ListGroup, Button } from 'react-bootstrap';
import { ICartProduct } from '../../store/reducers/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  itemsList: ICartProduct[];
};

function SubtotalCard({ itemsList }: Props) {
  const navigate = useNavigate();

  const onCheckout = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Subtotal ({itemsList.length}) items</h2>$
          {itemsList.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button type='button' className='btn-block' onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default SubtotalCard;
