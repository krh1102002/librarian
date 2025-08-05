import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const AddBookCopy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rackLocation: "2",
    condition: "good",
    notes: "",
    copyQuantity: "single",
    copyCount: 2,
    startingNumber: 6,
  });

  const [showBatchInputs, setShowBatchInputs] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, copyQuantity: value }));
    setShowBatchInputs(value === "multiple");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.rackLocation || !formData.condition) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      formData.copyQuantity === "multiple" &&
      (formData.copyCount < 2 || formData.copyCount > 20)
    ) {
      setError("Please enter a valid copy count (2-20).");
      return;
    }

    const successMessage =
      formData.copyQuantity === "single"
        ? `1 copy successfully added to Rack ${formData.rackLocation}!`
        : `${formData.copyCount} copies successfully added to Rack ${formData.rackLocation}!`;

    setMessage(successMessage);

    setTimeout(() => {
      if (
        window.confirm(
          "Copy(ies) added successfully! Would you like to add more copies?"
        )
      ) {
        setFormData((prev) => ({
          ...prev,
          notes: "",
          copyCount: 2,
        }));
        setMessage("");
      } else {
        navigate("/book-copies-management");
      }
    }, 1500);
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
      }}
    >
      <Layout>
        <div
          style={{
            background: "#fff",
            padding: "3rem",
            borderRadius: 10,
            border: "1px solid #e9ecef",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "2rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Add New Copy
            </h1>
            <p style={{ color: "#666", fontSize: "1.1rem" }}>
              Add physical copies to existing book inventory
            </p>
          </div>

          <div
            style={{
              background: "#f8f9fa",
              padding: "1.5rem",
              borderRadius: 8,
              border: "1px solid #e9ecef",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>
              Clean Code: A Handbook of Agile Software Craftsmanship
            </h3>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
              <em>by Robert C. Martin</em>
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                { label: "Current Copies", value: 5 },
                { label: "Available", value: 3 },
                { label: "Issued", value: 2 },
                { label: "Book Price", value: "₹2,499" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div
              style={{
                background: "#f8d7da",
                color: "#721c24",
                padding: "0.75rem",
                borderRadius: 5,
                marginBottom: "1rem",
                border: "1px solid #f5c6cb",
              }}
            >
              {error}
            </div>
          )}
          {message && (
            <div
              style={{
                background: "#d4edda",
                color: "#155724",
                padding: "0.75rem",
                borderRadius: 5,
                marginBottom: "1rem",
                border: "1px solid #c3e6cb",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "2px solid #e9ecef",
              }}
            >
              Copy Information
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <label>
                  Rack Location <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <select
                  name="rackLocation"
                  value={formData.rackLocation}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  {["", 1, 2, 3, 4, 5, 6, 7, 8].map((rack) => (
                    <option key={rack} value={rack}>
                      {rack ? `Rack ${rack}` : "Select Rack"}
                    </option>
                  ))}
                </select>
                <div style={helpText}>
                  Physical location where the copy will be placed
                </div>
              </div>
              <div>
                <label>
                  Condition <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select Condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                <div style={helpText}>Physical condition of the book copy</div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special notes about this copy..."
                style={{ ...inputStyle, resize: "vertical" }}
              ></textarea>
              <div style={helpText}>
                Optional notes about the copy's condition, acquisition, etc.
              </div>
            </div>

            <h2
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "2px solid #e9ecef",
              }}
            >
              Quantity Options
            </h2>
            <div
              style={{
                background: "#f8f9fa",
                padding: "1.5rem",
                borderRadius: 8,
                border: "1px solid #e9ecef",
              }}
            >
              <h3 style={{ color: "#333", marginBottom: "1rem" }}>
                How many copies would you like to add?
              </h3>
              <div
                style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}
              >
                {["single", "multiple"].map((val) => (
                  <label
                    key={val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="copyQuantity"
                      value={val}
                      checked={formData.copyQuantity === val}
                      onChange={handleQuantityChange}
                    />
                    {val === "single" ? "Single copy" : "Multiple copies"}
                  </label>
                ))}
              </div>

              {showBatchInputs && (
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div>
                      <label>Number of Copies</label>
                      <input
                        type="number"
                        name="copyCount"
                        min="2"
                        max="20"
                        value={formData.copyCount}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                      <div style={helpText}>How many copies to add (2-20)</div>
                    </div>
                    <div>
                      <label>Starting Copy Number</label>
                      <input
                        type="number"
                        name="startingNumber"
                        value={formData.startingNumber}
                        readOnly
                        style={inputStyle}
                      />
                      <div style={helpText}>Next available copy number</div>
                    </div>
                  </div>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    <strong>Note:</strong> All copies will be added with the
                    same rack location and condition settings.
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "2rem",
                paddingTop: "2rem",
                borderTop: "1px solid #e9ecef",
              }}
            >
              <button type="submit" style={btnStyle}>
                Add Copy to Inventory
              </button>
              <button
                type="button"
                onClick={() => navigate("/book-copies-management")}
                style={{
                  ...btnStyle,
                  background: "transparent",
                  color: "#333",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "2px solid #e9ecef",
  borderRadius: 5,
  fontSize: "1rem",
  fontFamily: "inherit",
  transition: "border-color 0.3s ease",
};

const helpText = {
  fontSize: "0.9rem",
  color: "#666",
  marginTop: "0.3rem",
};

const btnStyle = {
  padding: "0.75rem 1.5rem",
  border: "2px solid #333",
  background: "#333",
  color: "#fff",
  fontWeight: 500,
  borderRadius: 5,
  transition: "all 0.3s ease",
  cursor: "pointer",
  fontSize: "1rem",
};

export default AddBookCopy;
