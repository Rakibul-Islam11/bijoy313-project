import ShinyMarquee from "../../marquew-head/ShinyMarquee";
import PhysicalDigitalPro from "../../physical&digital-product/PhysicalDigitalPro";
import AllProducts from "../all-products-page/AllProducts";
import ApnarProjonButton from "../apnar-proyon-button/ApnarProjonButton";
import BusinessCards from "../business-card/BusinessCards";
import HeroSlider from "../hero-slider/HeroSlider";
import HomePhysicalDigitalPro from "../home-physical&digital-product/HomePhysicalDigitalPro";
import PopularCate from "../popular-category/PopularCate";
import ProductHeadMarque from "../product-marque/ProductHeadMarque";
import SuffleCategory from "../suffol-category/SuffleCtegory";
import SupportAndSocial from "../supprt-with-social/SupportAndSocial";
import TinyCardMenu from "../tiny-card-sec/TinyCardMenu";

const Home = () => {
    return (
        <div>
            <div className="w-[98%] mx-auto font-bengali">
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
                
                {/* <TinyCardMenu></TinyCardMenu> */}
                
                
                {/* <PhysicalDigitalPro></PhysicalDigitalPro> */}
                
            </div>
            
        </div>
        
    );
};

export default Home;