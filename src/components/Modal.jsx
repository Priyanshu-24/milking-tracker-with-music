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
        <h2 className="font-semibold text-lg">
          Enter Milk Quantity (in liters)
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.1"
            ref={(input) => (milkQuantityInput = input)}
            required
            className="border border-black rounded my-4 mr-2 p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
