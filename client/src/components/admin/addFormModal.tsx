const AddFormModal = ({ closeModal }: { closeModal: () => void }) => {
  const onSubmit = (event: React.FormEvent) => {
    console.log("submit");

    event.preventDefault();

    closeModal();
  };
  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit">등록하기</button>
    </form>
  );
};

export default AddFormModal;
