const engines = {
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
    for (const [key, search_engine] of Object.entries(engines)){
      if (!search_engine.url_front) {
        continue
      }
      chrome.tabs.create({
        url: search_engine.url_front + encodeURIComponent(info.srcUrl)
      })
    }
  } else {
    chrome.tabs.create({
      url: engines[info.menuItemId].url_front + encodeURIComponent(info.srcUrl)
    });
  }
}

function createContextMenu(search_engine) {
  chrome.contextMenus.create({
    title: "Search image with " + search_engine.name,
    id: search_engine.id,
    contexts: ["image"]
  });
}


chrome.runtime.onInstalled.addListener(function() {
  for (const [key, search_engine] of Object.entries(engines)){
    createContextMenu(search_engine)
  }
})

chrome.contextMenus.onClicked.addListener(imageSearch)