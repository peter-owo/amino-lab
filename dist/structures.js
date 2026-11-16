// Shared, neutral-form diagrams. All coordinates use the same 500 × 250 canvas.
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

function condensedSideChain(formula) {
  const [first, ...remainder] = formula.split('–');
  const size = formula.length > 21 ? 17 : formula.length > 14 ? 19 : 22;
  const firstWidth = first.length * size * 0.6;
  const rest = remainder.length ? `<text x="${200 + firstWidth / 2 + 5}" y="151" font-size="${size}" class="side">–${escapeHtml(remainder.join('–'))}</text>` : '';
  return `${bond(200, 86, 200, 124)}${atom(200, 151, escapeHtml(first), 'side', size)}${rest}`;
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
    ring === 'proline' ? pyrrolidine() : condensedSideChain(amino.sideChain);
  const accessibility = title ? `role="img" aria-label="${description}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="structure-svg" viewBox="0 0 500 250" data-ring="${ring}" ${accessibility}>${titleMarkup}${backbone(ring === 'proline')}${side}</svg>`;
}
