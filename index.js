$(window).on("load", function(){
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
