export const SearchSection = ({
  getWeatherDetalis,
  searchInputRef,
  searchValue,
  setSearchValue,
}) => {
  const handleSearchbar = (e) => {
    e.preventDefault();
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=e462fcc5ba8c474d8e2172505252405&q=${searchValue}&days=2`;
    getWeatherDetalis(API_URL);
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=e462fcc5ba8c474d8e2172505252405&q=${latitude},${longitude}&days=2`;
        getWeatherDetalis(API_URL);
      },
      () => {
        alert(
          "Location access denied. Please enable permissions to use this feature."
        );
      }
    );
  };

  return (
    <div className="flex items-center justify-between p-8 mb-10 relative z-10">
      <form
        onSubmit={handleSearchbar}
        className="flex flex-1 items-center gap-2 border p-4 rounded-lg mr-2 bg-[rgba(255,255,255,0.3)]"
      >
        <span className="material-symbols-outlined">search</span>
        <input
          type="search"
          placeholder="Enter a city name"
          ref={searchInputRef}
          required
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full outline-none text-lg uppercase placeholder:normal-case"
        />
      </form>

      <button
        onClick={handleLocationSearch}
        className="flex items-center gap-2 px-4 py-4 border rounded-lg bg-[rgba(255,255,255,0.3)]"
      >
        <span className="material-symbols-outlined">my_location</span>
      </button>
    </div>
  );
};
