import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import Breadcrumbs from '../../components/Catalog/Breadcrumbs/Breadcrumbs';
import CategorySidebar from '../../components/Catalog/CategorySidebar/CategorySidebar';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import Header from '../../components/Header/Header';
import ProductRepository from '../../services/ProductRepository';

import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductProjection[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');

  async function fetchProducts() {
    try {
      const productRepository = new ProductRepository();
      const productsResponse = await productRepository.getProducts();

      setProducts(productsResponse);
      setSortedProducts(productsResponse);
      setBreadcrumbs([]);
      setCurrentCategory('');
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  const updateBreadcrumbs = async (category: Category) => {
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
      throw new Error('Error updating breadcrumbs');
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const handleCategorySelect = async (
    categoryId: string,
    isParent: boolean,
  ) => {
    try {
      const productRepository = new ProductRepository();

      if (!isParent) {
        const productsResponse =
          await productRepository.getProductsByCategory(categoryId);

        setProducts(productsResponse);
        setSortedProducts(productsResponse);

        const category = await productRepository.getCategoryById(categoryId);

        await updateBreadcrumbs(category);
      } else {
        const categoryResponse =
          await productRepository.getAllSubcategories(categoryId);
        const productsPromises = categoryResponse.map((item) =>
          productRepository.getProductsByCategory(item.id),
        );

        const allProducts = await Promise.all(productsPromises);
        const combinedProducts = allProducts.flat();

        setProducts(combinedProducts);
        setSortedProducts(combinedProducts);

        const category = await productRepository.getCategoryById(categoryId);

        await updateBreadcrumbs(category);
      }
    } catch (error) {
      throw new Error('Error fetching products for category');
    }
  };

  return (
    <>
      <Header />
      <div className="catalog-page">
        <CategorySidebar
          onCategorySelect={handleCategorySelect}
          onFetchCategories={fetchProducts}
        />
        <div className="main-content">
          <Breadcrumbs
            breadcrumbs={breadcrumbs}
            onCategorySelect={handleCategorySelect}
            onFetchCategories={fetchProducts}
          />
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
