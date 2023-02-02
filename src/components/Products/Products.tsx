import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
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
  const [paginateArray, satePaginateArray] = useState<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);
  const [page, satePage] = useState(1);
  const { products, loading, productsError, paginateNext } = useProducts();
  const dispatch = useAppDispatch();
  const { categories } = useCategories();

  useEffect(() => {
    dispatch(fetchProductsApi({ pagNext: null, categoryUid: filterValue }));
    satePage(1);
    satePaginateArray([null]);
  }, [filterValue]);

  useEffect(() => {
    const result = paginateArray.find((obj) => obj?.id === paginateNext?.id);
    if (!result && paginateNext !== null && paginateNext !== undefined)
      satePaginateArray([...paginateArray, paginateNext]);
  }, [paginateNext]);

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

  const paginate = () => {
    dispatch(fetchProductsApi({ pagNext: paginateNext, categoryUid: filter }));
    if (paginateNext !== undefined) satePage(page + 1);
  };

  const goBack = () => {
    console.log('nuri:', paginateArray[page - 1]);
    dispatch(fetchProductsApi({ pagNext: paginateArray[page - 2], categoryUid: filter }));
    if (paginateNext !== undefined) satePage(page - 1);
  };

  console.log({ paginateArray });

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
      <button onClick={() => goBack()} disabled={page < 2}>
        Back
      </button>
      <span>Page: {page}</span>
      <button onClick={() => paginate()} disabled={products.length < 4}>
        Next
      </button>
    </div>
  );
};

export default Products;
