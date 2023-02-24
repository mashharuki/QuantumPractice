# 量子コンピュータプログラミングリポジトリ

量子コンピュータについて、学ぶためのリポジトリです。

### 量子コンピュータ
      量子特有の性質を使用して演算を行うコンピュータ
      身近ではない物理現象を利用しているため、従来のコンピュータとは異なる振る舞いをみせる。
      下記2種類存在する
      ①ゲート型
      ②アニーリング型

### キュビット

量子コンピュータで使うのは普通のビットではない。キュビットを用いる。  
キュビットは、「ある物の**異なる状態**」を表す。(可能性を表す。だからシミュレーションと相性が良い。)


### 量子コンピュータの性質
       ①汎用性
       ②高速性
       
### 代表的な量子アルゴリズム
       大きく分けて2種類に分けられる
       万能型  グローバー型 グローバーのアルゴリズム (データ探索) 
                位相推定型   ショアのアルゴリズム (素因数分解) → 暗号解読につながる。 ブロックチェーンも危ういかも・・・
       
       NISQ型  VQEアルゴリズム (量子化学計算)
                 QADAアルゴリズム (さまざまな組み合わせ問題の解決)
　　　　　　　　

### ゲート型量子コンピュータ
       汎用型量子コンピュータとも言われており、量子ゲートを利用して演算を行う。
       代表格は、IBM Q

### アニーリング型量子コンピュータ
       組み合わせ最適化問題に特化した量子コンピュータ
       特定のアルゴリズムを解くために作られたもの。
       代表格は、D-Wave

### キュビット
    従来のコンピュータでビットにあたるもの。量子コンピュータではキュビットとして表現する。
    (0と1の数値状態を保持する1桁のこと) 
    あらゆる確率の重ね合わせの状態を保持することができる。

#### キュビットの操作

量子計算とは、キュビットに操作を加えて状態を変えることである。  

initial state (始状態) → transition (遷移) → final state (終状態)

|0> |1> →  |0> |0> 

### 重ね合わせ

|φ>

### ユニタリ変換とは

2つのベクトルの内積の値が変換の前後で変わらないような変換である。

### 量子計算

次の2つのステップで進める

1. 重ね合わせの状態を利用して、あらゆる可能性を同時並行的に計算する。
2. 重ね合わせの状態の中から、目的とする結果に相当する状態だけが残るような古いわけの操作を施す。

### 多重キュビット
    複数のキュビットを同時に動作させる。  
    量子もつれを引き起こすことができる。  

### 量子整数
       キュビットで表現される整数のこと  
       大きさと位相を扱う値として表現される。
       
### 量子の波の性質
       確率と位相の状態をもつ

### QPU (Quantum Processing Unit：量子処理装置)
    量子コンピュータプログラムを実行する演算装置のこと。
       
### HADゲート
    キュビットを重ね合わせの状態にするための命令。従来のCPUには存在しない。
    アダマール：位相
    波を干渉させる。
       
### READゲート
    キュビットを測定するための命令。
    
### CNOTゲート
       制御キュビットが1の時にターゲットキュビットにNOT演算を適用させる。
       ２つのキュビットを連動させること。(もつれ状態にすること。)
       2つの入力と2つの出力
       下位キュビット ターゲットビット
       上位キュビット 制御ビット
       ※制御ビットが1の時にターゲットが入れ替わる！！
   
### NOTゲート
       キュビットの状態を反転させる(重ね合わせ具合を反転させている。)
       並の高さを確率と捉えることができる。(確率振幅)

### ブラケット記法  
　　　　　　　　　量子の状態を数理モデルで表す時に使用する方法　
    　　　　例：） 100%「0」になるときの書き方 |0> 100%「1」になるときの書き方 |1>
    
### 量子情報
      量子状態が有する情報
      量子情報はコピーすることができない。

### 量子暗号
    量子コンピュータの技術を用いた新たな暗号技術のこと。  
    従来のコンピュータでは解読できないとされる。

### 量子鍵配送(QKD：Quantum Key Distribution)
    量子暗号の中核に存在するプロトコル。BB84   
    このプロトコルを使うことで安全に情報伝達が可能となる。  

