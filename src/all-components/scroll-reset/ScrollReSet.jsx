import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReSet = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto' // 'smooth' দিলে scroll animation হবে
        });
    }, [pathname]);

    return null; // শুধু effect চালায়, কিছু render করে না
};

export default ScrollReSet;
