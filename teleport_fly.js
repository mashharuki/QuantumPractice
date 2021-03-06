// ハエの画像データを送る量子テレポーテーションのサンプル
// this can be 6 or 8, for a mini-fly or full-fly.
// 8キュビットを使用する。
var num_fly_qubits = 8; 

qc_options.color_by_phase = true;

// This is the left half of the pixels of the fly,
// encoded as an 8x16 array:
var image8 = [ '........',
                   '...X....',
                   '....X.XX',
                   '.....XXX',
                   '....XXXX',
                   'XX...XXX',
                   '..XXX.XX',
                   '...X....',
                   '..X...XX',
                   '.X...XXX',
                   'X....XXX',
                   'X..XXXXX',
                   '.XXX.XXX',
                   '...X..XX',
                   '..X.....',
                   '........'];

// This is the left half of the pixels of the mini-fly,
// encoded as an 4x8 array:
var image6 = [ '..X.',
                   '...X',
                   'X.XX',
                   '.X..',
                   'X..X',
                   'X..X',
                   '.XX.',
                   'X...'];

var image = (num_fly_qubits == 8) ? image8 : image6;

// This is the classic teleport example, but with an interesting
// payload, and some controllable error.
//　メイン関数
function main() {
    // <--- change this number to 0.1 or more
    var teleport_error = 0.0   
    var do_teleport = false; // Enables the teleporter
    // キュビットを用意する。
    qc.reset(3 * num_fly_qubits);
    var fly = qint.new(num_fly_qubits, 'fly');
    var epair1 = qint.new(num_fly_qubits, 'epair1');
    var epair2 = qint.new(num_fly_qubits, 'epair2');
    // ペイロードを用意する。　
    prepare_fly(fly);
    
    if (do_teleport) {
        // 量子のもつれ状態を作る。(ベルペアを作成する。)
        entangle_pair(epair1, epair2);
        // 送信
        var digital_bits = send_payload(fly, epair1);
        
        apply_error(epair2, teleport_error);
        // 受信
        receive_payload(epair2, digital_bits);
        cleanup_view(fly, epair1, epair2);
    }
}

// 量子のもつれを作成する関数
function entangle_pair(ep1, ep2) {
    qc.label('entangle pair');

    // ベルペアを作成する。
    ep1.write(0);
    ep2.write(0);
    ep1.hadamard();
    ep2.cnot(ep1);

    qc.label('');
    qc.nop();
}

var last_not = 0;

// データ(ハエの画像データを用意する。)
function prepare_fly(fly) {
    qc.label('encode fly');

    // Encode the fly pixels into relative phases in a
    // quantum superposition
    fly.write(0);
    fly.hadamard();
    for (var y = 0; y < image.length; ++y) {
        for (var x = 0; x < image[0].length; ++x) {
            if (image[y][x] == 'X')
                pixel(fly, x + 0, y);
        }
    }
    fly.not(last_not);
    qc.cnot(fly.bits((1 << (num_fly_qubits >> 1)) - 1), fly.bits(1 << ((num_fly_qubits - 1) >> 1)));
    fly.Grover();

    // At this point, reading the "fly" register would be very likely
    // to return the coordinates of one of the pixels in the fly.
    qc.label('');
    qc.nop();
}

function pixel(obj, x, y) {
    // Given x and y, flip the phase of one term
    // Note: last_not is used to avoid redundant NOT gates
    var val = ~((y << (num_fly_qubits >> 1)) | x);
    obj.not(val ^ last_not);
    last_not = val;
    obj.cphase(180, ~(1 << ((num_fly_qubits - 1) >> 1)));
}

// ペイロードを送信する関数
function send_payload(payload, ep) {
    qc.label('send payload');

    // Entangle the payload with half of the e-pair, and then vaporize it!
    ep.cnot(payload);
    payload.hadamard();
    var digital_bits = [payload.read(), ep.read()];

    qc.label('');
    qc.nop();
    return digital_bits;
}

function apply_error(qubits, error_severity) {
    qc.label('apply error');

    // Apply some unpredictable noise to the system
    qc.noise(error_severity, qubits.bits());

    qc.label('');
    qc.nop();
}

// 受信する関数
function receive_payload(ep, digital_bits) {
    qc.label('receive payload');

    // Teleport receiver applies the correct operations based on
    // the digital data. Note that in this example we *could*
    // use postselection, but would only succeed once every 65,536
    // tries, on average.
    ep.not(digital_bits[1]);
    for (var bit = 1; bit <= digital_bits[0]; bit <<= 1) {
        if (bit & digital_bits[0])
            ep.phase(180, bit);
    }
    qc.label('');
    qc.nop();
}

function cleanup_view(fly, epair1, epair2) {
    // Here, we make the resulting fly show up nicely in our state vector display.
    fly.exchange(epair2);
    epair1.write(0);
    epair2.write(0);
    epair1.discard();
    epair2.discard();
    qc.nop();
    show_state_vector();
}

function show_state_vector() {
  list = qc.panel_chart.widgets;
  for (var i = 0; i < list.length; ++i) {
    if (list[i].stateVector) {
      console.log(list[i]);
      list[i].collapsed = false;
    } else if (list[i].blochSphere || list[i].densityMatrix || list[i].graphState || list[i].stabilizerState)
        list[i].in_use = false;
  }
}

// メイン関数の呼び出し
main();

