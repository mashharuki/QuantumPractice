// キュビットを3つ初期化
qc.reset(3);
var alice = qint.new(1, 'alice');
var ep    = qint.new(1, 'ep');
var bob   = qint.new(1, 'bob');
var a1 = 0;
var a2 = 0;

// 関数を呼び出して量子テレポーテーションを実行する。
// もつれペアを作成
entangle();
// ペイロードを用意する
alice_prep();
// 送信
alice_send();
//  受信
bob_receive();
// 確認
bob_verify();

// もつれのペアを用意した。(ベルペアを作成する。)
function entangle() {
    // First, create an entangled pair
    qc.write(0, 2|4);
    qc.label('entangle');
    ep.had();
    bob.cnot(ep);
    qc.label('');
}

// ペイロードを用意するための関数
function alice_prep() {
    // Alice prepares her payload to teleport
    alice.write(0);
    qc.label('prep payload');
    alice.had();
    alice.phase(45);
    alice.had();
    qc.label('');
    qc.nop();
}

// 送信するための関数
function alice_send() {
    // Alice sends the payload (and destroys it in the process)
    qc.label('send');
    ep.cnot(alice);
    // ペイロードをもつれ状態にする。
    alice.had();
    a1 = alice.read();
    a2 = ep.read();
    qc.label('');
    qc.nop();
}

// 受信するための関数
function bob_receive() {
    // Bob receives the payload, using the two bits Alice sent
    qc.label('receive');
    var bob_is_asleep = false;
    var use_conditonals = true;

    // Option 1: Bob is asleep (can't respond to Alice's data), so he just does whatever.
    if (bob_is_asleep) {
        bob.not();
        bob.phase(180);
    } else if (use_conditonals) { // Option 2: Bob is responsive, and we use conditional-ops for visual clarity
        // Here, we use conditional gates, just for visual clarity.
        // The "conditions" are on qubits which have already been read and
        // turned into classical bits.
        bob.cnot(ep);
        bob.cz(alice);
    } else {  // Option 3: Bob is responsive, and we use straightforward "if" in the code.
        if (a2)
            bob.not();
        if (a1)
            bob.phase(180);
    }
    qc.label('');
    qc.nop();
}

// 確認するための関数
function bob_verify() {
    // Verify that the teleportation worked
    qc.label('verify');
    bob.had();
    bob.phase(-45);
    bob.had();
    bob.read();
    qc.label('');
    qc.nop();
}

