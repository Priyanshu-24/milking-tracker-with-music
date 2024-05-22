const Modal = ({ isOpen, onSubmit }) => {
  if (!isOpen) return null;

  let milkQuantityInput;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(milkQuantityInput.value);
  };

  return (
    <div className="modal-container">
      <div className="modal-body">
        <h2>Enter Milk Quantity</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.1"
            ref={(input) => (milkQuantityInput = input)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
