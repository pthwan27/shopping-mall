const AddFormModal = ({ closeModal }: { closeModal: () => void }) => {
  const onSubmit = (event: React.FormEvent) => {
    console.log("submit");

    event.preventDefault();

    closeModal();
  };
  const onClose = () => {
    closeModal();
  };
  return (
    <div id="add-item__div">
      <form onSubmit={onSubmit}>
        <label className="item-title">상품 등록하기</label>

        <label>
          title :<input name="title" type="text" required></input>
        </label>

        <label>
          이미지 URL :<input name="imageUrl" type="text" required></input>
        </label>

        <label>
          상품 가격 :<input name="price" type="number" required min={0}></input>
        </label>

        <label>
          상품 설명 :<input name="description" type="text" required></input>
        </label>
        <div className="item-buttons">
          <button id="add_item_close__btn" type="button" onClick={onClose}>
            뒤로가기
          </button>
          <button type="submit">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default AddFormModal;
