import { Cart, Image, Product, ProductData } from '@commercetools/platform-sdk';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './DetailedProductPage.css';

import { UserContext, UserData } from '../../app-context/UserContext';
import BaseButton from '../../components/Button/Button';
import { ProductSlider } from '../../components/DetailedProduct/ProductSlider';
import { SingleImage } from '../../components/DetailedProduct/SingleImage';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinners/Spinner-category';
import CardRepository from '../../services/CardRepository';
import ProductRepository from '../../services/ProductRepository';
import { serverErrorMessages } from '../../utils/ErrorHandler';
import showToast from '../../utils/notifications';

interface DetailedProductPageProps {
  cartRepository?: CardRepository;
  productRepository: ProductRepository;
}

const DetailedProductPage = (props: DetailedProductPageProps) => {
  const data = useLocation();
  const productID = data.state as string;
  const defaultImages: Image[] = [];
  const [cartID, setCartId] = useState<string | null>(null);
  const [isProductInCart, setProductState] = useState<boolean>(false);
  const [lineItemID, setLineItemID] = useState<string>('');
  const [productData, setProduct] = useState<ProductData>();
  const [loading, setLoading] = useState<boolean>(false);
  const userState = useContext(UserContext);
  const { updateState } = useContext(UserContext);

  const [images, setImages] = useState(defaultImages);
  const [isDiscounted, setDiscount] = useState<boolean>(false);

  const fetchProduct = useCallback(async () => {
    try {
      const productRepository = props.productRepository;

      const resp: Product | undefined =
        await productRepository.getProduct(productID);

      if (resp && resp.masterData.current) {
        const tempProductData = resp.masterData.current;

        setProduct(tempProductData);

        if (tempProductData && tempProductData.masterVariant.images) {
          setImages(tempProductData.masterVariant.images);
        }

        if (
          tempProductData &&
          tempProductData.masterVariant.prices?.[0]?.discounted
        ) {
          setDiscount(true);
        }
      }
    } catch (error) {
      showToast(serverErrorMessages.fetchingProductError.userMessage, true);
    }
  }, [productID, props.productRepository]);

  useEffect(() => {
    void fetchProduct();
  }, [fetchProduct]);

  const checkCart = useCallback(async () => {
    const cartRepository = props.cartRepository;

    if (!cartRepository) {
      throw new Error('CartRepository is not defined');
    }

    try {
      const responce: Cart = await cartRepository.checkActiveCard();

      setCartId(responce.id);

      const id = await cartRepository.findProduct(productID);

      if (id) {
        setLineItemID(id);
        setProductState(true);
      } else {
        setProductState(false);
      }
    } catch (getActiveCartError) {
      setProductState(false);
    }
  }, [props.cartRepository, productID]);

  useEffect(() => {
    void checkCart();
  }, [checkCart]);

  const getCartId = async (cartRepository: CardRepository): Promise<string> => {
    if (!cartID) {
      const cart: Cart = await cartRepository.createCart();

      setCartId(cart.id);
      setProductState(false);

      return cart.id;
    } else {
      return cartID;
    }
  };

  const addProduct = async () => {
    const cartRepository = props.cartRepository;

    setLoading(true);

    if (!cartRepository) {
      throw new Error('CartRepository is not defined');
    }

    const currentCartID = await getCartId(cartRepository);

    try {
      const cart = await cartRepository.addToCart(currentCartID, productID);

      const quantity = cart.lineItems.length;

      showToast('Great choice! Product is in the cart.', false);

      if (userState.user) {
        const userData: UserData = {
          loginStatus: userState.user?.loginStatus,
          productCounter: quantity,
        };

        updateState({ user: userData });
      }

      try {
        const id = await cartRepository.findProduct(productID);

        setLineItemID(id);
        setLoading(false);

        setProductState(true);
      } catch {
        showToast('Great choice! Product is in the cart.', false);
      }
    } catch {
      showToast(serverErrorMessages.addToCartError.userMessage, true);
      setLoading(false);
    }
  };

  const removeProduct = async () => {
    const cartRepository = props.cartRepository;

    setLoading(true);

    if (!cartRepository) {
      throw new Error('CartRepository is not defined');
    }

    await getCartId(cartRepository);

    try {
      const cart = await cartRepository.removeFromCart(lineItemID);
      const quantity = cart.lineItems.length;

      setProductState(false);
      setLoading(false);
      showToast('The item has been removed from the cart.', false);

      if (userState.user) {
        const userData: UserData = {
          loginStatus: userState.user?.loginStatus,
          productCounter: quantity,
        };

        updateState({ user: userData });
      }
    } catch {
      showToast(serverErrorMessages.removeFromCartError.userMessage, true);
      setLoading(false);
    }
  };

  const ShowCartOptions = () => {
    if (!isProductInCart) {
      return (
        <BaseButton
          classes="button control_product_button"
          text="Add to cart"
          type="button"
          callback={addProduct}
          disabled={loading}
        />
      );
    } else {
      return (
        <BaseButton
          classes="button control_product_button"
          text="Remove from cart"
          type="button"
          callback={removeProduct}
          disabled={loading}
        />
      );
    }
  };

  const setPrice = (price = 0) => {
    return (price / 100).toFixed(2);
  };

  const ShowDiscountPrice = () => {
    if (isDiscounted) {
      return (
        <div className="disc_price_wrapper">
          <p className="disc_price">
            {setPrice(
              productData?.masterVariant.prices?.[0]?.discounted?.value
                .centAmount,
            )}
          </p>
          <p className="currency">
            {productData?.masterVariant.prices?.[0]?.value?.currencyCode}
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  const ShowImage = () => {
    if (images.length > 1) {
      return <ProductSlider slides={images}></ProductSlider>;
    } else if (images.length === 1) {
      return <SingleImage imageData={images[0]} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Header />
      <main className="detail_product_page">
        {!productData ? (
          <Spinner />
        ) : (
          <div className="detail_product_wrapper">
            <ShowImage />
            <div className="detail_product_info">
              <NavLink to="/catalog" className="catalog_link">
                &larr; Back to catalog
              </NavLink>
              <h1 className="detail_product_header">
                {productData.name['en-US']}
              </h1>
              <div className="detail_product_description">
                {productData.metaDescription?.['en-US']}
              </div>
              <div className="detail_price_wrapper">
                <div
                  className={
                    isDiscounted
                      ? 'full_price_wrapper crossed'
                      : 'full_price_wrapper'
                  }
                >
                  <p className="full_price">
                    {setPrice(
                      productData.masterVariant.prices?.[0]?.value?.centAmount,
                    )}
                  </p>
                  <p className="currency">
                    {productData.masterVariant.prices?.[0]?.value?.currencyCode}
                  </p>
                </div>
                <ShowDiscountPrice />
              </div>
              <ShowCartOptions />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default DetailedProductPage;
