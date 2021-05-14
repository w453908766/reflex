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

function P({ a, b }) {
  let c = 0;
  let aa = createDiv(a);
  let bb = createDiv(b);
  let cc = createButton(() => {
    set_c(c + 1);
  }, c);

  function set_a(value) {
    a = value;
    aa.textContent = value;
  }

  function set_b(value) {
    b = value;
    bb.textContent = value;
  }

  function set_c(value) {
    c = value;
    cc.textContent = value;
  }

  let dom = createDiv([aa, bb, cc]);
  return {
    set a(value) {
      set_a(value);
    },
    set_b,
    dom,
  };
}

function Q() {
  let a = 0;
  let b = 0;
  let p = P({ a, b });
  let button = createButton(() => {
    set_a(a + 1);
  }, "inc_a");

  function set_a(value) {
    a = value;
    p.a = value;
  }

  let dom = createDiv([p.dom, button]);
  return { dom };
}

document.body.appendChild(Q().dom);
