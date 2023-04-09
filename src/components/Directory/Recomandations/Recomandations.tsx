import { useNavigate } from 'react-router-dom';
import Card from '../../../common/Card/Card';
import useProducts from '../../../hooks/useProducts';
import './Recomandations.scss';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Recomandations = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const [widthTotal, setWidthTotal] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

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

  const filteredProducts = products.slice(5, 10);
  return (
    <div className="recommendations" data-testid="recommendations">
      <h2 className="recommendationsTitle">recommendations</h2>
      <div
        className="recommendationsContainer"
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}>
        <div className="recommendProducts" ref={scrollViewRef}>
          {filteredProducts.map((product) => (
            <Card
              key={product.uid}
              className="recommendationsCard"
              onClick={() => navigate(`/product/${product.uid}`)}>
              <div className="recommendationsImg">
                <img src={product.imageUrl} alt="product.name" />
              </div>
              <p className="recommendationsTitle">{product.name}</p>
              <p className="recommendationsPrice">${product.price}</p>
            </Card>
          ))}
        </div>
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

export default Recomandations;
