import React, { useEffect } from 'react';
import OrderDetail from '../../components/OrdersDetail.tsx/OrderDetail';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectOrders } from '../../redux/orders/ordersSlice';
import { fetchOrdersApi } from '../../redux/orders/ordersThunk';
import './Orders.scss';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, ordersError } = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrdersApi());
  }, []);

  if (loading) return <div>Loading ..</div>;

  if (ordersError) return <div>{ordersError}</div>;

  return (
    <div className="orders">
      <h2>Order History</h2>
      <div className="orderDetail">
        {orders.map((order) => (
          <OrderDetail order={order} key={order.uid} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
