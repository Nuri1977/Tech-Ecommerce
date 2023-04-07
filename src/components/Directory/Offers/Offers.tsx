import React from 'react';
import Card from '../../../common/Card/Card';
import './Offers.scss';
import Image_01 from '../../../assets/images/offers/Neues_Projekt_01.jpeg';
import Image_02 from '../../../assets/images/offers/Neues_Projekt_02.jpeg';
import Image_03 from '../../../assets/images/offers/Neues_Projekt_03.jpeg';
import Image_04 from '../../../assets/images/offers/Category_Modul_04.png';
import Image_05 from '../../../assets/images/offers/MyMediaMarkt_05.png';
import Image_06 from '../../../assets/images/offers/Home-Kachel_06.png';

const Offers = () => {
  return (
    <div className="offers" data-testid="offers">
      <Card>
        <div className="offerCard">
          <img src={Image_01} alt="" className="offerImg" />
          <h4>Deal of the day</h4>
        </div>
      </Card>
      <Card>
        <div className="offerCard">
          <img src={Image_02} alt="" className="offerImg" />
          <h4>Offers</h4>
        </div>
      </Card>
      <Card>
        <div className="offerCard">
          <img src={Image_03} alt="" className="offerImg" />
          <h4>Outlet</h4>
        </div>
      </Card>
      <Card>
        <div className="offerCard">
          <img src={Image_04} alt="" className="offerImg" />
          <h4>Cell contracts</h4>
        </div>
      </Card>
      <Card>
        <div className="offerCard">
          <img src={Image_05} alt="" className="offerImg" />
          <h4>My TechnoMarket</h4>
        </div>
      </Card>
      <Card>
        <div className="offerCard">
          <img src={Image_06} alt="" className="offerImg" />
          <h4>Heroine week</h4>
        </div>
      </Card>
    </div>
  );
};

export default Offers;
