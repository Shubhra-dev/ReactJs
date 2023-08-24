import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "4fe6f855";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [selectedId, setSelectedID] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(
    function () {
      async function fetchMovies() {
        setError("");
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok) {
            throw new Error("Something Went Wrong!! 🔄");
          }
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("Movie Not Found!! ❌");
          }
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetchMovies();
    },
    [query]
  );
  function handleSelectedMovie(id) {
    setSelectedID(id);
  }
  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleBack() {
    setSelectedID(null);
  }
  function handleDeleteWatch(id) {
    setWatched(watched.filter((watched) => watched.imdbID !== id));
  }
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumMovies movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} selectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              id={selectedId}
              handleBack={handleBack}
              handleWatchedMovie={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} onDelete={handleDeleteWatch} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return <p className="loader">Loading....</p>;
}
function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>MoviePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NumMovies({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function MovieDetail({ id, handleBack, handleWatchedMovie, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map((watched) => watched.imdbID).includes(id);
  console.log(isWatched);
  useEffect(
    function () {
      setIsLoading(true);
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      fetchMovies();
    },
    [id]
  );
  function addToWatched() {
    const newMovie = {
      ...movie,
      userRating: userRating,
      Runtime:
        movie.Runtime === "N/A" ? 0 : Number(movie.Runtime.split(" ").at(0)),
    };
    handleWatchedMovie(newMovie);
    handleBack();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleBack}>
              X
            </button>
            <img src={movie.Poster} alt={`Poster of the ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>

              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>⭐{movie.imdbRating} IMDB Rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addToWatched}>
                      +Add To Watchlist
                    </button>
                  )}
                </>
              ) : (
                <p>You have already added this.</p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function MovieList({ movies, selectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => selectedMovie(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
// function WatchedBox({ children }) {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//
//         </>
//       )}
//     </div>
//   );
// }
function MovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => onDelete(movie.imdbID)}
            >
              x
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
