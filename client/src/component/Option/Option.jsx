import React from "react";
import "./Option.scss";

function Option({ deleteData, get }) {
const removeData = async (deleteId) => {
  try {
    console.log("Attempting to delete item with ID:", deleteData);
    const res = await fetch(`/remove/${deleteId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("Response from delete request:", data);

    if (res.status === 400 || !data) {
      console.log("Error deleting item");
    } else {
      console.log("Item deleted successfully");
 
      get((prev) => prev.filter((item) => item.productId.id !== deleteId));
      
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

  return (
    <div className="add_remove_sellect">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p
        style={{ color: " #007185", cursor: "pointer" }}
        onClick={() => removeData(deleteData)}
      >
        Delete
      </p>
      <span>|</span>
      <p style={{ color: " #007185", cursor: "pointer" }}>See Or Later</p>
      <span>|</span>
      <p style={{ color: " #007185", cursor: "pointer" }}>See More Like This</p>
    </div>
  );
}

export default Option;
