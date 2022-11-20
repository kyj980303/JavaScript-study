class Product {
  constructor(name, weight, price) {
    this.name = name,
    this.weight = weight,
    this.price = (weight / 100) * 1690;
  }

  Calculate(weight) {
    console.log(`${this.name}의 가격은 ${this.price}원 입니다.`)
  }
}

let product = new Product('돼삼', 200)

product.Calculate();