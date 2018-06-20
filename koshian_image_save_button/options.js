let g_use_save_button = true;
let g_button_size = 10;
let g_use_filename = false;

function onError(error) {
}

function setDisable() {
  if (document.getElementById("use_save_button").checked) {
    document.getElementById("button_size").disabled = false;
  } else {
    document.getElementById("button_size").disabled = true;
  }
}

function safeGetValue(value, default_value) {
  if (value === undefined) {
    return default_value;
  } else {
    return value;
  }
}

function saveSetting() {
  browser.storage.local.set({
    use_save_button: g_use_save_button.checked,
    button_size: g_button_size.value,
    use_filename: g_use_filename.checked
  });
}

function setCurrentChoice(result) {
  g_use_save_button.checked = safeGetValue(result.use_save_button, true);
  g_button_size.value = safeGetValue(result.button_size, 10);
  g_use_filename.checked = safeGetValue(result.use_filename, false);
}

function onLoad() {
  g_use_save_button = document.getElementById("use_save_button");
  g_button_size = document.getElementById("button_size");
  g_use_filename = document.getElementById("use_filename");

  g_use_save_button.addEventListener("change", (e) => {
    setDisable();
    saveSetting();
  });

  g_button_size.addEventListener("change", (e) => {
    setDisable();
    saveSetting();
  });

  g_use_filename.addEventListener("change", (e) => {
    setDisable();
    saveSetting();
  });

  browser.storage.local.get().then(setCurrentChoice, onError);
}

function onSettingChanged(changes, areaName) {
  if (areaName != "local") {
    return;
  }

  g_use_save_button.checked = safeGetValue(changes.use_save_button.newValue, true);
  g_button_size.value = safeGetValue(changes.button_size.newValue, 10);
  g_use_filename.checked = safeGetValue(changes.put_hide_button.newValue, true); 
}

document.addEventListener("DOMContentLoaded", onLoad);
browser.storage.onChanged.addListener(onSettingChanged);
