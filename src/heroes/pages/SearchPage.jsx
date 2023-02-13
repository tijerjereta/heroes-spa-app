import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate(); // Para obptener la navegacion
  const location = useLocation(); // para onbtener la ubicacio, path donde estamos!

  const { q = "" } = queryString.parse(location.search); // QueryStrin es un paquete que se usa para obtener
  //las variables limpias de las URLS,
  // Asi no las tenemos que procesar; se instala: yarn add query-string

  //console.log({ query });

  const heroes = getHeroesByName(q);

  const showSearch = q.length === 0; // Regresa un valor booleano, true or false, es como escribir  (q.length === 0) ? true : false
  const showError = q.length === 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const OnSearchSubmit = (event) => {
    event.preventDefault();
    //if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText.toLowerCase().trim()}`);
    console.log({ searchText });
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={OnSearchSubmit}>
            <input
              type="text"
              placeholder="Search a heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-4">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === "" ? (
            <div className="alert alert-primary animate__animated animate__fadeIn">
              Search a hero
            </div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger animate__animated animate__fadeIn">
                No Hero with <b>{q}</b>
              </div>
            )
          )}

          {/* <div
            className="alert alert-primary"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>
          <div
            className="alert alert-danger"
            style={{ display: showError ? "" : "none" }}
          >
            No Hero with <b>{q}</b>
          </div> */}

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
