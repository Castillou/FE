import { PATH } from "@/constants/path";
import { 
  PaymentPage, 
  PaymentSuccessPage,
  PaymentPreparePage,
  PaymentBankTransferPage,
} from "@/pages";

const PAYMENTS_ROUTES = [
  {
    path: PATH.paymentPrepare,
    element: <PaymentPreparePage />,
  },
  {
    path: PATH.payments,
    element: <PaymentPage />,
  },
  {
    path: PATH.paymentSuccess,
    element: <PaymentSuccessPage />,
  },
  {
    path: PATH.paymentBankTransfer,
    element: <PaymentBankTransferPage />,
  },
];

export default PAYMENTS_ROUTES;
