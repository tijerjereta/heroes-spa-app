import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./HeroCard";

export const HeroList = (publisher) => {
  //console.log(publisher);
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  //   console.log(heroes);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
