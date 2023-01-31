import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCategories from '../../hooks/useCategory';
import useProducts from '../../hooks/useProducts';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchCategoriesApi } from '../../redux/categories/categoriesThunk';
import { fetchProductsApi } from '../../redux/products/productsThunk';
import FormSelect from '../Forms/FormSelect/FormSelect';
import OneProduct from './OneProduct/OneProduct';
import './Products.scss';

const Products = () => {
  const navigate = useNavigate();
  const { filter } = useParams();
  const [filterValue, setFilterValeu] = useState('');
  const { products, loading, productsError } = useProducts();
  const dispatch = useAppDispatch();
  const { categories } = useCategories();

  useEffect(() => {
    dispatch(fetchProductsApi(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(fetchCategoriesApi());
  }, []);

  useEffect(() => {
    if (filterValue) {
      navigate(`/search/${filterValue}`);
    } else {
      navigate('/search');
    }
  }, [filterValue]);

  if (productsError) return <h2>{productsError}</h2>;

  return (
    <div className="productsContainer">
      <h1>Browse products</h1>
      <FormSelect
        options={categories}
        name="All"
        value={filterValue}
        onChange={(e) => setFilterValeu(e.target.value)}
      />
      {!loading ? (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => <OneProduct product={product} key={product.uid} />)
          ) : (
            <div>No products</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Products;
