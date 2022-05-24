var apiNamespace = window.chrome || window.browser;

const defaultVisibleContextMenus = {
  "google": true,
  "bing": true,
  "yandex": true,
  "tineye": true,
  "all": true
};

function saveCheckChange(e) {
  var isContextMenuVisibleArrOld = {};
  var engine = e.target.value;
  apiNamespace.storage.local.get("isContextMenuVisibleArr", function(result) {
    isContextMenuVisibleArrOld = result.isContextMenuVisibleArr;
    const newValue = !isContextMenuVisibleArrOld[engine];
    const isContextMenuVisibleArr = isContextMenuVisibleArrOld;
    isContextMenuVisibleArr[engine] = newValue;

    apiNamespace.storage.local.set({isContextMenuVisibleArr: isContextMenuVisibleArr})
  });
  
}

function restoreOptions() {
  apiNamespace.storage.local.get(["isContextMenuVisibleArr"], function(result) {
    var isContextMenuVisibleArr = null;

    if (result.isContextMenuVisibleArr) {
      isContextMenuVisibleArr = result.isContextMenuVisibleArr;
    } else {
      isContextMenuVisibleArr = defaultVisibleContextMenus;
      apiNamespace.storage.local.set({isContextMenuVisibleArr: defaultVisibleContextMenus});
    }
    for (const [engine, isVisible] of Object.entries(isContextMenuVisibleArr)) {
      document.getElementById(engine + "_isVisible").checked = isVisible;
    }
  })

  const isVisibleCheckBoxes = document.getElementsByName("isVisible");
  for (let i = 0; i < isVisibleCheckBoxes.length; i++){
    isVisibleCheckBoxes[i].addEventListener('click', saveCheckChange)
  }
};


document.addEventListener('DOMContentLoaded', restoreOptions);