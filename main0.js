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
  let dom = createDiv(`R={${a}}`);
  dom.state = { a };
  return dom;
}

function R1({ a }, self) {
  if (a !== undefined) {
    console.log("update R");
    self.state.a = a;
    self.textContent = `R={${self.state.a}}`;
  }
}

function S({ b }) {
  console.log("render S");
  let dom = createDiv(`S={${b}}`);
  dom.state = { b };
  return dom;
}

function S1({ b }, self) {
  if (b !== undefined) {
    console.log("update S");
    self.state.b = b;
    self.textContent = `S={${self.state.b}}`;
  }
}

function P({ a, b }) {
  console.log("render P");
  let factb = fact(b);
  let r = R({ a });
  let s = S({ b: factb });
  let dom = createDiv([r, s]);
  dom.state = { a, b };
  return dom;
}

function P1({ a, b }, self) {
  if (a !== undefined || b !== undefined) {
    console.log("update P");
    if (a !== undefined) self.state.a = a;
    if (b !== undefined) self.state.b = b;
    let factb = fact(self.state.b);

    R1({ a }, self.children[0]);
    S1({ b: factb }, self.children[1]);
  }
}

function Q1({ a, b }, self) {
  if (a !== undefined || b !== undefined) {
    console.log("update Q");
    if (a !== undefined) self.state.a = a;
    if (b !== undefined) self.state.b = b;
    P1({ a, b }, self.children[0]);
    self.children[1].textContent = self.state.a + self.state.b;
  }
}

function Q({}) {
  console.log("render Q");
  let a = 0;
  let b = 0;

  let p = P({ a, b });
  let sum = createDiv(a + b);
  let inc_a = createButton(() => set_a(a + 1), "inc_a");
  let inc_b = createButton(() => set_b(b + 1), "inc_b");
  let dom = createDiv([p, sum, inc_a, inc_b]);
  dom.state = { a, b };

  function set_a(value) {
    a = value;
    Q1({ a }, dom);
  }

  function set_b(value) {
    b = value;
    Q1({ b }, dom);
  }
  return dom;
}

let q = Q({});
document.body.appendChild(q);
