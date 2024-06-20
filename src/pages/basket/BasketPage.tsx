import './BasketPage.css';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const BasketPage = () => {
  return (
    <div>
      <Header />
      <main className="login_page">
        <div className="user-profile_container basket_page_container">
          <h2>My Cart</h2>
          <Cart />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BasketPage;
