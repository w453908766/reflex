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

function R({ a }) {
  console.log("render R");
  let dom = createDiv(`R={${a}}`);
  dom.state = { a };
  return dom;
}

function S({ b }) {
  console.log("render S");
  let dom = createDiv(`S={${b}}`);
  dom.state = { b };
  return dom;
}

function P({ c }) {
  return c ? <R a={5} /> : <S b={10} />;
}

function P({ c, a, b }) {
  let cc = c ? R({ a }) : S({ b });
  dom.state = { c, a, b };
  return dom;
}

function P1({ c, a, b }, self) {
  if (c !== undefined || a !== undefined || b !== undefined) {
    console.log("update P");
    if (c !== undefined) self.state.c = c;
    if (a !== undefined) self.state.a = a;
    if (b !== undefined) self.state.b = b;
    let cc = c ? R({ a }) : S({ b });
    self.replaceChild(cc, self.children[0]);
  }
}

function Q({}) {
  console.log("render Q");
  let c = 0;

  let p = P({ c, a: 5, b: 10 });
  let toggle = createButton(() => set_c(!c), "toggle");
  let dom = createDiv([p, toggle]);
  dom.state = { c };

  function set_c(value) {
    c = value;
    P1({ c }, p);
  }
  return dom;
}

let q = Q({});
document.body.appendChild(q);
