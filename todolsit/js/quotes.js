const quotes = [
  {
    quote: "Life is a series of building, testing, changing and iterating",
    quoteko: "삶은 설계, 테스트, 변화와 실행의 연속이다.",
  },
  {
    quote: "It's the fastest when you think it's too late",
    quoteko: "늦었다고 생각할 때가 가장 빠르다.",
  },
  {
    quote: "Just Do It",
    quoteko: "그냥 해봐",
  }
]

const quote = document.querySelector(".quote span:first-child")
const quoteko = document.querySelector(".quote span:last-child")

console.log(quotes[Math.floor(Math.random() * quotes.length)]);

