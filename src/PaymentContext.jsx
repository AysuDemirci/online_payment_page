import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const PaymentContext = React.createContext();
export function usePaymentContext() {
  return useContext(PaymentContext);
}

export function PaymentProvider(props) {
  const amount = 1000.0;
  const initialState = {
    cardOwner: "",
    cardNumber: "",
    email:"",
    cardMonth: "",
    cardYear:"",
    cardSecurityNumber: "",
    paymentDetails: [],
  };


  const [info, setInfo] = useState(initialState);
  const amountShipping = 19.9;
  const [selectedRadio, setSelectedRadio] = useState(1);
  const total = info.paymentDetails.map((x) => x.totalPayment);

  const handleRadioChange = (index) => {
    setSelectedRadio(index);
    const selectedRow = rows.find((row) => row.id === index);
    const { monthlyPayment, totalPayment } = calculatePayment(
      selectedRow.factor
    );

    setInfo((prevState) => ({
      ...prevState,
      paymentDetails: [
        {
          id: selectedRow.id,
          description: selectedRow.description,
          monthlyPayment,
          totalPayment,
        },
      ],
    }));
  };
  const rows = [
    { id: 1, description: "Tek Çekim", factor: 0 },
    { id: 2, description: "2 Taksit", factor: 2 },
    { id: 3, description: "3 Taksit", factor: 3 },
    { id: 4, description: "4 Taksit", factor: 4 },
    { id: 5, description: "5 Taksit", factor: 5 },
    { id: 6, description: "6 Taksit", factor: 6 },
  ];
  const calculatePayment = (factor) => {
    if (factor === 0) {
      return {
        monthlyPayment: amount.toFixed(2),
        totalPayment: amount.toFixed(2),
      };
    } else {
      const totalPayment = (amount * factor) / 100 + amount;
      return {
        monthlyPayment: (totalPayment / factor).toFixed(2),
        totalPayment: totalPayment.toFixed(2),
      };
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleButton = () => {
    console.log(info);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1-');
    return formatted;
  }; 
  const formatExpirationDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(.{2})/, '$1/').slice(0, 5);
    return formatted;
  };
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }  else if (name === 'cardSecurityNumber') {
      formattedValue = value.replace(/\D/g, '');
    }

    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: formattedValue,
    }));
  };

 
  const handleChangeMonthYear = (e) => {
    const { value } = e.target;
    const formattedValue = formatExpirationDate(value);

    const [month, year] = formattedValue.split('/');

    setInfo((prevInfo) => ({
      ...prevInfo,
      cardMonth: month || '',
      cardYear: year || '',
    }));
  };
  
  const value = {
    amount,
    info,
    setInfo,
    amountShipping,
    selectedRadio,
    setSelectedRadio,
    total,
    handleRadioChange,
    rows,
    calculatePayment,
    handleChange,
    handleButton,
    handleChangeValue,
    handleChangeMonthYear
  };

  return (
    <PaymentContext.Provider value={value}>
      {props.children}
    </PaymentContext.Provider>
  );
}
PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
