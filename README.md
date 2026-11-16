# Amino Lab｜20 種胺基酸學習遊戲

一個可以直接在瀏覽器開啟的繁體中文練習網站，適合剛開始記 20 種標準胺基酸的人。視覺以筆記紙、手寫標記與簡單塗鴉為主。

**公開網站：** https://amino-lab-20aa-2026.enchantingchick4.chatgpt.site

## 內容

- **名字 → 結構**：題目可顯示英文全名、3 字母、1 字母或隨機縮寫，從四個簡式結構中選答案。
- **結構 → 名字**：看側鏈簡式結構，選出對應名稱或縮寫。
- **性質小考**：辨認極性與電荷，以及必需胺基酸、BCAA、雙硫鍵、磷酸化、芳香族吸光、代謝與常見修飾等考點。
- **綜合練習**：混合以上題型；每輪可選 10 或 20 題，顯示進度、答題說明與得分。
- **單字卡**：20 種胺基酸的英文與中文名稱、3 字母／1 字母縮寫、側鏈簡式結構、分類與記憶點；可搜尋、篩選、翻面。

## 本機開啟

在本資料夾執行：

```powershell
python -m http.server 8000
```

再開啟 `http://localhost:8000/`。網站使用 JavaScript 模組，建議透過本機伺服器或 GitHub Pages 開啟，避免瀏覽器對 `file://` 模組的限制。不需要安裝套件或建置。

## GitHub Pages 發布

1. 在 GitHub 建立公開儲存庫，將本資料夾的 `index.html`、`styles.css`、`data.js`、`app.js`、`AGENTS.md`、`README.md` 和 `SUBMISSION.md` 上傳到儲存庫根目錄。
2. 到儲存庫 **Settings → Pages → Build and deployment**，選 **Deploy from a branch**；Branch 選 `main`，Folder 選 `/ (root)`，儲存。
3. 等待 Pages 產生網址後開啟網站，確認題目和卡片可正常使用。將實際連結填入 `SUBMISSION.md`。

## 專案結構

| 檔案 | 用途 |
| --- | --- |
| `AGENTS.md` | AI 後續修改與擴充時應遵守的規則 |
| `index.html` | 頁面架構及語意元素 |
| `styles.css` | 版面、塗鴉風格與手機排版 |
| `data.js` | 20 種胺基酸及考點的唯一資料來源 |
| `structures.js` | 對齊主鏈與側鏈、繪製環狀結構的 SVG |
| `app.js` | 出題、答題與單字卡互動 |
| `SUBMISSION.md` | 作業繳交內容草稿 |
| `dist/` | Sites 發布用的靜態網頁副本 |
| `.openai/hosting.json` | Sites 專案識別與發布目錄 |
| `sync-dist.ps1` | 將五個網頁原始檔同步到 `dist/` |
| `tests/structures.test.mjs` | 檢查 20 筆資料、環狀 SVG 與性質題答案 |

## 化學表示法

結構圖採中性形式，用共同骨架 `H₂N–CH(R)–C(=O)–OH` 搭配側鏈，便於比較。分支、長鏈、羧基與醯胺基都拆成原子或基團逐一畫鍵；Phe、Tyr、His、Trp 和 Pro 的環也以鍵線畫出。水溶液或生理 pH 下的主要離子形式可能不同；酸鹼分類指常見教學上的側鏈性質。Tyr 同時具有芳香環與酚羥基，這裡按極性無電荷分類；His 雖列鹼性，生理 pH 下不保證帶正電。側鏈 pKₐ 為約略教學值，蛋白質內環境會影響數值。

## 資料參考

- [IMGT Education：20 種胺基酸的結構與側鏈](https://www.imgt.org/IMGTeducation/Aide-memoire/_UK/aminoacids/formuleAA/)
- [NCBI Bookshelf：Primary Protein Structure](https://www.ncbi.nlm.nih.gov/books/NBK564343/)
- [NC State Organic Chemistry：Structures of Amino Acids](https://ncstate.pressbooks.pub/organicchem/chapter/structures-of-amino-acids/)
- [NCBI Bookshelf：9 種必需胺基酸](https://www.ncbi.nlm.nih.gov/books/NBK557845/)
- [NCBI Bookshelf：支鏈胺基酸](https://www.ncbi.nlm.nih.gov/books/NBK209312/)
- [NCBI Bookshelf：N 型糖基化](https://www.ncbi.nlm.nih.gov/books/NBK20720/)
- [PubMed Central：280 nm 芳香族吸收](https://pmc.ncbi.nlm.nih.gov/articles/PMC4983383/)
- [PubMed Central：BCAA 的生糖／生酮分類](https://pmc.ncbi.nlm.nih.gov/articles/PMC8329528/)
- [NCBI Bookshelf：麩胺酸鹽與神經傳導](https://www.ncbi.nlm.nih.gov/books/NBK537267/)
- [NCI：胺基酸性質與側鏈 pKₐ](https://tp53.cancer.gov/aa_codes)

## 延伸

日後新增題型、解說或頁面時，請先閱讀 [AGENTS.md](AGENTS.md)。其中規定資料格式、檔案職責、介面風格、化學內容檢查與發布方式，讓後續 AI 可以依同一套規則接續製作。
