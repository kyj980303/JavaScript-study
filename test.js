
function power(a,b) {
  if (b) {
    let output = 1;

    for (let i = 1; i < b; i++){
      output *= a;
    }
    console.log(output);
  } else {
    output = a * a;
  }
}


power(2);
power(2,3);