## <sub><img src="/koshian_image_save_button/icons/icon-48.png"></sub> KOSHIAN 画像保存ボタン
このFirefoxアドオンはふたば☆ちゃんねるで画像（動画）を保存するボタンを追加します。  

※このアドオンはWebExtensionアドオン対応のFirefox専用となります。  
※ふたば閲覧を支援する「こしあん」アドオン改変版やUserscriptは[こちら](https://github.com/akoya-tomo/futaba_auto_reloader_K/wiki/)。  

## 機能
* 画像を保存するボタンを追加する
  - レス送信モードでファイル名の横に保存ボタンを追加します。  
    保存ボタンをクリックするとファイルをブラウザで開かないでファイル保存のダイアログが開きます。ボタンをクリックした時点で保存の有無に係わらずボタン表示が[保存済]に変わります。  
  - 設定で「ファイル名をクリックで保存」を選択すると保存ボタンを追加する代わりにファイル名をクリックでダイアログを開くことができます。  

## スクリーンショット
![スクリーンショット](/images/screenshot01.png "スクリーンショット")

## インストール
**GitHub**  
[![インストールボタン](/images/install_button.png "アドオンをインストール")](https://github.com/akoya-tomo/koshian_image_save_button/releases/download/v1.0.0/koshian_image_save_button-1.0.0-an.fx.xpi)

※「接続エラーのため、アドオンをダウンロードできませんでした。」と表示されてインストール出来ないときはリンクを右クリックしてxpiファイルをダウンロードし、メニューのツール→アドオン（またはCtrl+Shift+A）で表示されたアドオンマネージャーのページにxpiファイルをドラッグ＆ドロップして下さい。  

## 機能の補足
* 保存ボタン自体はただのダウンロードリンクなので[赤福Firefox sp](http://toshiakisp.github.io/akahuku-firefox-sp/)のようなフォルダを指定して直接保存などは出来ません。  
  [Save In…](https://addons.mozilla.org/en-US/firefox/addon/save-in/)アドオンで「Enable saving of links. Prefers sources if available.」を有効の状態で保存ボタンを右クリックしてフォルダ選択することで、「フォルダを選択して直接保存」に近い動作になります。  
![スクリーンショット](/images/screenshot02.png "スクリーンショット")
* 塩などの外部リンクはFirefoxの仕様でダウンロードリンクが機能しないため、保存ボタンは追加しません。  
* 設定の変更を開いているレス送信モードのページに反映するには一度ページを更新してください。  

## 今後の予定
* タブを閉じても保存済みファイルを記憶保持したい。  

## 更新履歴
* v1.0.0 2018-06-20
  - 新規リリース
