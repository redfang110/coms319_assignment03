import React, { useState } from "react";

function CreateView() {
  const [userInfoForm, setUserInfoForm] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    rate: "",
    count: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUserInfoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // id validation
    if (!userInfoForm.id.trim()) {
      isValid = false;
      errors.id = "id is required";
    }

    // title validation
    if (!userInfoForm.title.trim()) {
      isValid = false;
      errors.title = "title is required";
    }

    // price validation
    if (!userInfoForm.price.trim()) {
      isValid = false;
      errors.price = "price is required";
    }

    // description validation
    if (!userInfoForm.description.trim()) {
      isValid = false;
      errors.description = "description is required";
    }

    // category validation
    if (!userInfoForm.category.trim()) {
      isValid = false;
      errors.category = "category is required";
    }

    // imageUrl validation
    if (!userInfoForm.imageUrl.trim()) {
      isValid = false;
      errors.imageUrl = "imageUrl is required";
    }

    // rate validation
    if (!userInfoForm.rate.trim()) {
      isValid = false;
      errors.rate = "rate is required";
    }

    // count validation
    if (!userInfoForm.count.trim()) {
      isValid = false;
      errors.count = "count is required";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      fetch("http://localhost:8081/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfoForm),
      }).then((response) => {
        if (response.ok) {
          alert("Product added successfully!");
        }
        return response.json();
      });
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <div>
      {/* Form fields and validation feedback */}
      {/* Iterate over form fields */}
      {Object.entries(userInfoForm).map(([key, value]) => (
        <div className="mb-3" key={key}>
          <label htmlFor={key} className="form-label">
            {key.charAt(0).toUpperCase() +
              key
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()}
          </label>
          <input
            type={"text"}
            className={`form-control ${formErrors[key] ? "is-invalid" : ""}`}
            id={key}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={handleFormChange}
          />
          {formErrors[key] && (
            <div className="invalid-feedback">{formErrors[key]}</div>
          )}
        </div>
      ))}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CreateView;
