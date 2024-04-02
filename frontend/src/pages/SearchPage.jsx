import { useSearchStores } from "@/api/StoreApi";
import SearchBar from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import StoreResultCard from "@/components/StoreResultCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchStores(searchState, city);

  const setSearchQuery = (searchFormData) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found.</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cats-list">insert categories here:</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by category, tag, or store name..."
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((store) => (
          <StoreResultCard store={store} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
