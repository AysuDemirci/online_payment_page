import { usePaymentContext } from "../PaymentContext";
import { FaShoppingCart } from "react-icons/fa";
import { validEmail } from "../Rules/Regex";

export default function OrderSummary() {
  const { amount, info, amountShipping, total, handleButton } =
    usePaymentContext();

  return (
    <div>
      <div className="order-sum">
        <FaShoppingCart className="cart-icon" />
        <h3>Sipariş Özeti</h3>
      </div>

      <hr className="order-hr" />
      <div className="order">
        {" "}
        <p>Sepet tutarı: </p>
        <p>{amount.toFixed(2)} TL</p>
      </div>
      <div className="order">
        <p>Kargo tutarı: </p>
        <p>{amountShipping.toFixed(2)} TL</p>
      </div>
      {total > 1000 && (
        <div className="order">
          <p>Vade Farkı: </p>
          <p>{(total - amount).toFixed(2)} TL</p>
        </div>
      )}

      <hr />
      <div className="order">
        <p>Toplam tutar: </p>{" "}
        <p>{(amount + amountShipping + (total - amount)).toFixed(2)} TL</p>
      </div>
      <div className="orders">
        <input type="checkbox" className="order-checkbox" />
        <p className="order-p">3D kullanmak istiyorum.</p>
      </div>
      <button
        className="payment-button "
        onClick={handleButton}
        disabled={
          info.cardOwner === "" ||
          info.cardNumber === "" ||
          info.cardMonth === "" ||
          info.cardYear === "" ||
          info.cardSecurityNumber === "" ||
          info.email === "" ||
          !validEmail.test(info.email) ||
          info.cardMonth.length < 2 ||
          info.cardYear.length < 2 ||
          info.cardSecurityNumber.length < 3 ||
          info.cardNumber.length < 16||
          info.cardOwner.length < 5
        }
      >
        Ödemeye Geç
      </button>
    </div>
  );
}
