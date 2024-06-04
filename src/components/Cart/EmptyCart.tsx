import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div>
      <p>Your cart is empty</p>
      <p>
        {' '}
        Go to
        <Link to="/catalog" className="login-link">
          Catalog
        </Link>{' '}
        ?
      </p>
    </div>
  );
};

export default EmptyCart;
