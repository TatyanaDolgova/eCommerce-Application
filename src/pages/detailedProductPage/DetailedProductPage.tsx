import { useLocation } from 'react-router-dom';

import Header from '../../components/Header/Header';

const DetailedProductPage = () => {
  const data = useLocation();
  const productID = data.state as string;

  return (
    <>
      <Header />
      <div>{productID}</div>
    </>
  );
};

export default DetailedProductPage;
