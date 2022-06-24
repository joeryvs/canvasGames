console.log("hello");

const e = 63;
const r = 65;
console.log(e);
console.log(e.toString(2));
console.log(r);
console.log(r.toString(2));

let a = binary(45);
a;
console.log(binary(r));
console.log(binary(e));
function binary(num) {
  return num.toString(2).padStart(8, "0");
}
