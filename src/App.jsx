import { PaymentProvider } from "./PaymentContext";
import Home from "./components/Home";

export default function App() {
  return (
    <PaymentProvider>
      <Home />
    </PaymentProvider>
  );
}
