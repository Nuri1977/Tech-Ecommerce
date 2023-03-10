import React from 'react';
import DailyHighlights from './DailyHighlights/DailyHighlights';
import './Directory.scss';
import HomeSlider from './HomeSlider/HomeSlider';
import Offers from './Offers/Offers';
import PopularBrands from './PopularBrands/PopularBrands';
import Recomandations from './Recomandations/Recomandations';

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <HomeSlider />
        <Offers />
        <DailyHighlights />
        <PopularBrands />
        <Recomandations />
      </div>
    </div>
  );
};

export default Directory;
