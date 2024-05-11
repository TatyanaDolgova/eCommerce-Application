import './NotFoundPage.css';

import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="container">
        <h1 className="not-fount-title">404 - Not Found</h1>
        <p className="not-found-text">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="not-found-link">
          Go to Home
        </Link>
        <div className="not-found-image"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
