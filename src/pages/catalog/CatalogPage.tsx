import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useContext, useEffect, useState } from 'react';

import { UserContext, UserData } from '../../app-context/UserContext';
import Breadcrumbs from '../../components/Catalog/Breadcrumbs/Breadcrumbs';
import CategorySidebar from '../../components/Catalog/CategorySidebar/CategorySidebar';
import Filters from '../../components/Catalog/Filters/Filters';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import Search from '../../components/Catalog/Search/Search';
import SortingSelect from '../../components/Catalog/SortingSelect/SortingSelect';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinners/Spinner-category';
import { cartRepository } from '../../services/CardRepository';
import ProductRepository from '../../services/ProductRepository';

import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [sortedProducts, setSortedProducts] = useState<ProductProjection[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<string>('name.en-US asc');
  const [searhcQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [size, setSize] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState<number>(6);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const userContextState = useContext(UserContext);
  const { updateState } = useContext(UserContext);

  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth > 1610) {
        setProductsPerPage(8);
      } else {
        setProductsPerPage(6);
      }
    };

    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);

    return () => {
      window.removeEventListener('resize', updateProductsPerPage);
    };
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const productRepository = new ProductRepository();
      const productsResponse = await productRepository.getProducts(
        sortMethod,
        searhcQuery,
        minPrice,
        maxPrice,
        size,
        productsPerPage,
        currentCategory,
        page,
      );

      setLoading(false);
      setProducts(productsResponse.results);
      setSortedProducts(productsResponse.results);
      setTotalPages(productsResponse.totalPages);
      setSearchError(null);

      if (productsResponse.results.length === 0) {
        setSearchError('Nothing found');
      }
    } catch (error) {
      setSearchError('Error fetching products');
    }
  }

  async function fetchCart() {
    try {
      const activeCart = await cartRepository.checkActiveCard();
      const cartItems = activeCart.lineItems.map((item) => item.productId);

      setCart(cartItems);
      setCartId(activeCart.id);
    } catch (error) {
      console.error('Error ');
    }
  }

  useEffect(() => {
    void fetchCart();
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [
    sortMethod,
    currentCategory,
    searhcQuery,
    maxPrice,
    minPrice,
    size,
    page,
    productsPerPage,
  ]);

  const updateBreadcrumbs = async (category: Category | null) => {
    if (category) {
      const newBreadcrumb = { id: category.id, name: category.name['en-US'] };

      try {
        if (category.parent) {
          const productRepository = new ProductRepository();
          const productsResponse = await productRepository.getCategoryById(
            category.parent.id,
          );

          setBreadcrumbs(() => {
            return [
              { id: productsResponse.id, name: productsResponse.name['en-US'] },
              newBreadcrumb,
            ];
          });
        } else {
          setBreadcrumbs(() => {
            return [newBreadcrumb];
          });
        }
      } catch (error) {
        console.error('Error updating breadcrumbs');
      }
    } else {
      setBreadcrumbs(() => {
        return [];
      });
    }
  };

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const productRepository = new ProductRepository();

      setCurrentCategory(categoryId);
      setSearchQuery('');
      setPage(1);
      setSearchError(null);

      if (categoryId) {
        const category = await productRepository.getCategoryById(categoryId);

        await updateBreadcrumbs(category);
      } else {
        await updateBreadcrumbs(null);
      }
    } catch (error) {
      console.error('Error fetching products for category');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (method: string) => {
    setSortMethod(method);
  };

  const handlePriceChange = (minPriceArg: number, maxPriceArg: number) => {
    setMinPrice(minPriceArg);
    setMaxPrice(maxPriceArg);
  };

  const handleSizeChange = (sizeArg: string) => {
    setSize(sizeArg);
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(100);
    setSize('');
  };

  const handleAddToCart = async (productId: string) => {
    setIsAddingToCart(true);
    try {
      let newCartId = cartId;

      if (!newCartId) {
        const newCart = await cartRepository.createCart();

        newCartId = newCart.id;

        setCartId(newCartId);
      }

      if (newCartId) await cartRepository.addToCart(newCartId, productId);

      const userData: UserData = {
        loginStatus: userContextState.user.loginStatus,
        productCounter: userContextState.user.productCounter + 1,
      };

      updateState({ user: userData });

      setCart([...cart, productId]);
    } catch {
      console.error('Error adding to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Header />
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onCategorySelect={handleCategorySelect}
        onFetchCategories={fetchProducts}
      />
      <div className="catalog-page">
        <CategorySidebar
          onCategorySelect={handleCategorySelect}
          currentCategory={currentCategory}
        />
        <div className="main-content">
          <div className="settings-container">
            <Search onSearch={handleSearch} currentCategory={currentCategory} />
            <SortingSelect
              sortMethod={sortMethod}
              onSortChange={handleSortChange}
            />

            <Filters
              onPriceChange={handlePriceChange}
              onResetFilters={handleResetFilters}
              onSizeChange={handleSizeChange}
            />
          </div>
          {loading ? (
            <Spinner />
          ) : searchError ? (
            <div className="search-error">{searchError}</div>
          ) : (
            <ProductList
              products={products}
              onAddToCart={handleAddToCart}
              cart={cart}
              isAddingToCart={isAddingToCart}
            />
          )}
          <div className="pagination">
            {Array.from({ length: totalPages }, (i, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${page === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatalogPage;
