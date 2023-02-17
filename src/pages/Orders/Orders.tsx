import React, { useEffect } from 'react';
import OrderDetail from '../../components/OrdersDetail.tsx/OrderDetail';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectOrders } from '../../redux/orders/ordersSlice';
import { fetchOrdersApi, fetchUserOrdersApi } from '../../redux/orders/ordersThunk';
import './Orders.scss';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isAdmin } = useAuth();
  const { orders, loading, ordersError } = useAppSelector(selectOrders);

  useEffect(() => {
    if (currentUser?.uid && !isAdmin) dispatch(fetchUserOrdersApi(currentUser.uid));
    if (currentUser?.uid && isAdmin) dispatch(fetchOrdersApi());
  }, []);

  if (loading) return <div>Loading ..</div>;

  if (ordersError) return <div>{ordersError}</div>;

  return (
    <div className="orders">
      <h2>Order History</h2>
      <div className="orderDetail">
        {orders.length === 0 ? (
          <div>No orders found</div>
        ) : (
          orders.map((order) => <OrderDetail order={order} key={order.uid} />)
        )}
      </div>
    </div>
  );
};

export default Orders;
