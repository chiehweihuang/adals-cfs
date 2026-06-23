# 頁面無障礙測試流程

這份不是只測某一頁，而是「我們自己上線的頁面要怎麼測、怎麼確保每一頁都測過」。任何公開頁，上線前和改動後都照這套跑一次。

## 要測哪些頁（coverage）

目前我們自己託管、要納入測試的頁：

- Call for Speakers 主頁：https://speakers.apac-aia.org/
- 無障礙結果頁：https://speakers.apac-aia.org/accessibility/
- 視覺模擬圖庫：https://speakers.apac-aia.org/accessibility/vision-sim/

原則：**每新增或改動一個公開頁，就把下面五項跑一次**，把結果記到 audit.md。新頁要先測過再公開。

## 不在這裡測的：Google 表單

投稿用的 Google Form 不是我們的 HTML，是 Google 託管的。我們改不到它的標記，也無法在它上面跑 axe / Lighthouse / WAVE，所以**表單不列入這套流程**，它的無障礙以 Google 平台本身為準。我們能做的是把表單題目寫清楚、必填標示明確，其餘交給 Google。

## 兩個共同前提（每一頁都適用）

1. **淺色和深色都要測。** 頁面右上角的按鈕可切換主題（若該頁有），兩種各測一次。
2. **順手看窄螢幕。** 按 `F12` 開開發者工具，切到 320 寬，確認沒有左右橫向捲動。

通過的大原則：沒有 Error、對比都過、鍵盤能操作、報讀器讀得到。

下面工具的範例網址用主頁，**實際測哪一頁，就把網址換成那頁的**。

## 這些提醒（Alert）是預期的，不用慌

工具會丟一些「Alert / 提醒」，那是「建議你看一下」不是錯誤。這頁目前已經確認過、不用改的有：

- **WAVE「Possible heading」**：被當成可能是標題的樣式文字（例如最上面那行 eyebrow 小標）。是刻意的樣式，不是漏掉的標題。
- **WAVE「Noscript element」**：字型的 no-JS 備援 `<noscript>`。是刻意保留的退路。
- **ANDI 或焦點類工具「Focusable element is not in keyboard tab order」（出現在 `<main>` 上）**：那是「Skip to main content」跳過連結的目標。`<main>` 要有 `tabindex="-1"` 才能接住 skip link 的焦點，它本來就不該被 Tab 停留。正確、必要，不用改。

看到 **Error** 才是真的要修；**Alert** 先對照這張清單，在清單上的就放著。

---

## 1. WAVE（最簡單，先測這個）

WAVE 是 WebAIM 出的網頁無障礙檢測工具，會把問題直接標在頁面上。

**做法 A（免安裝）：** 開 https://wave.webaim.org/ ，把要測的頁面網址貼進去，按下去。
**做法 B（裝擴充，可測深色）：** 安裝「WAVE Evaluation Tool」瀏覽器擴充，開頁面後點它的圖示。要測深色，先把頁面切到深色再點。

**看左側這幾個數字：**
- **Errors = 0**、**Contrast Errors = 0** → 通過。
- **Alerts** 是「建議」不是錯誤（例如 "Possible heading"、"Noscript element"），可以接受。

---

## 2. Lighthouse（Chrome 內建，測效能 + 無障礙 + SEO）

Lighthouse 是 Chrome 內建的網站品質檢測，不用安裝。

1. 用 Chrome 開頁面 → 按 `F12` → 上方分頁找 **Lighthouse**。
2. 勾選 **Performance / Accessibility / Best Practices / SEO**，Mode 選 Navigation，按 **Analyze page load**。

**通過標準：**
- **Accessibility、Best Practices、SEO 應該是 100。**
- Performance：桌機模式（Desktop）應接近 100；手機模式（Mobile）分數天生較低，90 以上就很好，不用追到 100。

---

## 3. axe DevTools（抓 WCAG 違規，給想更嚴謹的人）

axe 是 Deque 出的無障礙檢測引擎，業界常用。

1. 安裝「axe DevTools」瀏覽器擴充。
2. 開頁面 → `F12` → 分頁找 **axe DevTools** → 按 **Scan ALL of my page**。

**通過標準：Violations（違規）= 0。** 淺色和深色各掃一次。

---

## 4. 螢幕閱讀器（報讀器，最重要的真人測試）

自動化工具能確認「結構對不對」（標題、地標、名稱都在），但真正的體驗要用報讀器走一遍。Windows 用免費的 NVDA，Mac 用內建 VoiceOver。

**先開一個乾淨的瀏覽器視窗（新的無痕視窗就好）。** 分頁太多時，報讀器焦點容易卡在視窗框或瀏覽器分頁上，那不是頁面的問題（我們之前就遇過）。

走這幾項：
1. **整頁讀一遍**（NVDA 按 `Insert` + `↓`）：從上到下唸得順、順序合理，中文「亞太包容創新協會」也唸得出來。
2. **用標題跳**（按 `H`）：一路跳過去，層級和順序合理。
3. **用地標跳**（按 `D`）：聽得到 header / main / footer。
4. **Tab 走過每個可操作元素**：skip link、logo、淺深色切換鈕、Apply、返回頂部，每個都要唸出清楚的名稱（切換鈕還要唸出它是按鈕、以及目前狀態）。

「唸得出文字」是最重要的基本盤，但不是全部。上面那幾項（用標題跳、用地標跳、逐一聽過每個控制項）才算完整。這頁的結構 axe 和鍵盤測試都已經確認過，所以唸得出來再加上那些自動確認，合起來就很穩。

---

## 5. 視覺模擬（色覺缺陷或低視力）

- **看現成的：** https://speakers.apac-aia.org/accessibility/vision-sim/ 已經有 6 種視覺條件乘以淺色深色的對照圖。
- **自己模擬色盲：** Chrome 按 `F12` → 右上 `⋮` → More tools → **Rendering** → 找 **Emulate vision deficiencies**，選不同色覺類型看頁面。
- **低視力或老花：** 用瀏覽器放大到 200%（`Ctrl` 加 `+`），確認文字不會被切掉或重疊。

判斷重點：**就算去掉顏色或模糊掉，標題、內文、按鈕還是讀得懂、認得出。**

---

測完把結果記到同資料夾的 `audit.md`，讓每一頁都有留下紀錄。歷次的完整結果（Lighthouse 報告、WAVE、摘要）都整理在無障礙結果頁：https://speakers.apac-aia.org/accessibility/

<!-- writing-harness: S0/S1/S2 ok 2026-06-24 -->
