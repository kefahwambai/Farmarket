import React from "react";

function DeleteMushroom({ id, onDelete }) {
  function handleClick() {
    onDelete(id);
  }

  return (
    <div>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
}

export default DeleteMushroom;
