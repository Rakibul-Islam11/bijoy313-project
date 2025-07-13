import React from "react";
import Marquee from "react-fast-marquee";
import './marquehead.css'

const ProductHeadMarque = () => {
    const headlines = [
        "✨ ফিজিক্যাল প্রডাক্ট ✨",
        "🚀 Digital Product 🚀",
        "💎 Physical Product 💎",
        "🌟  ডিজিটাল প্রডাক্ট 🌟",
        "🔥 Digital Product 🔥"
    ];

    return (
        <div className="pt-2">
            {/* Top Marquee */}
            <div className="transform-style-preserve-3d rotate-x-20">
                <Marquee speed={40} gradient={false} direction="left" className="">
                    {headlines.map((headline, index) => (
                        <span key={index} className="marquee-text">
                            {headline}
                        </span>
                    ))}
                </Marquee>
            </div>

            
        </div>
    );
};

export default ProductHeadMarque;