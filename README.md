# Amino Lab｜20 種胺基酸學習遊戲

一個可以直接在瀏覽器開啟的繁體中文練習網站，適合剛開始記 20 種標準胺基酸的人。視覺以筆記紙、手寫標記與簡單塗鴉為主。

**公開網站：** https://amino-lab-20aa-2026.enchantingchick4.chatgpt.site

## 內容

- **名字 → 結構**：題目可顯示英文全名、3 字母、1 字母或隨機縮寫，從四個簡式結構中選答案。
- **結構 → 名字**：看側鏈簡式結構，選出對應名稱或縮寫。
- **性質小考**：辨認非極性、極性無電荷、酸性、鹼性，以及常考特徵（如雙硫鍵、咪唑環、五員環）。
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
| `app.js` | 結構圖、出題、答題與單字卡互動 |
| `SUBMISSION.md` | 作業繳交內容草稿 |
| `dist/` | Sites 發布用的靜態網頁副本 |
| `.openai/hosting.json` | Sites 專案識別與發布目錄 |

## 化學表示法

結構圖採中性形式的**簡式結構**，用共同骨架 `H₂N–CH(R)–C(=O)–OH` 搭配側鏈，便於比較。Proline 另畫出回接胺基氮的五員環。芳香環與雜環的側鏈以組成式和環名標示。水溶液或生理 pH 下的主要離子形式可能不同；酸鹼分類指常見教學上的側鏈性質。Tyr 同時具有芳香環與酚羥基，這裡按極性無電荷分類；His 雖列鹼性，生理 pH 下不保證帶正電。

## 資料參考

- [IMGT Education：20 種胺基酸的結構與側鏈](https://www.imgt.org/IMGTeducation/Aide-memoire/_UK/aminoacids/formuleAA/)
- [NCBI Bookshelf：Primary Protein Structure](https://www.ncbi.nlm.nih.gov/books/NBK564343/)
- [NC State Organic Chemistry：Structures of Amino Acids](https://ncstate.pressbooks.pub/organicchem/chapter/structures-of-amino-acids/)

## 延伸

日後新增題型、解說或頁面時，請先閱讀 [AGENTS.md](AGENTS.md)。其中規定資料格式、檔案職責、介面風格、化學內容檢查與發布方式，讓後續 AI 可以依同一套規則接續製作。
