$(window).on("load", () => {
  /** グリッド描画 ブロックごとに色分け */
  let trs = "";
  for (let i = 0; i < 9; i++) {
    let tds = "";
    for (let j = 0; j < 9; j++) {
      let cls = (Math.floor(i/3) + Math.floor(j/3))%2 < 1 ? "filled" : "";
      tds += `
        <td>
          <input id="cell_${i}_${j}" class="cell ${cls}" type="text" maxlength="1">
        </td>
      `;
    }
    trs += "<tr>" + tds + "</tr>";
  }
  $("table#grid")[0].innerHTML = trs;
});

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
  console.log(vals);

  /** 1~9の各数字を左上からブロックごとに算定してvalsに保持 */
  for (let n = 1; n <= 1; n++) {
    for (let b = 0; b < 9; b++) {
      fillBlock(n, b, vals);
    }
  }

  /** valsの値をグリッドに描画 */
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      $(`#cell_${i}_${j}`).val(vals[i][j] > 0 ? vals[i][j] : "");
      // TODO: 自動算出した値は色を変える
    }
  }
});

const fillBlock = (val, block, vals) => {
  /** 各ブロックの左上のセル位置 */
  const block_origins = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];

  const org_r = block_origins[block][0];
  const org_c = block_origins[block][1];

  let block_vals = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      if (vals[org_r+i][org_c+j] === val) {
        console.log("OUT:" + block_vals);
        return;
      }
      row.push(vals[org_r+i][org_c+j] > 0 ? 0 : 1);
    }
    block_vals.push(row);
  }
  console.log(block_vals);

  for (let i = 0; i < 3; i++) {
    if (vals[org_r+i].indexOf(val) > 0) {
      for (let j = 0; j < 3; j++) {
        block_vals[i][j] = 0;
      }
    }
  }
  console.log(block_vals);

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
        vals[org_r+i][org_c+idx] = val;
        break;
      }
    }
  }
  console.log(vals);
};
