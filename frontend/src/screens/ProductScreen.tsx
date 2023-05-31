import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProductDetails } from '../store/reducers/productDetailsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen() {
  let { id } = useParams();
  const dispath = useAppDispatch();
  const productsDetails = useAppSelector((state) => state.productDetails);
  const { product, loading, error } = productsDetails;

  useEffect(() => {
    id && dispath(fetchProductDetails(id));
  }, [dispath, id]);

  if (!product) return <h1>Not found</h1>;

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ProductCard product={product} />
      )}
    </>
  );
}

export default ProductScreen;
