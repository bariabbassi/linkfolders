const EditableItem = (props) => {
  const { name, changeName, removeNode, addChild } = props;

  return (
    <div className="EditableItem">
      <button
        className="EditableItem-Button EditableItem-Button_add"
        onClick={addChild}
      >
        +
      </button>

      <button
        className="EditableItem-Button EditableItem-Button_remove"
        onClick={removeNode}
      >
        x
      </button>

      <input
        className="EditableItem-Text"
        onChange={(e) => {
          changeName(e.target.value);
        }}
        value={name}
        placeholder="New Item"
      />
    </div>
  );
};

export default EditableItem;
