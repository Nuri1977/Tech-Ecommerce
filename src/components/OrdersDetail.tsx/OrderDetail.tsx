import React from 'react';
import { Order } from '../../config/interfaces/intefaces';
import { formatNumT1 } from '../../utils/formatNumber';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import './OrderDetail.scss';

const OrderDetail = ({ order }: { order: Order }) => {
  const [showDetail, setShowDetail] = React.useState(false);

  return (
    <>
      <div key={order.uid} className="orderItem">
        <div
          className="toggleIcon"
          onClick={() => setShowDetail(!showDetail)}
          data-testid="toggle-icon">
          {showDetail ? <MdExpandLess fontSize="24px" /> : <MdExpandMore fontSize="24px" />}
        </div>
        <div className="orderUid">{order.user?.email}</div>
        <div className="orderDate" data-testid="order-date">
          {order.createDate.toDate().toLocaleDateString()}
        </div>
        <div className="orderAmount" data-testid="order-amount">
          {`${order.payment?.currency} ${
            order.payment?.amount && formatNumT1(order.payment?.amount / 100)
          }`}
        </div>
        <div className="orderAddress">{order.payment?.shipping?.name}</div>
        <div className="orderAddress">{order.payment?.shipping?.address?.line1}</div>
      </div>
      {showDetail && (
        <div className="cartItems">
          {order.items.map((product) => (
            <div key={product.uid} className="cartItem">
              <div className="itemImg">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product">{product.name}</div>
              <div className="quantity">{`x ${product.quantity}`}</div>
              <div className="price">${formatNumT1(product.price)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderDetail;
