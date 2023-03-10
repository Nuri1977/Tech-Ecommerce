import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../common/Card/Card';
import useProducts from '../../../hooks/useProducts';
import { useAppDispatch } from '../../../redux/app/hooks';
import { fetchProductsApi } from '../../../redux/products/productsThunk';
import './DailyHighlights.scss';

const DailyHighlights = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useProducts();

  useEffect(() => {
    dispatch(fetchProductsApi({ pagNext: null, pageSize: 30 }));
  }, []);

  const filteredProducts = products.slice(0, 5);
  return (
    <div className="highlights">
      <h2 className="highlightsTitle">daily highlights</h2>
      <div className="highlightsContainer">
        {filteredProducts.map((product) => (
          <Card
            key={product.uid}
            className="highlightsCard"
            onClick={() => navigate(`/product/${product.uid}`)}>
            <div className="highlightsImg">
              <img src={product.imageUrl} alt="product.name" />
            </div>
            <p className="highlightsTitle">{product.name}</p>
            <p className="highlightsPrice">${product.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailyHighlights;
