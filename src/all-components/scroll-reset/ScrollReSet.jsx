import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReSet = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0); // Instantly jump before paint
    }, [pathname]);

    return null;
};

export default ScrollReSet;
