import { heroes } from "../data/heroes";

export const getHeroesByPublisher = ({ publisher }) => {
  const validPublishers = ["DC Comics", "Marvel Comics"];
  //   console.log(publisher.publisher);
  if (!validPublishers.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`);
  }

  return heroes.filter((heroe) => heroe.publisher === publisher);
};
