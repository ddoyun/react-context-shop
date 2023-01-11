import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';

const CompletePage = ({ setStep }) => {
  // orderContext 페이지서 1, 3 번째 value만 필요하기 때문에 2번째는 빈 값
  const [orderData, , resetOrderCounts] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData])

  const orderCompleted = async (orderData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/order`,
        orderData
      )
      setOrderHistory(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const orderTable = orderHistory.map(item => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ))

  const handleClick = () => {
    resetOrderCounts();
    setStep(0);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>주문 성공!!</h2>
      <p>모든 주문 리스트</p>
      <table style={{ margin: 'auto' }}>
        <tbody>
          <tr>
            <th>number</th>
            <th>price</th>
          </tr>
          {orderTable}
        </tbody>
      </table>
      <button onClick={handleClick}>돌아가기</button>
    </div>
  )
}

export default CompletePage