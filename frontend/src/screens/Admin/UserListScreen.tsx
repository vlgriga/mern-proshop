import React from 'react';
import { Table, Button } from 'react-bootstrap';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../store/reducers/usersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

function UserListScreen() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { userInfo } = user;
  const { data: users = [], refetch } = useGetUsersQuery({
    token: userInfo?.token,
  });

  const [deleteUser] = useDeleteUserMutation();

  const removeHandler = async (id: number) => {
    if (window.confirm('Are you sure ?')) {
      try {
        await deleteUser({ userId: id, token: userInfo?.token });
        refetch();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!userInfo?.isAdmin) {
    navigate('/login');
  }

  return (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.isAdmin ? (
                <i className='fas fa-check' style={{ color: 'green' }}></i>
              ) : (
                <i className='fas fa-xmark' style={{ color: 'red' }}></i>
              )}
            </td>
            <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-edit'></i>
                </Button>
              </LinkContainer>
              <Button
                onClick={() => removeHandler(user._id)}
                variant='danger'
                className='btn-sm'
              >
                <i className='fas fa-trash'></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserListScreen;
