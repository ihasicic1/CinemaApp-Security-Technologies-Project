import { Carousel, ConfigProvider } from "antd";

import { useLatestMovies } from "../../hooks";
import { HeroItem } from "../HeroItem";

import "./hero.scss";

export const Hero = () => {
  const { data: latestMovies } = useLatestMovies();

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotActiveWidth: 30,
            dotGap: 12,
            dotHeight: 4,
            dotOffset: 24,
            dotWidth: 30,
          },
        },
      }}
    >
      <div className="hero">
        <div className="carousel-container">
          <Carousel autoplay>
            {latestMovies?.content.map((movie) => (
              <HeroItem key={movie.id} movie={movie} />
            ))}
          </Carousel>
        </div>
      </div>
    </ConfigProvider>
  );
};
