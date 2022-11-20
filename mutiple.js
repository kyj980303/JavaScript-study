/* min부터 max까지 곱하는 메소드 만들기 */
function multiple(min, max) {
  let output = 1;
  for (let i = min; i <= max; i++) {
    output *= i;
  }
  return output;
}
console.log(multiple(1, 10));