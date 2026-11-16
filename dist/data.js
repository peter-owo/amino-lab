// The single source of truth for cards and questions. Neutral structures are used.
export const AMINO_ACIDS = [
  {id:'glycine',name:'Glycine',zh:'甘胺酸',three:'Gly',one:'G',sideChain:'H',category:'nonpolar',essential:false,traits:['最小、唯一沒有手性中心','側鏈只有 H；主鏈較靈活','非必需胺基酸'],memoryTip:'側鏈只有 H，α 碳接了兩個氫。'},
  {id:'alanine',name:'Alanine',zh:'丙胺酸',three:'Ala',one:'A',sideChain:'CH₃',category:'nonpolar',essential:false,traits:['側鏈是甲基，非極性','葡萄糖－丙胺酸循環可運送氮','可由丙酮酸轉胺生成'],memoryTip:'比 Gly 多一個 CH₃。'},
  {id:'valine',name:'Valine',zh:'纈胺酸',three:'Val',one:'V',sideChain:'CH(CH₃)₂',category:'nonpolar',essential:true,traits:['必需胺基酸、支鏈胺基酸 BCAA','側鏈在第一個碳就分叉','分解代謝屬生糖性'],memoryTip:'接在 α 碳旁的碳立刻分成兩個 CH₃。'},
  {id:'leucine',name:'Leucine',zh:'白胺酸',three:'Leu',one:'L',sideChain:'CH₂–CH(CH₃)₂',category:'nonpolar',essential:true,traits:['必需胺基酸、支鏈胺基酸 BCAA','BCAA 中唯一純生酮','先 CH₂ 再分叉'],memoryTip:'先走一個 CH₂，再分叉。'},
  {id:'isoleucine',name:'Isoleucine',zh:'異白胺酸',three:'Ile',one:'I',sideChain:'CH(CH₃)–CH₂–CH₃',category:'nonpolar',essential:true,traits:['必需胺基酸、支鏈胺基酸 BCAA','側鏈另有一個手性中心','分解代謝兼具生糖與生酮'],memoryTip:'第一個側鏈碳就分叉，和 Leu 的分叉位置不同。'},
  {id:'proline',name:'Proline',zh:'脯胺酸',three:'Pro',one:'P',sideChain:'(CH₂)₃ → N（成環）',category:'nonpolar',essential:false,traits:['側鏈回接胺基氮，形成五員環','胺基氮屬次級胺','限制主鏈角度，常使 α 螺旋轉折'],memoryTip:'看五員環：N 和 α 碳都在環上。'},
  {id:'methionine',name:'Methionine',zh:'甲硫胺酸',three:'Met',one:'M',sideChain:'CH₂–CH₂–S–CH₃',category:'nonpolar',essential:true,traits:['必需、含硫胺基酸','硫醚側鏈，沒有 –SH','AUG 起始密碼子編碼 Met'],memoryTip:'硫夾在碳鏈中間；Cys 才有 –SH。'},
  {id:'phenylalanine',name:'Phenylalanine',zh:'苯丙胺酸',three:'Phe',one:'F',sideChain:'CH₂–C₆H₅（苯環）',category:'nonpolar',essential:true,traits:['必需、芳香族、疏水','可經羥化產生 Tyr','對 280 nm 吸收比 Trp、Tyr 弱'],memoryTip:'CH₂ 後面接苯環；沒有 OH。'},
  {id:'tryptophan',name:'Tryptophan',zh:'色胺酸',three:'Trp',one:'W',sideChain:'CH₂–C₈H₆N（吲哚環）',category:'nonpolar',essential:true,traits:['必需、芳香族；側鏈有吲哚環','280 nm 吸收特別強','是血清素等分子的前驅物'],memoryTip:'體積大的雙環，五員環裡有 NH。'},
  {id:'serine',name:'Serine',zh:'絲胺酸',three:'Ser',one:'S',sideChain:'CH₂–OH',category:'polar',essential:false,traits:['極性、不帶電；有羥基','Ser／Thr／Tyr 可被磷酸化','側鏈可形成氫鍵'],memoryTip:'CH₂–OH 是最短的含羥基側鏈。'},
  {id:'threonine',name:'Threonine',zh:'蘇胺酸',three:'Thr',one:'T',sideChain:'CH(OH)–CH₃',category:'polar',essential:true,traits:['必需、極性、不帶電','羥基可被磷酸化','側鏈另有一個手性中心'],memoryTip:'OH 和 CH₃ 接在同一個側鏈碳上。'},
  {id:'cysteine',name:'Cysteine',zh:'半胱胺酸',three:'Cys',one:'C',sideChain:'CH₂–SH',category:'polar',essential:false,traits:['側鏈是硫醇 –SH','兩個 Cys 氧化可形成雙硫鍵','側鏈可解離；pKₐ 約 8.3'],memoryTip:'看到 –SH 就想到雙硫鍵。'},
  {id:'tyrosine',name:'Tyrosine',zh:'酪胺酸',three:'Tyr',one:'Y',sideChain:'CH₂–C₆H₄–OH（對位）',category:'polar',essential:false,traits:['芳香環上有酚羥基，歸極性','可被磷酸化，並參與 280 nm 吸收','可由 Phe 生成；側鏈 pKₐ 約 10'],memoryTip:'像 Phe 的苯環，再加一個對位 OH。'},
  {id:'asparagine',name:'Asparagine',zh:'天門冬醯胺',three:'Asn',one:'N',sideChain:'CH₂–C(=O)–NH₂',category:'polar',essential:false,traits:['醯胺側鏈，極性但不帶電','蛋白質 N 型糖基化常接在 Asn','與酸性 Asp 只差末端 OH／NH₂'],memoryTip:'Asp 的末端 OH 換成 NH₂。'},
  {id:'glutamine',name:'Glutamine',zh:'麩醯胺',three:'Gln',one:'Q',sideChain:'CH₂–CH₂–C(=O)–NH₂',category:'polar',essential:false,traits:['醯胺側鏈，極性但不帶電','重要的氮運輸形式','比 Asn 多一個 CH₂'],memoryTip:'Gln 比 Asn 長一個 CH₂。'},
  {id:'aspartic-acid',name:'Aspartic acid',zh:'天門冬胺酸',three:'Asp',one:'D',sideChain:'CH₂–C(=O)–OH',category:'acidic',essential:false,traits:['酸性；生理 pH 下通常帶負電','側鏈 pKₐ 約 3.9','比 Glu 少一個 CH₂'],memoryTip:'末端是羧基，不是醯胺；Asp 比 Glu 短。'},
  {id:'glutamic-acid',name:'Glutamic acid',zh:'麩胺酸',three:'Glu',one:'E',sideChain:'CH₂–CH₂–C(=O)–OH',category:'acidic',essential:false,traits:['酸性；生理 pH 下通常帶負電','側鏈 pKₐ 約 4.2','麩胺酸鹽是主要興奮性神經傳導物質'],memoryTip:'Glu 比 Asp 多一個 CH₂。'},
  {id:'lysine',name:'Lysine',zh:'離胺酸',three:'Lys',one:'K',sideChain:'(CH₂)₄–NH₂',category:'basic',essential:true,traits:['必需、鹼性；生理 pH 下通常帶正電','末端 ε-胺基可被乙醯化','側鏈 pKₐ 約 10.5'],memoryTip:'長碳鏈尾端是胺基。'},
  {id:'arginine',name:'Arginine',zh:'精胺酸',three:'Arg',one:'R',sideChain:'(CH₂)₃–NH–C(=NH)–NH₂',category:'basic',essential:false,traits:['胍基強鹼性；生理 pH 下帶正電','側鏈 pKₐ 約 12.5','一氧化氮 NO 的前驅物'],memoryTip:'尾端胍基有三個 N。'},
  {id:'histidine',name:'Histidine',zh:'組胺酸',three:'His',one:'H',sideChain:'CH₂–C₃H₃N₂（咪唑環）',category:'basic',essential:true,traits:['必需；側鏈有兩個 N 的咪唑環','側鏈 pKₐ 約 6，常參與酸鹼催化','生理 pH 下不一定帶正電'],memoryTip:'咪唑環可在生理 pH 附近得失質子。'}
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
  {question:'哪一種胺基酸的側鏈是胍基？',answer:'arginine',explanation:'Arg 的胍基含三個氮，屬鹼性側鏈。'},
  {question:'哪一種胺基酸的側鏈有末端 ε-胺基，常見乙醯化修飾？',answer:'lysine',explanation:'Lys 的四個 CH₂ 後是 ε-胺基，可形成乙醯化修飾。'},
  {question:'哪一種支鏈胺基酸在常見分類中屬純生酮？',answer:'leucine',explanation:'Leu 為純生酮；Val 為生糖，Ile 兼具生糖與生酮。'},
  {question:'哪一種支鏈胺基酸除了 α 碳，側鏈還有手性中心？',answer:'isoleucine',explanation:'Ile 的 β 碳也是手性中心；Thr 也有第二個手性中心，但不是 BCAA。'},
  {question:'哪一種支鏈胺基酸的側鏈直接是 –CH(CH₃)₂？',answer:'valine',explanation:'Val 的 β 碳直接接兩個甲基。'},
  {question:'哪一種必需胺基酸可經羥化生成酪胺酸 Tyr？',answer:'phenylalanine',explanation:'Phe 經苯丙胺酸羥化酶作用可生成 Tyr。'},
  {question:'蛋白質 N 型糖基化通常接在哪一種胺基酸的側鏈？',answer:'asparagine',explanation:'N 型糖基化接在 Asn 的醯胺氮；常見序列為 Asn-X-Ser/Thr。'},
  {question:'哪一種醯胺胺基酸是體內重要的氮運輸形式？',answer:'glutamine',explanation:'Gln 以醯胺形式攜帶氮，參與組織間氮運輸。'},
  {question:'哪一種胺基酸的側鏈是最短的 –CH₂–OH？',answer:'serine',explanation:'Ser 的羥基直接接在 β 位 CH₂ 上。'},
  {question:'哪一種必需胺基酸具有可磷酸化的羥基，且側鏈另有手性中心？',answer:'threonine',explanation:'Thr 同時是必需胺基酸，帶 –OH，並在 β 碳有第二個手性中心。'},
  {question:'哪一種酸性胺基酸比 Glu 少一個 CH₂？',answer:'aspartic-acid',explanation:'Asp 的側鏈是 –CH₂–COOH；Glu 多一個 CH₂。'},
  {question:'哪一種酸性胺基酸的鹽類是主要興奮性神經傳導物質？',answer:'glutamic-acid',explanation:'Glutamate（麩胺酸鹽）是中樞神經系統主要興奮性神經傳導物質。'},
  {question:'葡萄糖－丙胺酸循環中用來從肌肉運送氮的是哪一種胺基酸？',answer:'alanine',explanation:'Alanine 可把肌肉的氮帶到肝臟，同時提供丙酮酸碳骨架。'},
  {question:'AUG 起始密碼子通常編碼哪一種胺基酸？',answer:'methionine',explanation:'AUG 編碼 Met；蛋白質合成起始時會使用起始型 Met。'},
  {question:'蛋白質在 280 nm 的吸收中，哪一種胺基酸的貢獻通常最強？',answer:'tryptophan',explanation:'Trp 的吲哚環吸收很強；Tyr 也有貢獻，Phe 較弱。'},
  {question:'哪一種芳香族胺基酸有酚羥基，可被磷酸化？',answer:'tyrosine',explanation:'Tyr 的苯環對位有 –OH，可受酪胺酸激酶磷酸化。'},
  {question:'哪一種胺基酸的側鏈 pKₐ 接近生理 pH，常參與酸鹼催化？',answer:'histidine',explanation:'His 的咪唑環 pKₐ 約 6，能在蛋白質活性位參與質子轉移。'},
  {question:'哪一種胺基酸的側鏈同時帶有四個 CH₂ 和末端胺基？',answer:'lysine',explanation:'Lys 的側鏈為 –(CH₂)₄–NH₂。'},
  {question:'哪一種胺基酸可作為一氧化氮 NO 合成的前驅物？',answer:'arginine',explanation:'一氧化氮合成酶以 Arg 為原料產生 NO。'}
];
