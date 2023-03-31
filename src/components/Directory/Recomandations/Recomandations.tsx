import { useNavigate } from 'react-router-dom';
import Card from '../../../common/Card/Card';
import useProducts from '../../../hooks/useProducts';
import './Recomandations.scss';

const Recomandations = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const filteredProducts = products.slice(5, 10);
  return (
    <div className="recommendations">
      <h2 className="recommendationsTitle">recommendations</h2>
      <div className="recommendationsContainer">
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
    </div>
  );
};

export default Recomandations;
