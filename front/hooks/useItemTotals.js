import { useState, useEffect } from "react";
import { BEFORE_TAX } from "/utils/constants/discountTypes";
import { ITBMS_TAX_NAME, RETAINING_TAX_NAME } from "/utils/constants/taxes";

export function useItemTotals({ items, discountType, adjustmentValue = 0 }) {
  const [subtotal, setSubtotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itbmsTotalTax, setItbmsTotalTax] = useState(0);
  const [retainingTotalTax, setRetainingTotalTax] = useState(0);
  const [total, setTotal] = useState(0);

  const getSubtotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  };

  const getTotalDiscount = (items) => {
    return items.reduce((acc, item) => acc - item.discount, 0);
  };

  const getTaxes = (items, type, discountType) => {
    return items.reduce((acc, item) => {
      const rate = item.taxes.find((tax) => tax.name === type)?.rate;
      if (discountType === BEFORE_TAX) {
        return (
          acc +
          (item.quantity * item.rate - item.discount) * (rate ? rate / 100 : 0)
        );
      } else {
        return acc + item.quantity * item.rate * (rate ? rate / 100 : 0);
      }
    }, 0);
  };

  useEffect(() => {
    const subtotal = getSubtotal(items);
    const totalDiscount = getTotalDiscount(items);
    const itbmsTotalTax = getTaxes(items, ITBMS_TAX_NAME, discountType);
    const retainingTotalTax = getTaxes(items, RETAINING_TAX_NAME, discountType);
    const total =
      subtotal +
      totalDiscount +
      itbmsTotalTax +
      retainingTotalTax +
      Number(adjustmentValue);

    setSubtotal(subtotal);
    setTotalDiscount(-totalDiscount);
    setItbmsTotalTax(itbmsTotalTax);
    setRetainingTotalTax(retainingTotalTax);
    setTotal(total);
  }, [items, discountType, adjustmentValue]);

  return {
    subtotal,
    totalDiscount,
    itbmsTotalTax,
    retainingTotalTax,
    adjustmentValue,
    total,
    getSubtotal,
    getTotalDiscount,
    getTaxes,
  };
}
