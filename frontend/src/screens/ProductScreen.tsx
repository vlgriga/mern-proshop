import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../store/reducers/productApiSlice';

function ProductScreen() {
  let { id } = useParams();
  const {
    data: productsDetails,
    isLoading,
    error,
  } = useGetProductDetailsQuery(id);

  if (!id || !productsDetails) return <h1>Not found</h1>;

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.toString()}</Message>
      ) : (
        <ProductCard product={productsDetails} />
      )}
    </>
  );
}

export default ProductScreen;
