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

function update(f, props) {}

function useComp(f, props, p) {
  if (!exist) {
    return f(props);
  } else {
  }
}

function R(props, self) {
  if (props.a === undefined) {
    return self;
  } else {
    console.log("render R");
    let dom = createDiv(`R={${props.a}}`);
    return { dom };
  }
}

function S(props, self) {
  if (props.b === undefined) {
    return self;
  } else {
    console.log("render S");
    let dom = createDiv(`S={${props.b}}`);
    return { dom };
  }
}

function P(props, self) {
  if (props.a === undefined && props.b === undefined) {
    return self;
  } else {
    console.log("render P");
    let r = R({ a: props.a }, self.r);
    let s = S({ b: props.b }, self.s);
    let dom = createDiv([r.dom, s.dom]);
    return { r, s, dom };
  }
}

function Q(props, self) {
  if (false) {
    return self;
  } else {
    console.log("render Q");
    let a = 0;
    let b = 0;

    let p = P({ a, b }, self.p);
    let inc_a = createButton(() => set_a(a + 1), "inc_a");
    let inc_b = createButton(() => set_b(b + 1), "inc_b");

    let dom = createDiv([p.dom, inc_a, inc_b]);

    function set_a(value) {
      a = value;
      p.update({ a });
    }

    return { dom };
  }
}

document.body.appendChild(Q().dom);

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
