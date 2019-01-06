$(window).on("load", () => {
  let trs = "";
  for (let i = 0; i < 9; i++) {
    let tds = "";
    for (let j = 0; j < 9; j++) {
      let cls = (Math.floor(i/3) + Math.floor(j/3))%2 < 1 ? 'filled' : '';
      tds += "<td><input id='cell_" + i + "_" + j + "' class='cell " + cls + "' type='text' size='1' maxlength='1'></td>";
    }
    trs += "<tr>" + tds + "</tr>";
  }
  $("table#grid")[0].innerHTML = trs;
});

$("#solve").on("click", () => {
  let vals = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push($("#cell_" + i + "_" + j).val() * 1);
    }
    vals.push(row);
  }

  console.log(vals);

  for (let n = 1; n <= 1; n++) {
    iterateBlock:
    for (let b = 0; b < 1; b++) {
      let block_vals = [];
      for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
          if (vals[i][j] === n) {
            console.log("OUT:" + block_vals);
            block_vals = [];
            continue iterateBlock;
          }
          row.push(vals[i][j] > 0 ? 0 : 1);
        }
        block_vals.push(row);
      }
      console.log(block_vals);

      for (let i = 0; i < 3; i++) {
        if (vals[i].indexOf(n) > 0) {
          for (let j = 0; j < 3; j++) {
            block_vals[i][j] = 0;
          }
        }
      }
      console.log(block_vals);

      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 9; k++) {
          if (vals[k][j] === n) {
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
        set_cell_n:
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (block_vals[i][j] === 1) {
              vals[i][j] = n;
              break set_cell_n;
            }
          }
        }
      }
      console.log(vals);

    }
  }
})
