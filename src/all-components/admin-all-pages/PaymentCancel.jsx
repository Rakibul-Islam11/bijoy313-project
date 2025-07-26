import { useLocation } from 'react-router-dom';

const PaymentCancel = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const invoiceId = query.get("invoice_id");

    console.log("❌ Payment Cancelled");
    console.log("Invoice ID (if any):", invoiceId);

    return (
        <div className="text-center mt-20 text-red-600">
            <h1 className="text-4xl font-bold mb-4">❌ Payment Cancelled</h1>
            {invoiceId ? (
                <p>Your invoice ID: <span className="text-black">{invoiceId}</span></p>
            ) : (
                <p>No invoice ID found in URL.</p>
            )}
        </div>
    );
};

export default PaymentCancel;
