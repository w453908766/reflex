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

function R({ a }, self) {
  if (self.dom === undefined) {
    console.log("render R");
    self.dom = createDiv(`R={${a}}`);
  } else if (a !== undefined) {
    console.log("update R");
    self.dom.textContent = `R={${a}}`;
  }
  return self;
}

function S({ b }, self) {
  if (self.dom === undefined) {
    console.log("render S");
    self.dom = createDiv(`S={${b}}`);
  } else if (b !== undefined) {
    console.log("update S");
    self.dom.textContent = `S={${b}}`;
  }
  return self;
}

function P({ a, b }, self) {
  if (self.dom === undefined) {
    console.log("render P");
    self.r = R({ a }, {});
    self.s = S({ b }, {});
    self.dom = createDiv([self.r.dom, self.s.dom]);
  } else if (a !== undefined || b !== undefined) {
    console.log("update P");
    R({ a }, self.r);
    S({ b }, self.s);
  }
  return self;
}

function Q({}, self) {
  if (self.dom === undefined) {
    console.log("render Q");
    let a = 0;
    let b = 0;
    self.p = P({ a, b }, {});
    let inc_a = createButton(() => set_a(a + 1), "inc_a");
    let inc_b = createButton(() => set_b(b + 1), "inc_b");
    self.dom = createDiv([self.p.dom, inc_a, inc_b]);

    function set_a(value) {
      a = value;
      P({ a }, self.p);
    }

    function set_b(value) {
      b = value;
      P({ b }, self.p);
    }
  }
  return self;
}

let q = Q({}, {});
document.body.appendChild(q.dom);
