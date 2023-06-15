import Message from '../../components/Message';

type Props = {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode: string;
  isDelivered: boolean;
};

function Shipping(props: Props) {
  const { name, email, address, city, country, postalCode, isDelivered } =
    props;

  return (
    <>
      <h2>Shipping</h2>
      <strong>Name: </strong>
      {name} <strong>{email}</strong>
      <p>
        <strong>Address:</strong> {address}, {city} {postalCode}, {country}
      </p>
      {isDelivered ? (
        <Message variant='success'>The order is delivered</Message>
      ) : (
        <Message variant='danger'>Not delivered</Message>
      )}
    </>
  );
}

export default Shipping;
