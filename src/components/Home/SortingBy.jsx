import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import MediaCard from "../MediaCard";
import api from "../../api/http";
import { sliderSettings } from "../../const/slider";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SortingBy = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const { data } = await api.get("all_collections");
      setCollections(data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="flex overflow-hidden justify-center w-full max-w-[1200px] mx-auto">
      <Swiper {...sliderSettings} modules={[Navigation]} navigation={true}>
        {collections?.map((collection) => (
          <SwiperSlide key={collection.id}>
            <MediaCard option={collection} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SortingBy;
