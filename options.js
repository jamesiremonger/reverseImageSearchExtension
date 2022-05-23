var apiNamespace = window.chrome || window.browser;

const defaultVisibleContextMenus = {
  "google": false,
  "bing": false,
  "yandex": false,
  "tineye": false
};

// function updateContextObject(result, objectId) {

//   const newValue = !result.isContextMenuVisibleArr[objectId];
//   const isContextMenuVisibleArr = result.isContextMenuVisibleArr;
//   isContextMenuVisibleArr[objectId] = newValue;

//   console.log(isContextMenuVisibleArr);
//   console.log(objectId)
//   apiNamespace.storage.local.set({isContextMenuVisibleArr: isContextMenuVisibleArr})
// }

// function saveCheckChange(checkBox) {
//   let isContextMenuVisibleArr = apiNamespace.storage.local.get("isContextMenuVisibleArr");
//   isContextMenuVisibleArr.then((result) => updateContextObject(result, checkBox))
// }

function restoreOptions() {
  apiNamespace.storage.local.get(["isContextMenuVisibleArr"], function(result) {
    var isContextMenuVisibleArr = null;

    if (result.isContextMenuVisibleArr) {
      isContextMenuVisibleArr = result.isContextMenuVisibleArr;
    } else {
      apiNamespace.storage.local.set({isContextMenuVisibleArr: defaultVisibleContextMenus});
    }

    for (const [engine, isVisible] of Object.entries(isContextMenuVisibleArr)) {
      document.getElementById(engine + "_isVisible").checked = isVisible;
    }
  })

  // const isVisibleCheckBoxes = document.getElementsByName("isVisible");
  // for (let i = 0; i < isVisibleCheckBoxes.length; i++){
  //   isVisibleCheckBoxes[i].addEventListener('click', saveCheckChange)
  // }
};


document.addEventListener('DOMContentLoaded', restoreOptions);