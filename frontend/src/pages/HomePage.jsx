import SearchBar from "@/components/SearchBar";
import landingImage from "../assets/landing-page.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-fuchsia-800">
          Shop Local Today!
        </h1>
        <span className="text-xl">Find your next favourite thing...</span>
        <SearchBar
          placeHolder="Search by city or town..."
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <span className="font-bold text-3xl tracking-tighter">
            Find small businesses close to you and order online or in-person
          </span>
          <span>
            Explore new ways to shop ethically, support causes, and make a
            difference.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
