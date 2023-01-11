import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500
}

function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map()
  })

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0
  })

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total
    })

  }, [orderCounts])


  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      // 원래있던 products or options, 그리고 복사하기
      const oldOrderMap = orderCounts[optionType];
      const newOrderMap = new Map(oldOrderMap);

      newOrderMap.set(itemName, parseInt(newItemCount));

      //  원본 orderCounts ,  복사 
      const newOrderCounts = { ...orderCounts };
      newOrderCounts[optionType] = newOrderMap;

      // update state
      setOrderCounts(newOrderCounts)
    }

    function resetOrderCounts() {
      setOrderCounts({
        products: new Map(),
        options: new Map()
      })
    }

    return [{ ...orderCounts, totals }, updateItemCount, resetOrderCounts]
  }, [orderCounts, totals])

  return <OrderContext.Provider value={value} {...props} />
}