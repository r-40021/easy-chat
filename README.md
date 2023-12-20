# チャット返信作成支援ツール 起動方法

以下の手順に従うと、自分の PC 上でチャット返信作成支援ツールを動かすことができます。

# 必要な環境

プログラムを動作させるためには以下の環境が必要です。

- Windows, Mac または Linux の PC
- [Visual Studio Code](https://code.visualstudio.com/) がインストールされていること
- [Node.js](https://nodejs.org/) がインストールされており、かつ npm が使用できる状態であること
(Node.js v20 (LTS バージョン) で動作を確認しています。)

各ソフトウェアのインストール方法については以下の記事を参照してください。

Visual Studio Code…[【VSCode】インストール／日本語化／基本的な使い方 (senseshare.jp)](https://blog.senseshare.jp/vscode.html)

Node.js…[Windows、macOS、LinuxにNode.jsとnpmをインストールする方法 (kinsta.com)](https://kinsta.com/jp/blog/how-to-install-node-js/) 

# プログラムのダウンロード

1. [プログラムの GitHub リポジトリ](https://github.com/r-40021/easy-chat)を開きます。
2. 緑色の [Code] ボタン→[Download ZIP] をクリックして、プログラムをダウンロードします。

Git がインストールされている PC であれば、以下のコマンドを実行してクローンすることも可能です。
    
```bash
git clone https://github.com/r-40021/easy-chat.git
```
    
![プログラムをダウンロードする様子](https://github.com/r-40021/easy-chat/assets/75155258/9f4acbba-0bb6-46e3-ba71-7f671e3cff84)
  
プログラムをダウンロードする様子
    
3. ダウンロードした ZIP ファイルを解凍します。
(git コマンドでクローンした場合はこの手順は不要です。)

# Visual Studio Code でフォルダを開く

1. Visual Studio Code を起動し、[ファイル]→[フォルダーを開く] から先ほどダウンロードしたフォルダの中にある「easy-chat-main」フォルダを選択して開きます。  
※ZIP ファイルでダウンロードした場合、easy-chat-main フォルダが2重になっていることがあります。その際は内側の easy-chat-main フォルダを開いてください。
    
![Visual Studio Code でフォルダーを開く](https://github.com/r-40021/easy-chat/assets/75155258/b7655464-8bf0-4ffd-9b03-538179303e27)

    
2. 以下のような画面が表示されたら、[はい、作成者を信頼します] をクリックしてください。
    
![作成者を信頼する画面](https://github.com/r-40021/easy-chat/assets/75155258/19ae33f2-db84-4011-8ddd-71bc72678835)

    

# 依存関係のインストール

1. [ターミナル]→[新しいターミナル] とクリックし、ターミナルを開きます。
    
![ターミナルを開く](https://github.com/r-40021/easy-chat/assets/75155258/9cd1bf5d-c72c-44ba-90cf-6e45c5ffc85c)

2. 開いたターミナルで `npm install` と入力し、Enter キーを押します。
    
![依存関係のインストール](https://github.com/r-40021/easy-chat/assets/75155258/666f948b-4a36-4170-b247-77f4eea81677)

3. インストール完了
    
![依存関係のインストール完了](https://github.com/r-40021/easy-chat/assets/75155258/a2b27513-4d1b-48ee-8fc7-2670fee17403)


# API の準備

ツール内の AI 機能、ネガポジ分析、5W1H 抽出、文章校正を使用するためには、以下の操作を行う必要があります。

> [!CAUTION]
> ## 【重要】API の使用料金について
> 
> AI 機能及びネガポジ分析については、**使用した分に応じて料金が請求されます**。
> 
> AWS のアカウントを作成して12ヶ月以内の場合、ネガポジ分析については無料枠があるので個人で少し試す程度であれば料金が請求されることはなかなか無いかと思いますが、**AWS のアカウント作成後12ヶ月が経過している場合は即座に料金が発生します**。
> 
> また、AI 機能には無料枠がないので使った瞬間に料金が発生します。少し試す程度であればせいぜい数円程度の請求に収まるかとは思いますが、**使い過ぎには十分注意してください。  
> (使いすぎにより多額の料金が発生し支払いが困難になったとしても、開発者は責任を負いかねます。)**
> 
> AWS の料金については以下のページをご覧ください。  
> (どちらも東京リージョンを使用しています。)
> 
> - [ポジネガ分析 (Amazon Comprehend 感情分析)](https://aws.amazon.com/jp/comprehend/pricing/)
> - [AI 機能 (Amazon Bedrock - Claude Instant)](https://aws.amazon.com/jp/bedrock/pricing/)
> 
> なお、5W1H API については1日100回まで、文章校正 API については1リクエストあたり4KB、1分あたり300回の制限があります。  
> (この2つの API は制限を超えても使用が制限されるだけで料金は発生しません。)

## AI 機能、ネガポジ分析を使用するための準備 (最大の山場)

1. [AWS (Amazon Web Services) コンソール](https://console.aws.amazon.com/) にログインします。  
(アカウントを持っていない場合は、上のリンクからアカウントを作成します。(クレジットカード・電話番号が必要です))
2. 画面上の検索ボックスに「IAM」と入力し、表示された検索結果の中から [IAM] をクリックします。
    
![AWS コンソールで IAM と検索](https://github.com/r-40021/easy-chat/assets/75155258/4c86f312-df9d-42af-9b6e-0f13dc954fb7)

3. 左のメニューの [ユーザーグループ] をクリックします。
    
![左サイドメニュー内にあるユーザーグループボタン](https://github.com/r-40021/easy-chat/assets/75155258/fdfe9b8d-d236-45c9-a096-da46e8bed9c1)

4. [グループを作成] をクリックします。
    
![グループを作成ボタン](https://github.com/r-40021/easy-chat/assets/75155258/0aa52d4e-4c7e-498d-b015-d204b03cab7b)

5. グループにわかりやすい名前をつけます。
    
![グループの命名](https://github.com/r-40021/easy-chat/assets/75155258/de5e56e2-cdec-41e6-be95-bd0bc3622312)

6. [許可ポリシーを添付] から「ComprehendReadOnly」と「AmazonBedrockFullAccess」にチェックを入れ、最後に右下の [グループを作成] をクリックします。
    
![ComprehendReadOnly](https://github.com/r-40021/easy-chat/assets/75155258/41f508cd-484b-4a42-8d1d-a891d67881ce)
![AmazonBedrockFullAccess](https://github.com/r-40021/easy-chat/assets/75155258/82422917-eb82-4511-b6f9-0c99925ee9f7)
![グループを作成](https://github.com/r-40021/easy-chat/assets/75155258/4045f443-3e32-48ab-b03e-b30e25c39d0a)

    
7. 左のメニューから [ユーザー] をクリックします。

![左サイドメニュー内のユーザーボタン](https://github.com/r-40021/easy-chat/assets/75155258/339a0889-61fd-41b6-9c72-3f1381f9d3e7)

8. [ユーザーの作成] をクリックします。
    
![ユーザーの作成](https://github.com/r-40021/easy-chat/assets/75155258/d28abbe1-01a9-4c37-a81d-9ac6f414fe49)

    
9. わかりやすいユーザー名を付け、[次へ] をクリックします。
    
![ユーザ名の命名](https://github.com/r-40021/easy-chat/assets/75155258/ccf0ac0d-d490-4998-be44-000ace7c5516)

    
10. 先程作成したグループにチェックを入れ、[次へ] をクリックします。

![グループの選択](https://github.com/r-40021/easy-chat/assets/75155258/1e662158-83b0-4a1d-b2b3-ddcc8b05af2e)


11. [ユーザーの作成] をクリックします。
    
![ユーザーの作成](https://github.com/r-40021/easy-chat/assets/75155258/b8e6782a-5761-4bd3-b48e-ce3fa4a6c43a)

    
12. 先程作成したユーザー名をクリックします。
    
![ユーザー名をクリック](https://github.com/r-40021/easy-chat/assets/75155258/f152db42-a667-41ca-9705-0fe55b932d1d)

    
13. [アクセスキーを作成] をクリックします。
    
![アクセスキーを作成](https://github.com/r-40021/easy-chat/assets/75155258/27474beb-70a8-4c2d-af2f-fcb66a864eda)
    
14. 今回は PC 上でプログラムを動かすので、[ローカルコード] を選択します。
    
![ローカルコードを選択](https://github.com/r-40021/easy-chat/assets/75155258/2364c3a8-8412-49e6-86f1-445f86f5741a)

    
15. [上記のレコメンデーションを理解し、アクセスキーを作成します。] にチェックを入れ、[次へ] をクリックします。
    
![「上記のレコメンデーションを理解し、アクセスキーを作成します」にチェックを入れて次へ](https://github.com/r-40021/easy-chat/assets/75155258/74548860-c46d-4302-a7c8-cbe50f4b7218)
    
16. アクセスキーにわかりやすい名前をつけます。(ここで入力した名前は管理画面上で複数のアクセスキーを区別する際に役立ちます。)

![アクセスキーの命名](https://github.com/r-40021/easy-chat/assets/75155258/71e4b6b6-7155-4ce9-87be-a79401ad1ca4)


17. Visual Studio Code に戻り、「.env」という名前のファイルを作成します

![Visual Studio Code でファイルを新規作成](https://github.com/r-40021/easy-chat/assets/75155258/6a12bd93-499b-4adc-b855-67f9f835a026)

![envファイルの命名](https://github.com/r-40021/easy-chat/assets/75155258/305262eb-773a-4369-9c3b-9cf4a77bc837)

18. 作成した `.env` ファイルに、以下のように入力します。  
(各行の “=” の後は、AWS の管理画面から取得したキーに置き換えてください。)

```
AWS_ACCESS_KEY_ID=(AWS のアクセスキー)
AWS_SECRET_ACCESS_KEY=(AWS のシークレットアクセスキー)
```

![アクセスキーとアクセスシークレットキー](https://github.com/r-40021/easy-chat/assets/75155258/d92dfe2b-7263-47bd-ac37-743fb66da387)

> [!WARNING]
> アクセスキー及びシークレットアクセスキーは、この後二度と表示することはできません。確実に保存してください。  
> 万が一紛失した場合は、今回取得したアクセスキーを削除した上で新たにアクセスキーを発行してください。

19. 最後に [完了] ボタンをクリックします。
20. 先ほど作成した `.env` ファイルに以下の行を追加してください。  
これにより、東京リージョンの AWS サーバーが使用されるようになります。

```
AWS_REGION=ap-northeast-1
```

## 5W1H 抽出を使用するための準備

1. メタデータ株式会社の HP から利用登録を行ってください。  
[利用申請フォーム](http://ap.mextractr.net/ma9/ma9signup)
2. 申請後しばらくして届くメールに記載されている API キーをコピーします。
3. Visual Studio Code に戻り、先ほど作成した `.env` ファイルに以下の行を追加してください。  
(”=” の後は、メールに記載されている API キーに置き換えてください。)

```
METADATA_API_KEY=(メールに記載されている API キー)
```

## 文章校正を使用するための準備

1. [Yahoo! JAPAN Web API 管理画面](https://e.developer.yahoo.co.jp/dashboard/) を開き、Yahoo! Japan ID でログインします。  
※Yahoo! Japan ID を持っていない場合は無料で取得できます。(クレジットカードも不要)
    
![Yahoo! Japan ID で管理画面にログイン](https://github.com/r-40021/easy-chat/assets/75155258/781447c8-ed54-47da-b1b6-96eed6eefb2f)

    
2. [新しいアプリケーションを開発] をクリックします。
    
![新しいアプリケーションを開発](https://github.com/r-40021/easy-chat/assets/75155258/b015d172-44d5-4e71-ba5f-fb28e3bd0652)
    
3. [ID 連携を使用しない] にチェックを入れます。その他の項目は画面に従って入力してください。
4. [確認]→[登録] とクリックします。
    
![確認](https://github.com/r-40021/easy-chat/assets/75155258/b984302c-76e6-42cb-8f9e-f5b09b4ee1bd)
![登録](https://github.com/r-40021/easy-chat/assets/75155258/3d2f7b15-4ba6-4646-8935-9477e3f7c3c0)

    
5. 発行された Client ID をコピーします。
    
![Client ID](https://github.com/r-40021/easy-chat/assets/75155258/f96bd842-e561-4556-88a2-f897d40474d5)
    
6. Visual Studio Code に戻り、 `.env` ファイルに以下の行を追加してください。  
(”=” の後は、先程取得した Client ID に置き換えてください。)

```
YAHOO_API_KEY=(Yahoo! Japan Web API の Client ID)
```

ここまでの手順で、`.env` ファイルの全体は以下のようになっています。

```
AWS_ACCESS_KEY_ID=(AWS のアクセスキー)
AWS_SECRET_ACCESS_KEY=(AWS のシークレットアクセスキー)
AWS_REGION=ap-northeast-1
METADATA_API_KEY=(メールに記載されている API キー)
YAHOO_API_KEY=(Yahoo! Japan Web API の Client ID)
```

これにて、API の準備は完了となります。お疲れ様でした。

ツールを動かせるようになるまであと一息です！

# サーバーを起動する

いよいよ「チャット返信作成支援ツール」を起動していきます。

1. Visual Studio Code に戻ります。  
画面下にターミナルが表示されていない場合は、[ターミナル]→[新しいターミナル] とクリックしてターミナルを再度開いてください。
    
![新しいターミナル](https://github.com/r-40021/easy-chat/assets/75155258/c72cdec9-dabe-4c52-9898-b96ea8ded374)

2. 表示されたターミナルに `npm run dev` と入力し、Enter キーを押します。
3. しばらく (数十秒) 待って以下のような画面が表示されたら、表示されている URL (ここでは http://localhost:5173/) にブラウザーでアクセスします。

![サーバー起動完了](https://github.com/r-40021/easy-chat/assets/75155258/830c84e1-84a2-491b-a3c0-644ae22ae8e4)

4. ツールが正常に開けば成功です！ここまで本当にお疲れ様でした！！
    
![ブラウザー上でツールが動いている様子](https://github.com/r-40021/easy-chat/assets/75155258/fd8a0349-9e5e-4c35-91ee-e19c7018d9ac)
    
5. サーバーを終了させたい場合は、ターミナル上で Ctrl + C を押してください。  
「パッチ ジョブを終了しますか」と聞かれた場合は「y」と入力して Enter キーを押すとサーバーが終了します。

# お問い合わせ先

この説明書に関して不明な点があれば、以下のお問い合わせ先までご連絡ください。

GitHub アカウントを持っている場合→ [GitHub Discussions](https://github.com/r-40021/easy-chat/discussions)

GitHub アカウントを持っていない場合→ [お問い合わせフォーム](https://frogapp.net/contact/)
