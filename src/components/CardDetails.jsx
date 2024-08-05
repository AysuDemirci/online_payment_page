import { usePaymentContext } from "../PaymentContext";
import { validEmail } from "../Rules/Regex";

export default function CardDetails() {
  const { info, handleChange, handleChangeValue, handleChangeMonthYear } =
    usePaymentContext();
  return (
    <div>
      <div className="payment-titles">Ödeme Yöntemi: Kredi Kartı</div>
      <p className="payment-title">Kart Bilgileri</p>
      <div className="payment-installment-info">
        <label>Kart Üzerindeki Ad-Soyad</label>
        <input
          type="text"
          className="card"
          name="cardOwner"
          value={info.cardOwner}
          onChange={handleChange}
          style={{
            borderColor:
              info.cardOwner.length > 0 && info.cardOwner.length < 6
                ? "red"
                : "lightgray",
          }}
          autoComplete="off"
          required
        />
      </div>
      <div className="payment-installment-info">
        <label>Kredi Kart Numarası</label>
        <input
          className="card number"
          name="cardNumber"
          maxLength={19}
          value={info.cardNumber}
          onChange={handleChangeValue}
          style={{
            borderColor:
              info.cardNumber.length > 0 && info.cardNumber.length < 19
                ? "red"
                : "lightgray",
          }}
          autoComplete="off"
          required
        />
      </div>
      <div className="payment-installment-info">
        <label>E-mail Adresi</label>
        <input
          className="card number"
          name="email"
          type="email"
          value={info.email}
          onChange={handleChange}
          style={{
            borderColor:
              info.email !== ""
                ? !validEmail.test(info.email)
                  ? "red"
                  : "lightgray"
                : "lightgray",
          }}
          autoComplete="off"
          required
        />
      </div>
      <div className="payment-installment-info card-info">
        <label>Ay/Yıl</label>
        <label>CCV</label>
        <input
          className="info"
          maxLength={5}
          name="cardMonthYear"
          value={`${info.cardMonth}${
            info.cardMonth && info.cardYear ? "/" : ""
          }${info.cardYear}`}
          onChange={handleChangeMonthYear}
          required
          autoComplete="off"
          style={{
            borderColor:
              info.cardMonth.length + info.cardYear.length > 0 &&
              info.cardMonth.length + info.cardYear.length < 4
                ? "red"
                : "lightgray",
          }}
        />

        <input
          className="info"
          maxLength={3}
          name="cardSecurityNumber"
          value={info.cardSecurityNumber}
          onChange={handleChangeValue}
          required
          autoComplete="off"
          style={{
            borderColor:
              info.cardSecurityNumber > 0 && info.cardSecurityNumber.length < 3
                ? "red"
                : "lightgray",
          }}
        />
      </div>
    </div>
  );
}
