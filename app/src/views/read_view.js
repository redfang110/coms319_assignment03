import React, { useState } from "react";

function ReadView() {
  const [view, setView] = useState();

  function ShowAll() {
    fetch("http://localhost:8081/products")
      .then((response) => response.json())
      .then((products) => ShowProducts(products));
  }

  function ShowProducts(products) {
    setView(
      <div>
        {products.map((product) => {
          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    objectFit: "contain",
                    maxHeight: "300px",
                    maxWidth: "300px",
                    height: "auto",
                    width: "auto",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function ShowOne(input) {
    setView(<p>Error, no product found with id {input}</p>);
    fetch("http://localhost:8081/products/" + input).then((response) => {
      if (response.status === 200) { // status always 200 even though nodemon captures status as 404????
        return response.json().then((product) => ShowOneProduct(product));
      } else {
        setView(<p>Error, no product found with id {input}</p>);
      }
    });
  }

  function ShowOneProduct(product) {
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
      </div>
    );
  }

  return (
    <div>
      <input id="read-one-input"></input>{" "}
      <button
        onClick={() => {
          const inputValue = document.getElementById("read-one-input").value;
          ShowOne(inputValue);
        }}
        id="read-one-submit-button"
      >
        One Product
      </button>
      <br />
      <br />
      <button onClick={() => ShowAll()} id="read-all-button">
        All Products
      </button>
      <br />
      <br />
      {view}
    </div>
  );
}

export default ReadView;
