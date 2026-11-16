// The single source of truth for cards and questions. Neutral condensed structures are used.
export const AMINO_ACIDS = [
  {id:'glycine',name:'Glycine',zh:'甘胺酸',three:'Gly',one:'G',sideChain:'H',category:'nonpolar',traits:['最小的胺基酸','唯一沒有手性中心'],memoryTip:'側鏈只有 H，α 碳接了兩個氫。'},
  {id:'alanine',name:'Alanine',zh:'丙胺酸',three:'Ala',one:'A',sideChain:'CH₃',category:'nonpolar',traits:['小型疏水側鏈','側鏈是甲基'],memoryTip:'比 Gly 多一個 CH₃。'},
  {id:'valine',name:'Valine',zh:'纈胺酸',three:'Val',one:'V',sideChain:'CH(CH₃)₂',category:'nonpolar',traits:['支鏈胺基酸 BCAA','疏水'],memoryTip:'接在 α 碳旁的碳立刻分成兩個 CH₃。'},
  {id:'leucine',name:'Leucine',zh:'白胺酸',three:'Leu',one:'L',sideChain:'CH₂–CH(CH₃)₂',category:'nonpolar',traits:['支鏈胺基酸 BCAA','疏水'],memoryTip:'先走一個 CH₂，再分叉。'},
  {id:'isoleucine',name:'Isoleucine',zh:'異白胺酸',three:'Ile',one:'I',sideChain:'CH(CH₃)–CH₂–CH₃',category:'nonpolar',traits:['支鏈胺基酸 BCAA','側鏈具有第二個手性中心'],memoryTip:'第一個側鏈碳就分叉，和 Leu 的分叉位置不同。'},
  {id:'proline',name:'Proline',zh:'脯胺酸',three:'Pro',one:'P',sideChain:'(CH₂)₃ → N（成環）',category:'nonpolar',traits:['側鏈回接胺基氮','限制主鏈轉角'],memoryTip:'記得畫成五員環；它的胺基氮屬於次級胺。'},
  {id:'methionine',name:'Methionine',zh:'甲硫胺酸',three:'Met',one:'M',sideChain:'CH₂–CH₂–S–CH₃',category:'nonpolar',traits:['含硫','硫醚側鏈'],memoryTip:'硫夾在碳鏈中間，是硫醚，沒有 SH。'},
  {id:'phenylalanine',name:'Phenylalanine',zh:'苯丙胺酸',three:'Phe',one:'F',sideChain:'CH₂–C₆H₅（苯環）',category:'nonpolar',traits:['芳香族','疏水苯環'],memoryTip:'CH₂ 後面直接接苯環。'},
  {id:'tryptophan',name:'Tryptophan',zh:'色胺酸',three:'Trp',one:'W',sideChain:'CH₂–C₈H₆N（吲哚環）',category:'nonpolar',traits:['芳香族','側鏈含吲哚環'],memoryTip:'體積大的雙環；環內有一個 N。'},
  {id:'serine',name:'Serine',zh:'絲胺酸',three:'Ser',one:'S',sideChain:'CH₂–OH',category:'polar',traits:['帶羥基','可形成氫鍵'],memoryTip:'CH₂–OH 是最短的含羥基側鏈。'},
  {id:'threonine',name:'Threonine',zh:'蘇胺酸',three:'Thr',one:'T',sideChain:'CH(OH)–CH₃',category:'polar',traits:['帶羥基','側鏈具有第二個手性中心'],memoryTip:'OH 和 CH₃ 接在同一個側鏈碳上。'},
  {id:'cysteine',name:'Cysteine',zh:'半胱胺酸',three:'Cys',one:'C',sideChain:'CH₂–SH',category:'polar',traits:['帶硫醇基','兩個 Cys 可形成雙硫鍵'],memoryTip:'看到 SH 就想到雙硫鍵。'},
  {id:'tyrosine',name:'Tyrosine',zh:'酪胺酸',three:'Tyr',one:'Y',sideChain:'CH₂–C₆H₄–OH（對位）',category:'polar',traits:['芳香族','酚羥基'],memoryTip:'像 Phe 的苯環，再加一個對位 OH。'},
  {id:'asparagine',name:'Asparagine',zh:'天門冬醯胺',three:'Asn',one:'N',sideChain:'CH₂–C(=O)–NH₂',category:'polar',traits:['醯胺側鏈','極性但通常不帶電'],memoryTip:'Asp 的末端 OH 換成 NH₂。'},
  {id:'glutamine',name:'Glutamine',zh:'麩醯胺',three:'Gln',one:'Q',sideChain:'CH₂–CH₂–C(=O)–NH₂',category:'polar',traits:['醯胺側鏈','比 Asn 多一個 CH₂'],memoryTip:'Gln 比 Asn 長一個 CH₂。'},
  {id:'aspartic-acid',name:'Aspartic acid',zh:'天門冬胺酸',three:'Asp',one:'D',sideChain:'CH₂–C(=O)–OH',category:'acidic',traits:['酸性側鏈','生理 pH 下通常帶負電'],memoryTip:'酸的末端是 COOH；Asp 比 Glu 短。'},
  {id:'glutamic-acid',name:'Glutamic acid',zh:'麩胺酸',three:'Glu',one:'E',sideChain:'CH₂–CH₂–C(=O)–OH',category:'acidic',traits:['酸性側鏈','生理 pH 下通常帶負電'],memoryTip:'Glu 比 Asp 多一個 CH₂。'},
  {id:'lysine',name:'Lysine',zh:'離胺酸',three:'Lys',one:'K',sideChain:'(CH₂)₄–NH₂',category:'basic',traits:['鹼性側鏈','生理 pH 下通常帶正電'],memoryTip:'長碳鏈尾端是 NH₂。'},
  {id:'arginine',name:'Arginine',zh:'精胺酸',three:'Arg',one:'R',sideChain:'(CH₂)₃–NH–C(=NH)–NH₂',category:'basic',traits:['胍基側鏈','生理 pH 下通常帶正電'],memoryTip:'尾端胍基有三個 N。'},
  {id:'histidine',name:'Histidine',zh:'組胺酸',three:'His',one:'H',sideChain:'CH₂–C₃H₃N₂（咪唑環）',category:'basic',traits:['咪唑環','生理 pH 附近可接受或釋放質子'],memoryTip:'咪唑環有兩個 N；在生理 pH 不一定帶正電。'}
];

