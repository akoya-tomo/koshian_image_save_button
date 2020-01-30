let use_save_button = true;
let button_size = 10;
let use_filename = false;   // eslint-disable-line no-unused-vars

function switchSave(e){
    e.target.textContent = "[保存済]";
}

/**
 * 保存ボタン設置
 * @param {HTMLAnchorElement} anchor ファイル名のaタグ
 */
function putSaveButton(anchor){
    if (use_save_button) {
        // 保存ボタン追加
        let btn = document.createElement("a");
        btn.className = "KOSHIAN_SaveButton";
        btn.href = anchor.href;
        btn.textContent = "[保存]";
        btn.download = anchor.textContent;
        btn.onclick = switchSave;
        btn.oncontextmenu = switchSave;

        let response = anchor.parentNode;
        response.insertBefore(btn, anchor.nextSibling);
    } else {
        // ファイル名クリックでダウンロード
        anchor.download = anchor.textContent;
    }
}

/**
 * スレ画像のみ保存ボタン処理
 *     添付ファイルが無い板用
 */
function thre(){
    let save_button = document.querySelector(".thre > .KOSHIAN_SaveButton");
    // 既存の[保存]ボタンがあればonclickを再登録
    if (save_button) {
        save_button.onclick = switchSave;
        save_button.oncontextmenu = switchSave;
        return; 
    }

    let anchor = document.querySelector(".thre > a");   // スレ最初のaタグがファイル名と決め打ち
    if (!anchor) return;

    if (/^\d+\.[0-9A-Za-z]+$/.test(anchor.textContent)) {
        putSaveButton(anchor);
    }
}

let last_process_num = 0;

/**
 * 最初にスレを開いたときの保存ボタン処理
 *     imgタグだけを抽出して処理時間短縮を図る
 */
function first_process(){
    let thre = document.getElementsByClassName("thre")[0];
    if (!thre) return;

    //let start_time = Date.now();  // 処理時間計測開始（開発用）

    // 既存の[保存]ボタン削除
    let save_buttons = thre.getElementsByClassName("KOSHIAN_SaveButton");
    while (save_buttons.length) {
        save_buttons[0].remove();
    }

    let images = thre.getElementsByTagName("img");

    loop: for (let image of images) {
        // imgタグの親要素の前方にあるaタグを検索
        for (let elm = image.parentElement.previousElementSibling; elm; elm = elm.previousElementSibling) {
            if (elm.tagName == "A" && /^\d+\.[0-9A-Za-z]+$/.test(elm.textContent)) {
                putSaveButton(elm);
                continue loop;
            }
        }
    }

    //console.log("KOSHIAN_image_save_button/res.js: first_process() time = " + (Date.now() - start_time) + "msec");    // 処理時間表示（開発用）

    last_process_num = document.getElementsByClassName("rtd").length;
}

/**
 * リロードしたときの保存ボタン処理
 * @param {number} beg 処理をするレスの開始番号
 */
function process(beg = 0){
    let responses = document.getElementsByClassName("rtd");
    let end = responses.length;

    if (beg >= end) return;

    // let start_time = Date.now();  //処理時間計測開始（開発用）

    loop: for (let i = beg; i < end; ++i) {
        // レス内のimgタグ抽出
        let images = responses[i].getElementsByTagName("img");
        let images_num = images.length;
        if (images_num) {
            // 既存の[保存]ボタンがあればonclickを再登録
            let save_button = responses[i].getElementsByClassName("KOSHIAN_SaveButton")[0];
            if (save_button) {
                save_button.onclick = switchSave;
                save_button.oncontextmenu = switchSave;
                continue; 
            }

            let anchors = responses[i].getElementsByTagName("a");
            let anchors_num = anchors.length;
            if (anchors_num){
                for (let j = anchors_num - (images_num * 2 - 1) - 1; j >= 0; --j) {  // imgタグの親のaタグとAutoLinkのaタグの分を除いて後方から検索
                    let a_text = anchors[j].textContent;
                    if (/^\d+\.[0-9A-Za-z]+$/.test(a_text)) {
                        putSaveButton(anchors[j]);
                        continue loop;
                    }
                }
                console.log("KOSHIAN_image_save_button/res.js: filename rapid search failed - res No." + (i + 1));  // eslint-disable-line no-console

                // すっぽ抜け対策
                for (let j = anchors_num - (images_num * 2 - 1); j < anchors_num; ++j) {  // 残りのaタグを検索
                    let a_text = anchors[j].textContent;
                    if (/^\d+\.[0-9A-Za-z]+$/.test(a_text)) {
                        putSaveButton(anchors[j]);
                        continue loop;
                    }
                }
                console.log("KOSHIAN_image_save_button/res.js: filename search failed - res No." + (i + 1));    // eslint-disable-line no-console
            }
        }
    }

    //console.log("KOSHIAN_image_save_button/res.js: process() time = " + (Date.now() - start_time) + "msec");  // 処理時間表示（開発用）

    last_process_num = end;
}

function main(){
    if (document.querySelector("#ftbl input[name='upfile']")) {
        // 画像レス有り
        first_process();

        document.addEventListener("KOSHIAN_reload", () => {
            process(last_process_num);
        });

        let target = document.getElementById("akahuku_reload_status");
        if (target) {
            checkAkahukuReload(target);
        } else {
            document.addEventListener("AkahukuContentApplied", () => {
                target = document.getElementById("akahuku_reload_status");
                if (target) checkAkahukuReload(target);
            });
        }

        let contdisp = document.getElementById("contdisp");
        if (contdisp) {
            check2chanReload(contdisp);
        }
    } else {
        // 画像レス無し
        thre();
    }

    function checkAkahukuReload(target) {
        let status = "";
        let config = { childList: true };
        let observer = new MutationObserver(function() {
            if (target.textContent == status) {
                return;
            }
            status = target.textContent;
            if (status.indexOf("新着:") === 0) {
                process(last_process_num);
            }
        });
        observer.observe(target, config);
    }

    function check2chanReload(target) {
        let status = "";
        let reloading = false;
        let config = { childList: true };
        let observer = new MutationObserver(function() {
            if (target.textContent == status) return;
            status = target.textContent;
            if (status == "・・・") {
                reloading = true;
            } else if (reloading && status.endsWith("頃消えます")) {
                process(last_process_num);
                reloading = false;
            } else {
                reloading = false;
            }
        });
        observer.observe(target, config);
    }
}

function onLoadSetting(result) {
    use_save_button = safeGetValue(result.use_save_button, true);
    //button_size = safeGetValue(result.button_size, 10);
    document.documentElement.style.setProperty("--button-size", `${safeGetValue(result.button_size, 10)}px`);
    use_filename = safeGetValue(result.use_filename, false);
    
    main();
}

function onSettingChanged(changes, areaName) {
    if (areaName != "local") {
        return;
    }

    use_save_button = safeGetValue(changes.use_save_button.newValue, true);
    //button_size = safeGetValue(changes.button_size.newValue, 10);
    document.documentElement.style.setProperty("--button-size", `${safeGetValue(changes.button_size.newValue, 10)}px`);
    use_filename = safeGetValue(changes.use_filename.newValue, false);
}

function safeGetValue(value, default_value) {
    return value === undefined ? default_value : value;
}

browser.storage.local.get().then(onLoadSetting, (err) => {});
browser.storage.onChanged.addListener(onSettingChanged);
