import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../store/reducers/ordersApiSlice';
import { useAppSelector } from '../../hooks';

function OrderListScreen() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { userInfo } = user;

  const { data: orderList, isLoading, refetch } = useGetOrdersQuery({});

  if (!userInfo?.isAdmin) {
    navigate('/login');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order: any) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}$</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/order/${order._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
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

export default OrderListScreen;
