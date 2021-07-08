import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys, handleDeleteClick }) {
  return (
    <div id="toy-collection">
      {toys.map(toy => { return (
        <ToyCard
          key={toy.id}
          id={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          handleDeleteClick={handleDeleteClick}
          setToys={setToys}
        />
      )})}
    </div>
  );
}

export default ToyContainer;
