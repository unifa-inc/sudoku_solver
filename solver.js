$("#solve").on("click", () => {
  /** vals（２次元配列）に現在の入力値を保持 */
  let vals = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push($(`#cell_${i}_${j}`).val() * 1);
    }
    vals.push(row);
  }

  /** 答えが見つからなくなるまでループ */
  let solved_cnt;
  do {
    solved_cnt = 0;
    /** 1~9の各数字を左上からブロックごとに算定してvalsに保持 */
    for (let n = 1; n <= 9; n++) {
      for (let b = 0; b < 9; b++) {
        const solved = solveBlock(n, b, vals);
        solved_cnt += solved ? 1 : 0;
      }
    }
  } while (solved_cnt > 0);

  /** valsの値をグリッドに描画 */
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (vals[i][j] > 0 && $(`#cell_${i}_${j}`).val() != vals[i][j]) {
        $(`#cell_${i}_${j}`).val(vals[i][j]);
        $(`#cell_${i}_${j}`).addClass("solved");
      }
    }
  }
});

const solveBlock = (num, block, vals) => {
  /** 各ブロックの左上のセル位置 */
  const block_origins = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];

  const org_r = block_origins[block][0];
  const org_c = block_origins[block][1];

  /** 3x3の2次元配列に制約を保持　numが入る可能性が、ある(1)/ない(0) */
  let block_cstrs = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      /** すでにnumがあれば次のブロックへ */
      if (vals[org_r+i][org_c+j] === num) {
        return;
      }
      row.push(vals[org_r+i][org_c+j] > 0 ? 0 : 1);
    }
    block_cstrs.push(row);
  }

  /** 水平方向のブロックにnumが存在するか確認 */
  for (let i = 0; i < 3; i++) {
    if (vals[org_r+i].indexOf(num) >= 0) {
      for (let j = 0; j < 3; j++) {
        block_cstrs[i][j] = 0;
      }
    }
  }

  /** 垂直方向のブロックにnumが存在するか確認 */
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 9; k++) {
      if (vals[k][org_c+j] === num) {
        for (let i = 0; i < 3; i++) {
          block_cstrs[i][j] = 0;
        }
        break;
      }
    }
  }

  /** 3x3の2次元配列に1が1つの場合のみnumがそのセルに入ると断定できる */
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += block_cstrs[i][j];
    }
  }
  if (sum === 1) {
    for (let i = 0; i < 3; i++) {
      const idx = block_cstrs[i].indexOf(1);
      if (idx >= 0) {
        vals[org_r+i][org_c+idx] = num;
        break;
      }
    }
  }

  return sum === 1 ? true : false;
};
