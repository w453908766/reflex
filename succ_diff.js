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
  if (self.a === undefined) {
    console.log("render R");
    self.a = a;
    self.dom = createDiv(`R={${a}}`);
  } else if (a !== self.a) {
    console.log("update R");
    self.a = a;
    self.dom.textContent = `R={${a}}`;
  }
  return self;
}

function S({ b }, self) {
  if (self.b === undefined) {
    console.log("render S");
    self.b = b;
    self.dom = createDiv(`S={${b}}`);
  } else if (b !== self.b) {
    console.log("update S");
    self.b = b;
    self.dom.textContent = `S={${b}}`;
  }
  return self;
}

function P({ a, b }, self) {
  if (self.a === undefined || self.b === undefined) {
    console.log("render P");
    self.a = a;
    self.b = b;
    self.r = R({ a }, {});
    self.s = S({ b }, {});
    self.dom = createDiv([self.r.dom, self.s.dom]);
  } else if (a !== self.a || b !== self.b) {
    console.log("update P");
    self.a = a;
    self.b = b;
    R({ a }, self.r);
    S({ b }, self.s);
  }
  return self;
}

function Q({}, self) {
  console.log("render Q");
  let a = 0;
  let b = 0;
  self.p = P({ a, b }, {});
  let inc_a = createButton(() => set_a(a + 1), "inc_a");
  let inc_b = createButton(() => set_b(b + 1), "inc_b");
  self.dom = createDiv([self.p.dom, inc_a, inc_b]);

  function set_a(value) {
    a = value;
    P({ a, b }, self.p);
  }

  function set_b(value) {
    b = value;
    P({ a, b }, self.p);
  }
  return self;
}

let q = Q({}, {});

console.log(q);
document.body.appendChild(q.dom);

/*
function P(, { frr,fss }) {
  let rr = frr(
  let ss = fss

  let dom = createDiv([rr, ss]);

  return {
    bank: {
      frr: ({a}) => {
        if(a!==undefined){
          return R({a})
        }else {
          return rr
        }
      },
      fss: ({b}) => {
        if(b!==undefined){
          return S({b})
        }else {
          return ss
        }
      },
    },
    dom,
  };
}

function Q(props, self) {
  if(self !==null){
    return self
  } else {
  let a = 0;
  let b = 0;
  let p = useComp(P, { a }, p0);

  let inc_a = createButton(() => {
    set_a(a + 1);
  }, "inc_a");

  let inc_b = createButton(() => {
    set_b(b + 1);
  }, "inc_b");

  let dom = createDiv([p.dom, inc_a, inc_b]);

  function set_a(value) {
    a = value;
    p.update({ a });
  }

  return { dom };
}
*/
