import { Cart, Image, Product, ProductData } from '@commercetools/platform-sdk';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './DetailedProductPage.css';

import BaseButton from '../../components/Button/Button';
import { ProductSlider } from '../../components/DetailedProduct/ProductSlider';
import { SingleImage } from '../../components/DetailedProduct/SingleImage';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinners/Spinner-category';
import CardRepository from '../../services/CardRepository';
import ProductRepository from '../../services/ProductRepository';

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
      console.error('Error fetching product:', error);
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

      const productState = await cartRepository.findProduct(productID);

      setLineItemID(productState);
      if (productState) {
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

    if (!cartRepository) {
      throw new Error('CartRepository is not defined');
    }

    const currentCartID = await getCartId(cartRepository);

    await cartRepository.addToCart(currentCartID, productID);
    setProductState(true);
  };

  const removeProduct = async () => {
    const cartRepository = props.cartRepository;

    if (!cartRepository) {
      throw new Error('CartRepository is not defined');
    }

    await getCartId(cartRepository);

    await cartRepository.removeFromCart(lineItemID);
    setLineItemID('');
    setProductState(false);
  };

  const ShowCartOptions = () => {
    if (!isProductInCart) {
      return (
        <BaseButton
          classes="button control_product_button"
          text="Add to cart"
          type="button"
          callback={addProduct}
        />
      );
    } else {
      return (
        <BaseButton
          classes="button control_product_button"
          text="Remove from cart"
          type="button"
          callback={removeProduct}
        />
      );
    }
  };

  const setPrice = (price = 0) => {
    return Math.floor(price / 100);
  };

  const ShowDiscountPrice = () => {
    if (isDiscounted) {
      return (
        <div className="disc_price_wrapper">
          <p className="disc_price">Sale price:</p>
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
                  <p className="full_price">Full price:</p>
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
