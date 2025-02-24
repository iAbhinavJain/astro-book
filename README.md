# ⚡ Serverless Astro.js with Google Sheets as a Database + Dynamic Routing! 🚀

📊 **Turn Google Sheets into a lightweight database with dynamic routing in Astro.js!** No backend, no traditional CMS—just a simple, free, and serverless way to manage content.

## 🌟 Features

✅ **Google Sheets as a Database** – Store and manage content easily.  
✅ **Dynamic Routing** – Auto-generates pages based on your sheet data.  
✅ **Free & Serverless** – No hosting costs, no backend needed.  
✅ **SEO-Friendly** – Static, fast, and optimized for search engines.

## 🚧 Limitations

⚠️ **Google API Quotas** – Too many requests? Google might slow you down.  
⚠️ **Read-Only** – No live edits on your site; update via Sheets.  
⚠️ **Sheet Structure Matters** – Change column names? Break everything. 😅  
⚠️ **Public Data Only** – We use OpenSheets, so your sheet **must** be public. If privacy is a concern, use the official Google API instead.  
⚠️ **Not Ideal for Large Data** – Too many rows? Performance may suffer! This works best for lightweight datasets.

## 🛠️ Setup

### For the repo:

1️⃣ **Edit `sitemap.xml`** – Update it for your site structure.  
2️⃣ **Modify `fetchbooks.js`** – Adjust data fetching as needed.  
3️⃣ **Customize the frontend** – Tweak styles, layout, and content to match your vision.

### For Auto Deployment after update in Sheets:
1️⃣ **Add `Deployment Hook`** – If you are using Cloudflare Pages, its called Deployment Hook.  
2️⃣ **Add following code to Appscript 

```javascript
const CLOUDFLARE_WEBHOOK_URL = "YOUR_WEBHOOK_URL";
function onEdit(e) {
  const cache = CacheService.getScriptCache();
  cache.put("lastEdit", new Date().toString(), 600); // Store last edit time for 10 mins
  // Clear previous triggers (prevents stacking)
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === "triggerCloudflareBuild") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Set a delayed trigger to run 10 mins after the last edit

  ScriptApp.newTrigger("triggerCloudflareBuild")
    .timeBased()
    .after(10 * 60 * 1000) // 10 minutes
    .create();
}

function triggerCloudflareBuild() {
  const cache = CacheService.getScriptCache();
  const lastEditTime = new Date(cache.get("lastEdit"));
  const now = new Date();

  // Ensure no further edits have happened in the last 10 mins
  if (now - lastEditTime >= 10 * 60 * 1000) {
    UrlFetchApp.fetch(CLOUDFLARE_WEBHOOK_URL, { method: "POST" });
  }
}
```

3️⃣ **Add Trigger** – 
Function to run: onEdit
Event source: From spreadsheet
Event type: On edit

📖 Full tutorial 👉 [Read here](https://medium.com/@iabhinavj/how-to-build-a-serverless-astro-js-website-with-google-sheets-as-a-database-free-easy-c22ac792b328)

## 🤝 Contribute!

Got ideas? Bugs? PRs welcome! Let’s make this cooler together. 🎉

💙 **Star this repo if you love free stuff!** ⭐✨
