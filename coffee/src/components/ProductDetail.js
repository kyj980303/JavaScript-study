import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "ProductDetail";
  $target.appendChild($component);
  console.log(initialState);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  // 선택 값이 변경된 직후에 이벤트가 발생
  $component.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value);
      const { product, selectedOptions } = this.state;
      const option = product.productOptions.find(
        (option) => option.id == selectedOptionId
      );
      const selectedOption = selectedOptions.find(
        (selectedOption) => selectedOption.optionId === selectedOptionId
      );

      if (option && !selectedOption) {
        const newSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];

        this.setState({
          ...this.state,
          selectedOptions: newSelectedOptions,
        });
      }
    }
  });

  this.render = () => {
    const { product } = this.state;
    $component.innerHTML = `
      <img src="${product.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map(
              (option) => `
              <option value="${option.id}" ${
                option.stock === 0 ? "disabled" : ""
              }>
                ${option.stock === 0 ? "(품절) " : ""}${product.name} ${
                option.name
              } ${option.price > 0 ? `(+${option.price}원)` : ""}
              </option>
            `
            )
            .join("")}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;

    new SelectedOptions({
      $target: $component.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    }).render();
  };
}
