import { useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Form, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useEffect, useState } from 'react';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../store/reducers/productApiSlice';

type Props = {};

const ProductEditScreen = (props: Props) => {
  let { id: productId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    countInStock: 0,
  });

  const [updateProduct] = useUpdateProductMutation();
  const { data, refetch } = useGetProductDetailsQuery(productId);

  const inputHandler = (e: any) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (data) {
      setState({ ...data });
    }
  }, [data]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(state);
    try {
      await updateProduct({
        ...state,
        productId,
      });
      refetch();
      navigate('/admin/productList');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormContainer>
      <h1>Edit Product</h1>
      {/* {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {error && <Message variant='danger'>{error}</Message>} */}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={state.name}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='price' className='my-4'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='price'
            placeholder='Enter price'
            value={state.price}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='countInStock' className='my-4'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type='countInStock'
            placeholder='Enter count in stock'
            value={state.countInStock}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='brand' className='my-4'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='brand'
            placeholder='Enter brand'
            value={state.brand}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='category' className='my-4'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='category'
            placeholder='Enter category'
            value={state.category}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group controlId='description' className='my-4'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='description'
            placeholder='Enter description'
            value={state.description}
            onChange={inputHandler}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='text-right'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductEditScreen;
