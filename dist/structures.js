// Shared, neutral-form diagrams. All coordinates use the same 500 × 260 canvas.
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const atom = (x, y, label, className = '', size = 23) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" class="${className}">${label}</text>`;

const bond = (x1, y1, x2, y2, extraClass = '') =>
  `<line class="bond ${extraClass}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;

function backbone(proline = false) {
  const nitrogenX = proline ? 140 : 75;
  const alphaX = proline ? 210 : 200;
  const carbonX = proline ? 292 : 285;
  const firstBond = proline ? bond(166, 68, 187, 68) : bond(111, 68, 175, 68);
  return `${firstBond}${bond(proline ? 234 : 224, 68, carbonX - 15, 68)}${bond(carbonX + 16, 68, 341, 68)}
    ${bond(carbonX - 5, 53, carbonX - 5, 34)}${bond(carbonX + 5, 53, carbonX + 5, 34)}
    ${atom(nitrogenX, 77, proline ? 'HN' : 'H₂N')}${atom(alphaX, 77, 'CH')}${atom(carbonX, 77, 'C')}${atom(carbonX, 26, 'O')}${atom(370, 77, 'OH')}`;
}

const sideNode = (label, x, y = 145) => ({label, x, y});

// Every displayed carbon and functional group is a node. In particular,
// Val/Leu/Ile/Thr branches are bonds between separate CH and CH₃ labels.
const SIDE_CHAINS = {
  glycine: {nodes:{a:sideNode('H',200)},edges:[]},
  alanine: {nodes:{a:sideNode('CH₃',200)},edges:[]},
  valine: {nodes:{a:sideNode('CH',200),b:sideNode('CH₃',125),c:sideNode('CH₃',275)},edges:[['a','b'],['a','c']]},
  leucine: {nodes:{a:sideNode('CH₂',200),b:sideNode('CH',280),c:sideNode('CH₃',365),d:sideNode('CH₃',280,215)},edges:[['a','b'],['b','c'],['b','d']]},
  isoleucine: {nodes:{a:sideNode('CH',200),b:sideNode('CH₃',125),c:sideNode('CH₂',280),d:sideNode('CH₃',365)},edges:[['a','b'],['a','c'],['c','d']]},
  methionine: {nodes:{a:sideNode('CH₂',200),b:sideNode('CH₂',270),c:sideNode('S',340),d:sideNode('CH₃',410)},edges:[['a','b'],['b','c'],['c','d']]},
  serine: {nodes:{a:sideNode('CH₂',200),b:sideNode('OH',280)},edges:[['a','b']]},
  threonine: {nodes:{a:sideNode('CH',200),b:sideNode('OH',125),c:sideNode('CH₃',280)},edges:[['a','b'],['a','c']]},
  cysteine: {nodes:{a:sideNode('CH₂',200),b:sideNode('SH',280)},edges:[['a','b']]},
  asparagine: {nodes:{a:sideNode('CH₂',200),b:sideNode('C',280),c:sideNode('O',280,215),d:sideNode('NH₂',360)},edges:[['a','b'],['b','c',2],['b','d']]},
  glutamine: {nodes:{a:sideNode('CH₂',200),b:sideNode('CH₂',270),c:sideNode('C',340),d:sideNode('O',340,215),e:sideNode('NH₂',420)},edges:[['a','b'],['b','c'],['c','d',2],['c','e']]},
  'aspartic-acid': {nodes:{a:sideNode('CH₂',200),b:sideNode('C',280),c:sideNode('O',280,215),d:sideNode('OH',360)},edges:[['a','b'],['b','c',2],['b','d']]},
  'glutamic-acid': {nodes:{a:sideNode('CH₂',200),b:sideNode('CH₂',270),c:sideNode('C',340),d:sideNode('O',340,215),e:sideNode('OH',420)},edges:[['a','b'],['b','c'],['c','d',2],['c','e']]},
  lysine: {nodes:{a:sideNode('CH₂',200),b:sideNode('CH₂',265),c:sideNode('CH₂',330),d:sideNode('CH₂',395),e:sideNode('NH₂',465)},edges:[['a','b'],['b','c'],['c','d'],['d','e']]},
  arginine: {nodes:{a:sideNode('CH₂',200),b:sideNode('CH₂',255),c:sideNode('CH₂',310),d:sideNode('NH',365),e:sideNode('C',410),f:sideNode('NH₂',470),g:sideNode('NH',410,215)},edges:[['a','b'],['b','c'],['c','d'],['d','e'],['e','f'],['e','g',2]]}
};

function sideBond(a, b, order = 1) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length, uy = dy / length;
  const atomRadius = node => Math.max(11, node.label.length * 5.4 + 5);
  const x1 = a.x + ux * atomRadius(a), y1 = a.y + uy * atomRadius(a);
  const x2 = b.x - ux * atomRadius(b), y2 = b.y - uy * atomRadius(b);
  if (order === 1) return bond(Math.round(x1),Math.round(y1),Math.round(x2),Math.round(y2));
  const ox = -uy * 3.5, oy = ux * 3.5;
  return `${bond(Math.round(x1+ox),Math.round(y1+oy),Math.round(x2+ox),Math.round(y2+oy),'double-bond')}
    ${bond(Math.round(x1-ox),Math.round(y1-oy),Math.round(x2-ox),Math.round(y2-oy),'double-bond')}`;
}

function expandedSideChain(id) {
  const graph = SIDE_CHAINS[id];
  if (!graph) throw new Error(`Missing side-chain drawing: ${id}`);
  const size = ['lysine','arginine'].includes(id) ? 20 : 22;
  const bonds = graph.edges.map(([from,to,order]) => sideBond(graph.nodes[from],graph.nodes[to],order)).join('');
  const labels = Object.values(graph.nodes).map(node => atom(node.x,node.y+8,node.label,'side',size)).join('');
  return `${bond(200,86,200,124)}${bonds}${labels}`;
}

function benzene(withHydroxyl) {
  // The upper ring carbon bonds to the beta CH₂; the bottom carbon is para.
  const vertices = '200,160 227,175 227,205 200,220 173,205 173,175';
  return `${bond(200, 86, 200, 113)}${atom(200, 140, 'CH₂', 'side', 21)}${bond(200, 145, 200, 160)}
    <polygon class="bond benzene-ring" points="${vertices}" fill="none"/>
    ${bond(202, 166, 221, 177, 'double-bond')}${bond(221, 202, 201, 213, 'double-bond')}${bond(179, 202, 179, 178, 'double-bond')}
    ${withHydroxyl ? `${bond(200, 220, 200, 231)}${atom(200, 249, 'OH', 'side', 20)}` : ''}`;
}

function imidazole() {
  // Neutral 1H-imidazol-4-yl tautomer: C4 is attached to CH₂.
  return `${bond(200, 86, 200, 113)}${atom(200, 140, 'CH₂', 'side', 21)}${bond(200, 145, 200, 160)}
    <polygon class="bond imidazole-ring" points="200,160 230,174 219,214 181,214 170,174" fill="none"/>
    ${bond(202, 166, 223, 177, 'double-bond')}${bond(177, 180, 185, 205, 'double-bond')}
    <circle class="ring-atom-bg" cx="170" cy="174" r="11"/>${atom(170, 181, 'N', 'ring-atom', 17)}
    <circle class="ring-atom-bg" cx="219" cy="214" r="15"/>${atom(219, 221, 'NH', 'ring-atom', 16)}`;
}

function indole() {
  // Indol-3-yl: the beta CH₂ bonds to C3 of the five-membered ring.
  return `${bond(200, 86, 200, 113)}${atom(200, 140, 'CH₂', 'side', 21)}${bond(195, 145, 188, 157)}
    <polygon class="bond indole-five" points="188,157 158,175 168,211 208,220 226,184" fill="none"/>
    <polygon class="bond indole-six" points="226,184 259,173 284,197 274,225 241,239 208,220" fill="none"/>
    ${bond(183, 164, 162, 177, 'double-bond')}${bond(214, 213, 227, 189, 'double-bond')}
    ${bond(259, 180, 277, 198, 'double-bond')}${bond(267, 222, 243, 232, 'double-bond')}
    <circle class="ring-atom-bg" cx="168" cy="211" r="15"/>${atom(168, 218, 'NH', 'ring-atom', 16)}`;
}

function pyrrolidine() {
  // The backbone N and alpha carbon are two vertices of proline's five-membered ring.
  return `${bond(145, 86, 128, 114, 'pro-bond')}${bond(130, 144, 165, 168, 'pro-bond')}
    ${bond(192, 169, 219, 144, 'pro-bond')}${bond(224, 115, 215, 86, 'pro-bond')}
    ${atom(120, 139, 'CH₂', 'side', 18)}${atom(180, 186, 'CH₂', 'side', 18)}${atom(230, 139, 'CH₂', 'side', 18)}`;
}

export function structureSvg(amino, title = true) {
  const ring = ['phenylalanine', 'tyrosine', 'histidine', 'tryptophan', 'proline'].includes(amino.id) ? amino.id : 'none';
  const description = escapeHtml(`中性簡式結構；側鏈 ${amino.sideChain}`);
  const titleMarkup = title ? `<title>${description}</title>` : '';
  const side = ring === 'phenylalanine' ? benzene(false) : ring === 'tyrosine' ? benzene(true) :
    ring === 'histidine' ? imidazole() : ring === 'tryptophan' ? indole() :
    ring === 'proline' ? pyrrolidine() : expandedSideChain(amino.id);
  const accessibility = title ? `role="img" aria-label="${description}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="structure-svg" viewBox="0 0 500 260" data-ring="${ring}" ${accessibility}>${titleMarkup}${backbone(ring === 'proline')}${side}</svg>`;
}
