import React, { useEffect, useRef, useState } from 'react';
import './PopularBrands.scss';
import LG from '../../../assets/images/brands/LG.png';
import Google from '../../../assets/images/brands/Google.jpeg';
import Apple from '../../../assets/images/brands/Apple.png';
import Boch from '../../../assets/images/brands/Boch.png';
import Dyson from '../../../assets/images/brands/Dyson.png';
import Philips from '../../../assets/images/brands/Philips.png';
import Samsung from '../../../assets/images/brands/Samsung.png';
import Simens from '../../../assets/images/brands/Simens.png';
import Sony from '../../../assets/images/brands/Sony.png';
import Xiomi from '../../../assets/images/brands/Xiomi.png';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

const PopularBrands = () => {
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

  return (
    <div
      className="brandsContainer"
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}>
      <div className="brands" ref={scrollViewRef}>
        <div>
          <img src={LG} alt="lg" />
        </div>
        <div>
          <img src={Google} alt="Google" />
        </div>
        <div>
          <img src={Apple} alt="Apple" />
        </div>
        <div>
          <img src={Boch} alt="Boch" />
        </div>
        <div>
          <img src={Dyson} alt="Dyson" />
        </div>
        <div>
          <img src={Philips} alt="Philips" />
        </div>
        <div>
          <img src={Samsung} alt="Samsung" />
        </div>
        <div>
          <img src={Simens} alt="Simens" />
        </div>
        <div>
          <img src={Sony} alt="Sony" />
        </div>
        <div>
          <img src={Xiomi} alt="Xiomi" />
        </div>
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
  );
};

export default PopularBrands;
