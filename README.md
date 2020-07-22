# 奨学金管理アプリケーションを作る
## 欲しい機能
- 卒業までの所持金の推移を[年　月　額]みたいな感じで表示できる
- 入力の訂正

<!-- node.js版 ver1.0 -->
## node.jsとpugを使ってweb版に移植する
そもそもjava版もできていないけどnode.jsこのままじゃ全然使えるようにならない気がするし、いい機会だと思うのでここらで個人プロジェクトを始めるのです。データはデータベースで保持して、所持金とお金の出入りの推移が見られるようにしたものがver.1.0 \
学費と奨学金についての管理は通常の収支に手動で入力する。
### データ構造
- データのid(primary)
- userID(googleのid)
- 日付
- 金額(支出が負の数で収入が正の数)
- タイトル
### UI ver.1.0
データベースの内容を適当に列挙して現在の所持金が見られれば完璧

<!-- node.js版 ver.2.0 (予定)-->
## 追加機能
データの表示を月ごとに行う。データの入力は毎月、毎年、いつまでといった条件で繰り返し指定できるようにする。