/**
 * Turntable: a platter on a round plinth carrying seventeen blocks, one for
 * each UN Sustainable Development Goal; the four ICSIFT works on (4, 8, 9, 17)
 * stand taller. An index arm reaches over the rim on the right. The pointer's
 * angle round the platter turns it, a detent at each goal, and the goal under
 * the index rises. Leaving returns goal 4 to the index. The slider is the rise.
 *
 * The pattern: a dial. The pointer is read on the platter's plane, which
 * never moves; its angle sets a spring target snapped to whole goals.
 */
const {
  Cam, circ, facing, fit, prism, proj, rad, rrect, spring, stepS, unproj,
  disposer, mk, place, pointer, put, register, solid,
} = HL;

const N = 17, STEP = (2 * Math.PI) / N, FOCUS = [4, 8, 9, 17];
const RB = 86, RP = 76, ZB = 9, ZP = 15, R0 = 50, R1 = 71, BW = 14, HLO = 5, HHI = 22, RMAX = 22;
const INDEX = rad(-45), HOME = INDEX - 3 * STEP;
const NAMES = ["poverty", "hunger", "health", "education", "gender", "water", "energy", "work", "industry",
  "inequality", "cities", "consumption", "climate", "oceans", "land", "peace", "partnership"];

/** Turns a ring of samples (u along the radius, v across it) to angle a. */
const turn = (ring, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return ring.map((q) => ({ u: q.u * c - q.v * s, v: q.u * s + q.v * c, nu: q.nu * c - q.nv * s, nv: q.nu * s + q.nv * c }));
};
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;

  const C = Cam(45, 0.5, 1.72);
  fit(C, [[-RB, -RB, 0], [RB, RB, 0], [RB, -RB, 0], [-RB, RB, 0], [0, 0, ZP + HHI + RMAX + 8]], 200, 178);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  const disc = (r, b, z0, z1, n) => {
    const s = solid(g);
    put(s, prism(P, front, circ(r, n), circ(r - b, n), z0, z1));
    s.cr.classList.add("lo");
    return s;
  };
  disc(RB, 2, 0, ZB, 64);
  disc(RP, 1.6, ZB, ZP, 64);
  // a groove on the platter, inside the ring of blocks
  mk("path", { d: "M" + circ(R0 - 6, 48).map((q) => P(q.u, q.v, ZP).join(" ")).join("L") + "Z", class: "nf lo" }, g);

  // The blocks and the hub are re-ordered by depth each frame: one group each.
  const blocks = [];
  const foot = rrect(R0, -BW / 2, R1, BW / 2, 3, 4), crease = rrect(R0 + 1.2, -BW / 2 + 1.2, R1 - 1.2, BW / 2 - 1.2, 1.8, 4);
  for (let k = 0; k < N; k++) {
    const n = k + 1, h = FOCUS.includes(n) ? HHI : HLO;
    blocks.push({ n, h, el: solid(g), depth: 0 });
  }
  const hub = { el: solid(g), depth: 0 };
  put(hub.el, prism(P, front, circ(9, 32), circ(7.6, 32), ZP, ZP + 7));
  hub.el.cr.classList.add("lo");

  // The index: a post on the plinth's rim and an arm reaching over the blocks, with a bright tip.
  const ix = Math.cos(INDEX), iy = Math.sin(INDEX), zArm = ZP + HHI + RMAX + 4;
  const post = solid(g);
  put(post, prism(P, front, turn(rrect(RB - 9, -4, RB - 1, 4, 3, 4), INDEX), turn(rrect(RB - 8, -3, RB - 2, 3, 2, 4), INDEX), ZB, zArm + 3));
  const arm = solid(g);
  put(arm, prism(P, front, turn(rrect(R1 - 12, -2, RB - 5, 2, 1.8, 4), INDEX), turn(rrect(R1 - 11, -1, RB - 6, 1, 0.8, 4), INDEX), zArm, zArm + 3));
  const tip = mk("circle", { r: 1.4, class: "dot" }, g);
  place(tip, P(ix * (R1 - 9), iy * (R1 - 9), zArm + 3));

  // theta: the platter's angle, on a spring; lift: how far the goal at the index rises, on a spring.
  const spin = spring(HOME), rise = spring(0);
  let engaged = false, lit = -1, drawn = '', acc = 0, prevA = null;

  /** The goal whose block centre is nearest the index at angle th. */
  const under = (th) => ((Math.round(wrap(INDEX - th) / STEP) % N) + N) % N;

  function draw() {
    const theta = spin.x, k = under(spin.t), key = theta.toFixed(4) + '/' + rise.x.toFixed(3) + '/' + k;
    if (key === drawn) return;
    drawn = key;
    for (let j = 0; j < N; j++) {
      const bl = blocks[j], an = theta + j * STEP, h = bl.h + (j === k && engaged ? rise.x : 0);
      put(bl.el, prism(P, front, turn(foot, an), turn(crease, an), ZP, ZP + h));
      bl.el.cr.classList.add('lo');
      bl.depth = Math.cos(an) + Math.sin(an);
    }
    // paint far to near; the hub sits at depth 0, the index after everything
    for (const o of blocks.concat([hub]).sort((p, q) => p.depth - q.depth)) g.appendChild(o.el.g);
    g.appendChild(post.g); g.appendChild(arm.g); g.appendChild(tip);
    if (k !== lit) { if (lit >= 0) blocks[lit].el.sil.classList.remove('hi'); lit = k; blocks[k].el.sil.classList.add('hi'); }
    read.textContent = engaged ? String(k + 1).padStart(2, '0') + ' · ' + NAMES[k] : 'rest';
  }

  const B = register(stage, (dt) => {
    const m1 = stepS(spin, dt), m2 = stepS(rise, dt);
    draw();
    return m1 || m2;
  });
  bag.add(B.unregister);

  /** The pointer's angle on the platter's plane (which never moves) turns the platter, caught by detents at whole goals. */
  bag.add(pointer(stage, {
    move: ([sx, sy]) => {
      const [x, y] = unproj(C, sx, sy, ZP);
      if (Math.hypot(x, y) > RB + 8) return;
      const an = Math.atan2(y, x);
      acc = prevA === null ? wrap(an - INDEX) : acc + wrap(an - prevA);
      prevA = an; engaged = true;
      spin.t = HOME + Math.round(acc / STEP) * STEP;
      rise.t = lift;
      B.wake();
    },
    leave: () => {
      engaged = false; prevA = null; acc = 0;
      spin.t = HOME + Math.round((spin.x - HOME) / (2 * Math.PI)) * 2 * Math.PI;
      rise.t = 0;
      B.wake();
    },
  }));
  bag.add(() => svg.replaceChildren());
  draw();

  return {
    set: (v) => { lift = v; if (engaged) { rise.t = v; B.wake(); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "turntable",
  means: "A platter with a block for each of the 17 SDGs, ICSIFT's four taller: circle it and each goal turns to the index.",
  rules: [1, 5, 8, 9],
  range: [6, 14, 22],
  tour: [[120, 210], [200, 250], [290, 200], [270, 130], null],
  mount,
});
