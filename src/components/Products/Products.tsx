import React, { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchProductsApi } from '../../redux/products/prouctsThunk';
import OneProduct from './OneProduct/OneProduct';
import './Products.scss';

const Products = () => {
  const { products, loading, productsError } = useProducts();
  const dispatch = useAppDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, []);

  if (productsError) return <h2>{productsError}</h2>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="productsContainer">
      <h1>Browse products</h1>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => <OneProduct product={product} key={product.uid} />)
        ) : (
          <div>No products</div>
        )}
      </div>
    </div>
  );
};

export default Products;