export const CATEGORIES = {
  nonpolar:{label:'非極性',description:'側鏈多以碳氫為主，通常偏疏水。',color:'mint'},
  polar:{label:'極性・無電荷',description:'側鏈可與水或其他基團形成氫鍵，通常不帶淨電荷。',color:'blue'},
  acidic:{label:'酸性',description:'側鏈帶羧基，生理 pH 下通常為負電。',color:'coral'},
  basic:{label:'鹼性',description:'側鏈可接受質子；Lys、Arg 常為正電，His 視環境而定。',color:'yellow'}
};

export const SPECIAL_FACTS = [
  {question:'哪一種胺基酸沒有手性中心？',answer:'glycine',explanation:'Gly 的側鏈就是 H，因此 α 碳連著兩個氫。'},
  {question:'哪一種胺基酸的側鏈可以形成雙硫鍵？',answer:'cysteine',explanation:'Cys 的 –SH（硫醇）可氧化形成雙硫鍵。'},
  {question:'哪一種胺基酸的側鏈會回接到胺基氮，形成五員環？',answer:'proline',explanation:'Pro 的側鏈回接主鏈 N，讓結構較受限制。'},
  {question:'哪一種胺基酸的側鏈有咪唑環？',answer:'histidine',explanation:'His 的咪唑環可在生理 pH 附近得失質子。'},
  {question:'哪一種胺基酸的側鏈是硫醚，而非硫醇？',answer:'methionine',explanation:'Met 是 –S–CH₃；Cys 才有 –SH。'},
  {question:'哪一種胺基酸具有吲哚環？',answer:'tryptophan',explanation:'Trp 的側鏈含有帶氮的吲哚雙環。'},
  {question:'哪一種胺基酸有帶羥基的芳香環？',answer:'tyrosine',explanation:'Tyr 具有對位酚羥基，Phe 沒有 OH。'},
  {question:'哪一種胺基酸的側鏈是胍基？',answer:'arginine',explanation:'Arg 的胍基含三個氮，屬鹼性側鏈。'}
];
