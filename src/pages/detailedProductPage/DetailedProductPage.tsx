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
  const [isProductInCart, setProductState] = useState<boolean>(true);
  const [productData, setProduct] = useState<ProductData>();

  const [images, setImages] = useState(defaultImages);

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
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [productID, props.productRepository]);

  useEffect(() => {
    void fetchProduct();
  }, [fetchProduct]);

  const ShowImage = () => {
    if (images.length > 1) {
      return <ProductSlider slides={images}></ProductSlider>;
    } else if (images.length === 1) {
      return <SingleImage imageData={images[0]} />;
    } else {
      return null;
    }
  };

  const setPrice = (price = 0) => {
    return Math.floor(price / 100);
  };

  const checkCard = useCallback(async () => {
    const cartRepository = props.cartRepository;

    if (!cartRepository) {
      throw new Error('CartRepository is not defined');
    }

    try {
      const responce: Cart = await cartRepository.checkActiveCard();

      setCartId(responce.id);

      const productState = await cartRepository.checkProduct(productID);

      setProductState(productState);
    } catch (getActiveCartError) {
      console.error('No active cart exists.', getActiveCartError);

      try {
        const cart: Cart = await cartRepository.createCart();

        setCartId(cart.id);
        setProductState(false);
      } catch (createCartError) {
        console.error('Cart has not been created.', createCartError);
      }
    }
  }, [props.cartRepository, productID]);

  useEffect(() => {
    void checkCard();
  }, [checkCard]);

  const addProduct = async () => {
    const cartRepository = props.cartRepository;

    if (cartRepository && cartID) {
      await cartRepository.addToCart(cartID, productID);
      setProductState(true);
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
                <div className="full_price_wrapper">
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
                <div className="disc_price_wrapper">
                  <p className="disc_price">Sale price:</p>
                  <p className="disc_price">
                    {setPrice(
                      productData.masterVariant.prices?.[0]?.discounted?.value
                        .centAmount,
                    )}
                  </p>
                  <p className="currency">
                    {productData.masterVariant.prices?.[0]?.value?.currencyCode}
                  </p>
                </div>
              </div>
              <BaseButton
                classes="button add_product_button"
                text="Add to cart"
                type="button"
                callback={addProduct}
                disabled={isProductInCart}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default DetailedProductPage;
