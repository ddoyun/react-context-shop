import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';
import Options from './Options';
import Error from './Error';
import { OrderContext } from '../context/OrderContext';

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);
  console.log(orderData);

  useEffect(() => {
    loadItems();
  }, [])

  const loadItems = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`)
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  const ItemComponent = orderType === 'products' ? Products : Options;

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)}
    />
  ))

  if (error) {
    return <Error message="에러가 발생했습니다." />
  }

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: {orderData.totals[orderType]}</p>
      <div
        style={{
          display: 'flex',
          flexDirection: orderType === "options"
            ? "column" : "row"
        }}
      >
        {optionItems}
      </div>
    </div>
  )
}

export default Type