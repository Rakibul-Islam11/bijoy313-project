import { Link } from "react-router-dom";
import ShinyMarquee from "../marquew-head/ShinyMarquee";
import AllProducts from "../all-products-page/AllProducts";
import ApnarProjonButton from "../apnar-proyon-button/ApnarProjonButton";
import BusinessCards from "../business-card/BusinessCards";
import HeroSlider from "../hero-slider/HeroSlider";
import HomePhysicalDigitalPro from "../home-physical&digital-product/HomePhysicalDigitalPro";
import PopularCate from "../popular-category/PopularCate";
import ProductHeadMarque from "../product-marque/ProductHeadMarque";
import SuffleCategory from "../suffol-category/SuffleCtegory";
import SupportAndSocial from "../supprt-with-social/SupportAndSocial";
import { FaUserPlus } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import './Home.css';
import { useContext } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";

const Home = () => {
    const { user } = useContext(authContext);

    return (
        <div>
            <div className="w-[98%] mx-auto font-bengali mt-[80px]">
                <HeroSlider></HeroSlider>
                <SupportAndSocial></SupportAndSocial>
                <BusinessCards></BusinessCards>
                
                <ShinyMarquee></ShinyMarquee>
                
                <SuffleCategory></SuffleCategory>
                <ProductHeadMarque></ProductHeadMarque>
                <HomePhysicalDigitalPro></HomePhysicalDigitalPro>
                
                <PopularCate></PopularCate>
                <ApnarProjonButton></ApnarProjonButton>
                <AllProducts></AllProducts>
            </div>
            
            {/* Floating Button - Left */}
            <div className="fixed bottom-20 md:top-20 -left-13 md:-left-6 z-50">
                <Link to="/active-jobs">
                    <button className="flex items-center gap-2 bg-[#fff7d6] text-black text-[14px] md:text-[16px] md:font-semibold py-2 md:py-4 px-2 md:px-4 rounded-full shadow-md border-2 !pl-14 animate-border">
                        একটিভ জবস
                        <VscVmActive className="text-[14px] md:text-xl text-blue-600" />
                    </button>
                </Link>
            </div>

            {/* Floating Button - Right (নাম পরিবর্তন হবে না) */}
            <div className="fixed bottom-20 md:top-20 -right-13 md:-right-6 z-50">
                <Link to={user ? "/active-jobs" : "/pop-up-sign"}>
                    <button className="flex items-center gap-2 bg-[#fff7d6] text-black text-[14px] md:text-[16px] md:font-semibold py-2 md:py-4 px-2 md:px-4 rounded-full shadow-md border-2 !pr-14 animate-border">
                        <FaUserPlus className="text-[14px] md:text-xl text-green-600" />
                        রেফার & আর্ন
                    </button>
                </Link>
            </div>
        </div>
        
    );
};

export default Home;