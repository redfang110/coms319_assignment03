import React, { useState } from "react";

function DeleteView() {
  const [view, setView] = useState();

  function ShowProductToDelete(input) {
    setView(<p>Error, no product found with id {input}</p>);
    fetch("http://localhost:8081/products/" + input).then((response) => {
      if (response.status === 200) { // status always 200 even though nodemon captures status as 404????
        return response.json().then((product) => ShowProduct(product));
      } else {
        setView(<p>Error, no product found with id {input}</p>);
      }
    });
  }

  function ShowProduct(product) {
    setView(
        <div>
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{
                  objectFit: "contain",
                  maxHeight: "300px",
                  maxWidth: "300px",
                  height: "auto",
                  width: "auto",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
          <button onClick={() => DeleteProduct(product.id)}>Confirm Delete</button>
        </div>
    );
  }

  function DeleteProduct(id) {
    fetch(`http://localhost:8081/Products/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then(alert("Product deleted successfully!"))
      .then(setView(<></>));
  }

  return (
    <div>
      <input id="delete-one-input"></input> {" "}
      <button
        onClick={() => {
          const inputValue = document.getElementById("delete-one-input").value;
          ShowProductToDelete(inputValue);
        }}
        id="delete-one-submit-button"
      >
        Delete Product
      </button>
      <br />
      <br />
      { view }
    </div>
  );
}

export default DeleteView;
