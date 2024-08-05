import { usePaymentContext } from "../PaymentContext";
import CardDetails from "./CardDetails";
import OrderSummary from "./OrderSummary";
import PaymentInstallment from "./PaymentInstallment";
import { useEffect } from "react";

export default function Home() {
  const { info, setInfo, setSelectedRadio, total, rows, calculatePayment } =
    usePaymentContext();
  useEffect(() => {
    const defaultRow = rows.find((row) => row.id === 1);
    const { monthlyPayment, totalPayment } = calculatePayment(
      defaultRow.factor
    );

    setInfo((prevState) => ({
      ...prevState,
      paymentDetails: [
        {
          id: defaultRow.id,
          description: defaultRow.description,
          monthlyPayment,
          totalPayment,
        },
      ],
    }));
  }, []);
  useEffect(() => {
    if (info.cardNumber.length < 6) {
      const defaultRow = rows.find((row) => row.id === 1);
      const { monthlyPayment, totalPayment } = calculatePayment(
        defaultRow.factor
      );

      setSelectedRadio(1);
      setInfo((prevState) => ({
        ...prevState,
        paymentDetails: [
          {
            id: defaultRow.id,
            description: defaultRow.description,
            monthlyPayment,
            totalPayment,
          },
        ],
      }));
    }
  }, [info.cardNumber]);

  return (
    <div>
      <div className="payment">
        <div className="payment-grid">
          <div className="payment-installment grid-item">
            <CardDetails />
          </div>
          <div
            className={
              "grid-2 " +
              (info.cardNumber.length >= 6 ? "open" : "") +
              (total > 1000 ? " open2" : "")
            }
          >
            <OrderSummary />
          </div>

          {info.cardNumber.length >= 7 && (
            <div className="grid-item installment-section">
              <PaymentInstallment />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
