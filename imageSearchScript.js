const engineData = {
  "google": {
    "id": "google",
    "url_front": "https://www.google.com/searchbyimage?&image_url=",
    "name": "Google"
  },
  "bing": {
    "id": "bing",
    "url_front": "https://www.bing.com/visualsearch/Microsoft/SimilarImages?&imgurl=",
    "name": "Bing"
  },
  "tineye": {
    "id": "tineye",
    "url_front": "https://www.tineye.com/search/?&url=",
    "name": "TinEye"
  },
  "yandex": {
    "id": "yandex",
    "url_front": "https://yandex.com/images/search?rpt=imageview&url=",
    "name": "Yandex"
  },
  "all": {
    "id": "all",
    "name": "All Engines"
  }
}


function imageSearch(info, tab) {
  if (info.menuItemId === "all") {
    for (const [key, search_engine] of Object.entries(engineData)){
      if (!search_engine.url_front) {
        continue
      }
      chrome.tabs.create({
        url: search_engine.url_front + encodeURIComponent(info.srcUrl)
      })
    }
  } else {
    chrome.tabs.create({
      url: engineData[info.menuItemId].url_front + encodeURIComponent(info.srcUrl)
    });
  }
}

function updateContextMenus(engines){
  chrome.contextMenus.removeAll();
  chrome.storage.local.get("isContextMenuVisibleArr", function(result){
    if (!result.isContextMenuVisibleArr) {
      createContextMenus(engines);
      return;
    };
    for (const [key, engine] of Object.entries(engines)){
      if (!result.isContextMenuVisibleArr[engine.id]){
        continue;
      }
      createContextMenu(engine)
    }
  })
}

function createContextMenus(engines) {
  for (const [key, engine] of Object.entries(engines)){
    createContextMenu(engine)
  }
}

function createContextMenu(engine) {
  chrome.contextMenus.create({
    title: "Search image with " + engine.name,
    id: engine.id,
    contexts: ["image"]
  });
}


chrome.runtime.onInstalled.addListener(() => createContextMenus(engineData))
chrome.storage.onChanged.addListener(() => updateContextMenus(engineData))
chrome.contextMenus.onClicked.addListener(imageSearch)