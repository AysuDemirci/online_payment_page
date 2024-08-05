import { usePaymentContext } from "../PaymentContext";

export default function PaymentInstallment() {
  const {
    selectedRadio,

    handleRadioChange,
    rows,
    calculatePayment,
  } = usePaymentContext();
  return (
    <div>
      <div className="table table-responsive">
        <h3 className="payment-installment-title">Taksit Seçenekleri</h3>
        <hr />
        <table className="table table-hover">
          <thead>
            <tr>
              <td></td>
              <td className="thead">Taksit Sayısı</td>
              <td className="thead">Taksit Tutarı</td>
              <td className="thead">Toplam Tutar</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const { monthlyPayment, totalPayment } = calculatePayment(
                row.factor
              );
              return (
                <tr
                  key={row.id}
                  className={selectedRadio === row.id ? "highlighted" : ""}
                >
                  <td>
                    <input
                      type="radio"
                      name="select"
                      id="color"
                      checked={selectedRadio === row.id}
                      onChange={() => handleRadioChange(row.id)}
                    />
                  </td>
                  <td>{row.description}</td>
                  <td>{monthlyPayment} TL</td>
                  <td>{totalPayment} TL</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="installment-option">
        Tüm taksit seçeneklerini görmek için{" "}
        <button className="payment-installment-button">tıklayınız.</button>
      </div>
    </div>
  );
}
