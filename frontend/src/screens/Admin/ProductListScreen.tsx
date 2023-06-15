import { LinkContainer } from 'react-router-bootstrap';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../store/reducers/productApiSlice';
import { Col, Row, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/Loader';

type Props = {};

function ProductListScreen({}: Props) {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { userInfo } = user;

  const {
    data: productList,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    token: userInfo?.token,
  });

  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();

  const createProductHandler = async () => {
    const newProduct = (await createProduct({ token: userInfo?.token })) as any;
    navigate(`/admin/product/${newProduct.data._id}/edit`);
  };

  const removeHandler = async (id: number) => {
    if (window.confirm('Are you sure ?')) {
      try {
        await deleteProduct({ productId: id, token: userInfo?.token });
        refetch();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!userInfo?.isAdmin) {
    navigate('/login');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product: any) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>

              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  onClick={() => removeHandler(product._id)}
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
    </>
  );
}

export default ProductListScreen;
