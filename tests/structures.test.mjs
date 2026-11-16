import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { AMINO_ACIDS, CATEGORIES, SPECIAL_FACTS } from '../data.js';
import { structureSvg } from '../structures.js';

assert.equal(AMINO_ACIDS.length, 20);
assert.equal(new Set(AMINO_ACIDS.map(a => a.id)).size, 20);
assert.equal(new Set(AMINO_ACIDS.map(a => a.one)).size, 20);
assert.equal(AMINO_ACIDS.filter(a => a.essential).length, 9);
assert.deepEqual(
  AMINO_ACIDS.filter(a => a.essential).map(a => a.one).sort(),
  ['H','I','L','K','M','F','T','W','V'].sort()
);
assert.ok(SPECIAL_FACTS.length >= 20);

const ids = new Set(AMINO_ACIDS.map(a => a.id));
for (const fact of SPECIAL_FACTS) assert.ok(ids.has(fact.answer), fact.question);

const rings = {
  phenylalanine: 'benzene-ring',
  tyrosine: 'benzene-ring',
  histidine: 'imidazole-ring',
  tryptophan: 'indole-five',
  proline: 'pro-bond'
};
for (const amino of AMINO_ACIDS) {
  assert.ok(CATEGORIES[amino.category], amino.id);
  assert.ok(amino.traits.length >= 3, amino.id);
  const svg = structureSvg(amino);
  assert.match(svg, /viewBox="0 0 500 250"/);
  assert.match(svg, /text-anchor="middle"/);
  assert.match(svg, new RegExp(`data-ring="${rings[amino.id] ? amino.id : 'none'}"`));
  if (rings[amino.id]) assert.ok(svg.includes(rings[amino.id]), amino.id);
  else assert.match(svg, /x1="200" y1="86" x2="200" y2="124"/);
}

if (process.argv.includes('--preview')) {
  const output = join(tmpdir(), 'amino-lab-structure-preview');
  mkdirSync(output, {recursive:true});
  for (const amino of AMINO_ACIDS) writeFileSync(join(output, `${amino.id}.svg`), structureSvg(amino));
  console.log(`SVG previews: ${output}`);
}
console.log('20 records, 20 SVG diagrams, 5 drawn rings and expanded facts: OK');
