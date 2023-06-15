import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getOrdersList } from '../store/reducers/orderSlice';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function OrdersTable(props: any) {
  const { token } = props;
  const dispatch = useAppDispatch();
  const myOrders = useAppSelector((state) => state.order.ordersList);

  useEffect(() => {
    dispatch(getOrdersList(token));
  }, [dispatch, token]);

  console.log(myOrders);

  if (myOrders && myOrders.length < 1) return <h1>Loading</h1>;

  return (
    <>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order: any) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button className='btn-sm' variant='light'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default OrdersTable;
