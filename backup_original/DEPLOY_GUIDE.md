# JCS Giba コーポレートサイト デプロイ・ドメイン設定ガイド

本プロジェクト（静的HTML + CSS + JS）を GitHub にプッシュし、Vercel で公開した上で、Google Workspaceで管理している独自ドメインを設定する手順です。

---

## STEP 1: GitHub へのアップロード

1. **Git の初期化とコミット**
   PCのターミナル（PowerShellなど）を開き、プロジェクトフォルダ内で以下のコマンドを実行します。
   ```bash
   git init
   git add .
   git commit -m "Initial commit of JCS Giba Corporate Site"
   ```

2. **GitHub リポジトリの作成**
   - [GitHub](https://github.com/) にログインし、右上の「＋」ボタンから **New repository** を選択します。
   - Repository name に `jcs-giba-site` などを入力します。
   - 公開設定（Public / Private）はお好みで選択し、一番下の **Create repository** をクリックします。

3. **リポジトリの紐付けとプッシュ**
   GitHubに表示されたコマンド（"push an existing repository..."）をコピーして実行します。
   ```bash
   git branch -M main
   git remote add origin <あなたのGitHubリポジトリURL>
   git push -u origin main
   ```

---

## STEP 2: Vercel でのデプロイ

Vercelは静的HTMLファイルを自動認識するため、ビルド設定の変更なしで即座に公開可能です。

1. **Vercel にログイン**
   - [Vercel](https://vercel.com/) にアクセスし、**Continue with GitHub** でログインします。

2. **リポジトリのインポート**
   - ダッシュボードの **Add New...** → **Project** をクリックします。
   - 先ほどGitHubにプッシュしたリポジトリ（`jcs-giba-site`）の横にある **Import** をクリックします。

3. **デプロイの実行**
   - Configure Project 画面が表示されますが、今回は静的サイト（ビルド不要）ですので、**設定はすべてデフォルトのままでOK** です。
   - 画面下部の **Deploy** ボタンをクリックします。
   - 数十秒でデプロイが完了し、`https://xxx.vercel.app` というプレビュー用の公開URLが発行されます。

---

## STEP 3: 独自ドメインの設定（Google Workspace / DNS設定）

Google Workspace（またはGoogle Domains / Squarespace / お名前.comなど）で管理している独自ドメインを紐付けます。

1. **Vercel 側でのドメイン追加**
   - Vercelのプロジェクト画面で **Settings** タブをクリックし、左メニューの **Domains** を選択します。
   - 使用したいドメイン（例：`jcs-giba.com` や `www.jcs-giba.com`）を入力し、**Add** をクリックします。
   - 推奨されるリダイレクト設定（`jcs-giba.com` を `www.jcs-giba.com` にリダイレクト、またはその逆）が表示されますので、推奨通り追加します。

2. **DNS レコード情報の確認**
   Vercelの画面上に、設定すべきDNSレコードが赤字（Invalid Configuration）で表示されます。通常は以下の2つを設定します。

   * **ネイキッドドメイン（`example.com` など `www` なし）**
     - Type: `A`
     - Name (Host): `@` (または空欄)
     - Value (Points to): `76.76.21.21`

   * **サブドメイン（`www.example.com` など `www` あり）**
     - Type: `CNAME`
     - Name (Host): `www`
     - Value (Points to): `cname.vercel-dns.com`

3. **DNS レコードの登録**
   - Google Workspaceでお使いのドメインの管理画面（通常はドメインを購入したレジストラ、例えばGoogle Domains [注: 現在Squarespaceへ移行済] の場合はSquarespaceのドメイン管理コンソール）にログインします。
   - 該当ドメインの **DNS設定（またはネームサーバー設定）** 画面を開きます。
   - 上記の Aレコード および CNAMEレコード を追加し、保存します。

4. **設定の反映待ち**
   - DNSレコードの設定は通常数分〜最大24時間で世界中に反映されます。
   - 反映されると、Vercel上の赤字の警告が緑色の「Valid Configuration」に変わり、SSL証明書（HTTPS）が自動で発行されます。
   - これで独自ドメインでの公開が完了します！
