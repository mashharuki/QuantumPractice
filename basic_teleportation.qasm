include "qelib1.inc";
qreg q[5];
creg c[5];

// もつれたペアを作成する。
h q[2];
cx q[2],q[4];
barrier q[0],q[1],q[2],q[3],q[4];

// 積荷キュビット(ペイロードデータ)を用意する。
x q[0];
h q[0];
t q[0];
barrier q[0],q[1],q[2],q[3],q[4];

// 送信
h q[0];
h q[2];
cx q[2],q[0];
h q[2];
measure q[0] -> c[0];
measure q[2] -> c[2];
barrier q[3],q[4];

// 受信する。
x q[4];
z q[4];
barrier q[3],q[4];

// 確認する。
tdg q[4];
h q[4];
x q[4];
measure q[4] -> c[4];