### 量子テレポーテーション 
    理論上は盗聴が不可能であり、セキュリティ問題を解決することが期待される。    
    あるキュビットの状態(位相と振幅の大きさ)を遠隔にある別のキュビットに転送するアルゴリズム。  
    元の状態については必ず破壊する必要がある。
    もつれ状態となったキュビットを渡すことが必要。(第3者が作成することが必要)
    キュビットをこう操作すれば同じ状態となるはず。(一致するかを確かめる。)
    →量子情報通信への応用
    確率と位相がわからない。。
    媒体無しで相関するので、一段上のセキュリティを実現できる。

### ショアのアルゴリズム
    素因数分解を効率的に解くことができるアルゴリズム。  
    量子コンピュータが完成し、このアルゴリズムを実行できるようになれば、
    現在社会で使用されている公開鍵暗号技術(RSAや楕円曲線暗号)などは簡単に破られてしまう。  
    (HTTTPS通信やブロックチェーンで使用されているデジタル署名などのセキュリティを担保するための
    仕組みは、全てこの類の暗号技術を使っており、現実的な時間内では解読できないということで安全性
    が担保されている。つまり、情報を暗号化しても意味がなくなるため世の中に大混乱が起きる可能性がある。)  

## キュビットを円表示で表現する。
      N個のキュビットを表現するには、2のN乗個分の円が必要となる。
  
### ベルペア
       HAD命令とCNOT命令の組み合わせで、もつれたリンクを確立する。  
       2つのキュビットからなるもつれ状態

### QPUプリミティブ(QPU演算の基本要素)
      量子アプリケーションの構造は次の通り  
      ① 重ね合わせの生成  
      ② 重ね合わせでの計算  
      ③ 位相操作  
      ④ 読み出し(観測)  

### ブロッホ球
       「確率」と「位相」をもつキュビットの状態を可視化したもの  
       確率：波の高さ  
       位相：波の周期のずれ

### 量子ゲート
      量子コンピュータが動作する回路
      キュビットの状態を制御するのが目的です。

### 論理ゲート
       従来のコンピュータが動作する回路
       電動スイッチにはトランジスタが使用されている
       トランジスタも基本はリレー回路   

### スピン
       量子の取る状態の一例 
       磁気モーメント
       量子力学の原理に基づいた量子の状態を数値に紐づけている。　
       
### 量子コンピュータのプログラミング言語
      OpenQASM (Open Quantum Assembly Language) (オープンカズム)
      ゲート型量子コンピュータ用のプログラミング言語
      https://en.wikipedia.org/wiki/OpenQASM
      https://github.com/Qiskit/openqasm
     
### IBMQ
       超電導量子ビットをキュビットとして使用している。
       ゲートの種類に応じたマイクロ波でキュビットを制御する。
       サービスとして利用できるのは、5キュビットまで
       
### NISQ
       エラー訂正機能無し量子コンピュータ
       
### 量子のもつれ
      1つ目が測定されると2つ目のキュビットも同じ結果に収束する。
      数キロバイト離れた先のキュビットでももつれ状態とすることができる。
      暗号鍵の配送でも使用されている。(QKD)


### 振幅増幅 
       他のキュビットのとの位相差を大きさの差に変換する。
       これを反復することを振幅増幅の反復という。
       キュビット測定時に位相の状態を読み取ることはできないが、振幅の大きさ(確率)に変換できれば読み取ることが出来る。。
       量子和推定技術への応用が期待されている。
       位相差を情報として出力するところが強力で、解の妥当性を繰り返しチェックするような問題に向いている。。
    
### 量子フーリエ変換(QFT)
　　　 相対位相の大きさの中に隠れている情報やパターンにアクセスするための基本演算の一つ
       
### 離散フーリエ変換(DFT)
       信号から周波数の情報を抽出することができる。

### 高速フーリエ変換(FFT)
       DFTと同じ変換をするがものすごく高速で実行できる。
       
### 位相エンコーディング
       ピクセルの値を重ね合わせの位相で示す方法。
       振幅増幅の手法を使える！

### 量子機械学習(QML)
       非常に多くのキュビットが必要となる。
        連立線形方程式の解法
        量子主成分分析
        量子サポートベクターマシン

### 虚数

虚数とは英語で imaginary number といい、2乗したときに0未満の実数になる数を指します。  

「1つの数で座標を表せること」

つまり、「東に〇 m進む」という表現だけで平面上の好きな場所へ進めるようになったのです。(複素数)


### 参考文献
1. [ユニタリ変換](https://eman-physics.net/quantum/unitary.html)


