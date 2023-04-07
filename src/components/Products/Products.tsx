import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import useCategories from '../../hooks/useCategory';
import useProducts from '../../hooks/useProducts';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchCategoriesApi } from '../../redux/categories/categoriesThunk';
import { fetchProductsApi } from '../../redux/products/productsThunk';
import Button from '../../common/Forms/Button/Button';
import FormSelect from '../../common/Forms/FormSelect/FormSelect';
import OneProduct from './OneProduct/OneProduct';
import './Products.scss';

const Products = () => {
  const [filterValue, setFilterValeu] = useState('');
  const [paginateArray, satePaginateArray] = useState<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);
  const [page, satePage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const { products, loading, productsError, paginateNext } = useProducts();
  const dispatch = useAppDispatch();
  const { categories } = useCategories();

  useEffect(() => {
    dispatch(fetchProductsApi({ pagNext: null, categoryUid: filterValue, pageSize }));
    satePage(1);
    satePaginateArray([null]);
  }, [filterValue, pageSize]);

  useEffect(() => {
    const result = paginateArray.find((obj) => obj?.id === paginateNext?.id);
    if (!result && paginateNext !== null && paginateNext !== undefined)
      satePaginateArray([...paginateArray, paginateNext]);
  }, [paginateNext]);

  useEffect(() => {
    dispatch(fetchCategoriesApi());
  }, []);

  const paginate = () => {
    if (products.length >= pageSize) {
      dispatch(fetchProductsApi({ pagNext: paginateNext, pageSize, categoryUid: filterValue }));
      if (paginateNext !== undefined) satePage(page + 1);
    }
  };

  const goBack = () => {
    if (page >= 2) {
      dispatch(
        fetchProductsApi({ pagNext: paginateArray[page - 2], pageSize, categoryUid: filterValue })
      );
      if (paginateNext !== undefined) satePage(page - 1);
    }
  };

  if (productsError) return <h2>{productsError}</h2>;

  return (
    <div className="productsContainer">
      <h1 className="productsTitle">Browse products</h1>
      <div className="selectBoxes">
        <FormSelect
          options={categories}
          name="All categories"
          value={filterValue}
          onChange={(e) => setFilterValeu(e.target.value)}
        />
        <FormSelect
          options={[4, 5, 8, 10, 20, 50]}
          name="Items per page"
          value={pageSize}
          onChange={(e) => setPageSize(+e.target.value)}
        />
      </div>

      {!loading ? (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => <OneProduct product={product} key={product.uid} />)
          ) : (
            <h1 className="productsTitle">No products</h1>
          )}
        </div>
      ) : (
        <h1 className="productsTitle">Loading...</h1>
      )}
      {!loading && products.length > 0 && (
        <div className="pagination">
          <div className="paginationWraper">
            <Button onClick={() => goBack()} disabled={page < 2}>
              Back
            </Button>
            <span>{page}</span>
            <Button onClick={() => paginate()} disabled={products.length < pageSize}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
