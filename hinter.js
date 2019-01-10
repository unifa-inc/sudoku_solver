$("#hint").on("click", () => {
  /** vals（２次元配列）に現在の入力値を保持 */
  let vals = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push($(`#cell_${i}_${j}`).val() * 1);
      $(`#cell_${i}_${j}`).removeClass("hinted");
    }
    vals.push(row);
  }
  console.log(vals);

  /** 1~9の各数字を左上からブロックごとに算定。ヒントが見つかったらbreak */
  let hint_cell;
  iterateNumber:
  for (let n = 1; n <= 9; n++) {
    for (let b = 0; b < 9; b++) {
      console.log(`Block: ${b}, n: ${n}`);
      hint_cell = hintBlock(n, b, vals);
      if (hint_cell) { break iterateNumber; }
    }
  }

  /** ヒントのセルを色付け */
  if (hint_cell) {
    const [r, c] = hint_cell
    $(`#cell_${r}_${c}`).addClass("hinted");
    $(`#cell_${r}_${c}`).focus();
  } else {
    alert("ボーっと生きてんじゃねーよ！");
  }
});

const hintBlock = (val, block, vals) => {
  /** 各ブロックの左上のセル位置 */
  const block_origins = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];

  const org_r = block_origins[block][0];
  const org_c = block_origins[block][1];

  /** 3x3の2次元配列に制約を保持　valが入る可能性が、ある(1)/ない(0) */
  let block_vals = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      /** すでにvalがあれば次のブロックへ */
      if (vals[org_r+i][org_c+j] === val) {
        console.log(`OUT: ${block_vals}`);
        return;
      }
      row.push(vals[org_r+i][org_c+j] > 0 ? 0 : 1);
    }
    block_vals.push(row);
  }

  /** 水平方向のブロックにvalが存在するか確認 */
  for (let i = 0; i < 3; i++) {
    if (vals[org_r+i].indexOf(val) >= 0) {
      for (let j = 0; j < 3; j++) {
        block_vals[i][j] = 0;
      }
    }
  }

  /** 垂直方向のブロックにvalが存在するか確認 */
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 9; k++) {
      if (vals[k][org_c+j] === val) {
        for (let i = 0; i < 3; i++) {
          block_vals[i][j] = 0;
        }
        break;
      }
    }
  }
  console.log(block_vals);

  /** 3x3の2次元配列に「1」が1つのみの場合、valがそのセルに入ると断定できる */
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += block_vals[i][j];
    }
  }
  if (sum === 1) {
    for (let i = 0; i < 3; i++) {
      const idx = block_vals[i].indexOf(1);
      if (idx >= 0) {
        console.log(`HINT: ${val}`);
        return [org_r+i, org_c+idx];
      }
    }
  }
  console.log(vals);
};
