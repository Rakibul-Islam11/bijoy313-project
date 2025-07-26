import React from 'react';

const Cancel = () => {
    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-yellow-600">Payment Cancelled!</h1>
            <p className="mt-2">You cancelled the payment. You can retry anytime.</p>
        </div>
    );
};

export default Cancel;
