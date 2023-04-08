import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../common/Card/Card';
import useProducts from '../../../hooks/useProducts';
import { useAppDispatch } from '../../../redux/app/hooks';
import { fetchProductsApi } from '../../../redux/products/productsThunk';
import './DailyHighlights.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DailyHighlights = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useProducts();
  const scrollViewRef = useRef<HTMLUListElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const [widthTotal, setWidthTotal] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsApi({ pagNext: null, pageSize: 30 }));
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      if (scrollViewRef.current) setWidth(scrollViewRef.current.clientWidth);
      if (scrollViewRef.current) setWidthTotal(scrollViewRef.current.scrollWidth);
    }

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ left: screenWidth, behavior: 'smooth' });
  }, [screenWidth]);

  const toNextPage = () => {
    if (scrollViewRef && screenWidth <= widthTotal) {
      setScreenWidth(screenWidth + width);
    }
  };

  const toPreviosPage = () => {
    if (scrollViewRef && screenWidth >= 0) {
      setScreenWidth(screenWidth - width);
    }
  };

  const filteredProducts = products.slice(0, 5);
  return (
    <div className="highlights" data-testid="daily-highlights">
      <h2 className="highlightsTitle">daily highlights</h2>
      <div
        className="highlightsContainer"
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}>
        <ul className="highlightProducts" ref={scrollViewRef}>
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
        </ul>
        {screenWidth > 0 && showArrow && (
          <div className="scrollIcon scrollBack" onClick={toPreviosPage}>
            <FaChevronLeft fontSize={30} />
          </div>
        )}

        {screenWidth + width < widthTotal && showArrow && (
          <div className="scrollIcon scrollNext" onClick={toNextPage}>
            <FaChevronRight fontSize={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyHighlights;
