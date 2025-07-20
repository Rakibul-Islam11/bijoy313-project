import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bannerImg from "../../assets/navbrand-logo/Add a subheading (1280 x 420 px).webp";

const HeroSlider = () => {
    const slides = [1, 2, 3, 4, 5]; // Number of slides

    return (
        <div className="relative w-full max-h-[440px] mt-4 rounded-2xl overflow-hidden">
            <Swiper
                className="w-full h-full rounded-2xl"
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
            >
                {slides.map((id) => (
                    <SwiperSlide key={id}>
                        <div className="relative w-full h-full">
                            {/* Blur background */}
                            <img
                                src={bannerImg}
                                alt={`Slide ${id}`}
                                className="absolute top-0 left-0 w-full h-full object-cover blur-sm scale-110"
                            />
                            {/* Clear foreground */}
                            <img
                                src={bannerImg}
                                alt={`Slide ${id}`}
                                className="relative w-full h-full object-contain z-10"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
