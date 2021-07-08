import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  const [formData, setFormData] = useState({
      name: '',
      image: ''
  })

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(resp=>resp.json())
    .then(data=>setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    })
    setToys([...toys, formData])
  }

  const handleDeleteClick = (e) => {
    const clickedToyId = parseInt(e.target.id)
    const toysWithoutDeletedToy = toys.filter(toy => toy.id !== clickedToyId)
    setToys(toysWithoutDeletedToy)
    fetch(`http://localhost:3001/toys/${clickedToyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
  }

  return (
    <>
      <Header />
      {showForm ? 
      <ToyForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
        setToys={setToys}
        handleDeleteClick={handleDeleteClick}
      />
    </>
  );
}

export default App;
