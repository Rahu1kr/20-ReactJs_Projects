import React from "react";
import { useGlobalContext } from "./context";

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();
  
  return (
    <>
      <section className="search-section">
        <h2>Search Your Favourite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
          <input type="text" name="text" class="input" placeholder="search movie" value={query}
              onChange={(e) => setQuery(e.target.value)}></input>
            {/* <input
              type="text"
              placeholder="search movie"
              
            /> */}
          </div>
        </form>
        <div className="card-error">
          <p>{isError.show && isError.msg}</p>
        </div>
      </section>
    </>
  );
};

export default Search;
