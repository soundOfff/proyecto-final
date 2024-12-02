import { useEffect, useState } from "react";
import { getAll as getAllInvoices } from "/actions/invoices";

export default function useInvoicePayments(total, partnerId) {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  const include = [
    "project.billablePartner",
  ];

  const totalPaid = payments.reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);

  const isValid = () => {
    return totalPaid <= total && validateAmounts();
  };

  const validateAmounts = () => {
    return payments.every((payment) => {
      const invoice = invoices.find(
        (invoice) => invoice.id === payment.invoice_id
      );

      return payment.amount <= invoice.pendingToPay;
    });
  };

  const handleAmountChanges = (value, invoiceId) => {
    const payment = payments.find(
      (payment) => payment.invoice_id === invoiceId
    );
    const amount = Number(value);

    if (payment) {
      const paymentsReplaced = payments.map((payment) =>
        payment.invoice_id === invoiceId
          ? { invoice_id: invoiceId, amount: amount }
          : payment
      );
      setPayments(paymentsReplaced);
    } else {
      setPayments((prev) => [
        ...prev,
        { invoice_id: invoiceId, amount: amount },
      ]);
    }
  };

  useEffect(() => {
    const params = {
      "filter[partner_to_pay]": partnerId,
      include
    };

    getAllInvoices(params).then((response) => {
      setInvoices(response.data.invoices);
    });
  }, [partnerId]);

  return {
    invoices,
    payments,
    totalPaid,
    handleAmountChanges,
    isValid,
  };
}
