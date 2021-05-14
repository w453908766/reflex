function createDiv(option) {
  let div = document.createElement("div");
  if (typeof option !== "object") {
    div.textContent = option;
  } else {
    for (let child of option) {
      div.appendChild(child);
    }
  }
  return div;
}

function createButton(click, textContent) {
  let button = document.createElement("button");
  button.onclick = click;
  button.textContent = textContent;
  return button;
}

function fact(n) {
  if (n === 0) return 1;
  else return n * fact(n - 1);
}

function R({ a }) {
  console.log("render R");
  return createDiv(`R={${a}}`);
}

function R1({ a }, self) {
  if (a !== undefined) {
    console.log("update R");
    self.textContent = `R={${a}}`;
  }
}

function S({ b }) {
  console.log("render S");
  return createDiv(`S={${b}}`);
}

function S1({ b }, self) {
  if (b !== undefined) {
    console.log("update S");
    self.textContent = `S={${b}}`;
  }
}

function P({ a, b }) {
  console.log("render P");
  let factb = fact(b);
  let r = R({ a });
  let s = S({ b: factb });
  return createDiv([r, s]);
}

function P1({ a, b }, self) {
  if (a !== undefined || b !== undefined) {
    console.log("update P");
    let factb = fact(b);
    R1({ a }, self.children[0]);
    S1({ b: factb }, self.children[1]);
  }
}

function Q({}) {
  console.log("render Q");
  let a = 0;
  let b = 0;

  let p = P({ a, b });
  let inc_a = createButton(() => set_a(a + 1), "inc_a");
  let inc_b = createButton(() => set_b(b + 1), "inc_b");
  let dom = createDiv([p, inc_a, inc_b]);

  function set_a(value) {
    a = value;
    P1({ a }, p);
  }

  function set_b(value) {
    b = value;
    P1({ b }, p);
  }
  return dom;
}

let q = Q({});
document.body.appendChild(q);
