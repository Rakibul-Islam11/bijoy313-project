import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Fail = () => {
    const [searchParams] = useSearchParams();

    const val_id = searchParams.get("val_id");
    console.log(val_id);
    
    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
            <p className="mt-2">Unfortunately, your payment was not successful. Please try again.</p>
        </div>
    );
};

export default Fail;
