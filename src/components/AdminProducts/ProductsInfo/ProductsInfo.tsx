import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Category, Product } from '../../../config/interfaces/intefaces';
import useProducts from '../../../hooks/useProducts';
import { useAppDispatch } from '../../../redux/app/hooks';
import { deleteProductApi, fetchProductsApi } from '../../../redux/products/productsThunk';
import Button from '../../../common/Forms/Button/Button';
import FormSelect from '../../../common/Forms/FormSelect/FormSelect';
import ProductsModal from '../ProductsModal/ProductsModal';

const ProductsInfo = ({ categories }: { categories: Category[] }) => {
  const dispatch = useAppDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    name: '',
    uid: '',
    imageUrl: '',
    category: { uid: '', name: '' },
    price: 0,
    createDate: Timestamp.now(),
    description: ''
  });
  const [page, satePage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filterValue, setFilterValeu] = useState('');
  const [paginateArray, satePaginateArray] = useState<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);
  const { products, loading, paginateNext } = useProducts();

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

  const toggleModal = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setHideModal(!hideModal);
  };

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

  return (
    <>
      <div className="selectBoxes">
        <FormSelect
          options={categories}
          name="All categories"
          value={filterValue}
          onChange={(e) => setFilterValeu(e.target.value)}
        />
        <FormSelect
          options={[4, 5, 8, 10, 20, 50]}
          name=""
          value={pageSize}
          onChange={(e) => setPageSize(+e.target.value)}
        />
      </div>
      <ul className="productsInfo">
        {products &&
          products.map((product) => (
            <li key={product.uid} className="productCard">
              <img src={product.imageUrl} alt={product.name} className="productImage" />
              <h5>{product.name}</h5>
              <h5>{product.category?.name}</h5>
              <h5>{product.price}</h5>
              <div className="buttons">
                <Button onClick={() => toggleModal(product)} data-testid="edit">
                  {loading ? 'Loading...' : 'Edit'}
                </Button>
                <Button onClick={() => dispatch(deleteProductApi(product.uid))}>
                  {loading ? 'Loading...' : 'Delete'}
                </Button>
              </div>
            </li>
          ))}
      </ul>
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
      <ProductsModal
        toggleModal={toggleModal}
        hideModal={hideModal}
        selectedProduct={selectedProduct}
        categories={categories}
      />
    </>
  );
};

export default ProductsInfo;
