import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Footer, Header } from "./components";
import {
  AboutUs,
  CurrentlyShowingMovies,
  Home,
  Pricing,
  UpcomingMovies,
} from "./pages";

import "./App.scss";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              controlHeightLG: 48,
            },
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
        <div className="app-body">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route
                path="/currently-showing"
                element={<CurrentlyShowingMovies />}
              />
              <Route path="/upcoming" element={<UpcomingMovies />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
