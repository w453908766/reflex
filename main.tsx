/*
function createElement(f, props){
  let dom = f(props)
}

function P({ a, b }) {
  return createElement(
    "div",
    createElement(R, { a: a }),
    createElement(S, { b: b })
  );
}

function P1({ a, b }, self) {
  if (a !== undefined || b !== undefined) {
    R({ a: a }, self.children[0]);
    S({ b: b }, self.children[1]);
  }
}
*/
function R({ a }) {
  return <div>R={a}</div>;
}

function S({ fb }) {
  return <div>S={fb}</div>;
}

function P({ a, fb }) {
  return (
    <div>
      <R a={a} />
      <S fb={fb} />
    </div>
  );
}

function Q({}) {
  let a = 0;
  let b = 0;
  let factb = fact(b);
  return (
    <div>
      <P a={a} fb={factb} />
      <div>{a + b}</div>
      <button onclick={() => (a = a + 1)}>inc_a</button>
      <button onclick={() => (b = b + 1)}>inc_b</button>
    </div>
  );
}

let q = Q({});
document.body.appendChild(q.dom);
