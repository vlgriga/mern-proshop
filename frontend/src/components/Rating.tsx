import React from 'react';

type Props = {
  rating: number;
  numReviews: number;
};

function Rating({ rating, numReviews }: Props) {
  return (
    <div className='my-3'>
      <i className='fas fa-star' style={{ color: '#f8e825' }}></i>
      {rating} from {numReviews} reviews
    </div>
  );
}

export default Rating;
