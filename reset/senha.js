var elemAtual;
var contador = 0;
var count1c = 0;
var count2c = 0;
var count3c = 0;
var count4c = 0;
var cores = ["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 0)", "rgb(128, 0, 128)", "rgb(0, 255, 0)", "rgb(255, 165, 0)", "rgb(255, 192, 203)", "rgb(128, 128, 128)"];
var senha;
var ganhou = new Audio();
ganhou.src = "ganhou.mp3";
var perdeu = new Audio();
perdeu.src = "perdeu.mp3"

var fazTabela = function() {
  var aSecreto = "<tr class = 'codigo'><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td></tr>";
  $(".tabela").append(aSecreto);
  for (var i = 10; i >= 1; i--) {
      var aLivre = "<tr id='" + i +"' class = 'tentativa'><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td><div></div></td><td id = 'dica' class = '" + i + "'><div></div><div></div><div></div><div></div></tr>";
      $(".tabela").append(aLivre);
  }
  var selecao = "<tr class = 'selecao'><td><div id = '1c'></div></td><td><div id = '2c'></div></td><td><div id = '3c'></div></td><td><div id = '4c'></div></td></tr>";
  $(".tabelaS").append(selecao);
}

var geraCodigo = function() {
  var codigo = [];
  for (var i = 0; i <= 3; i++) {
    codigo[i] = cores[Math.floor((Math.random() * 8))];
  }
  return codigo;
}

var marcarCores = function(local, codigo) {
    codigo.forEach(function(cor, indice){
      $(local).eq(indice).css("background", cor);
    })
}

var compara = function(codigo, tentativa) {
  var dicas = [];
  for (var i in tentativa) {
    if (codigo.indexOf(tentativa[i]) == -1) dicas.push('rgb(100, 149, 237)');
    else if (tentativa[i] == codigo[i]) dicas.push('rgb(0, 0, 0)');
    else dicas.push('rgb(255, 255, 255)');
  }
  var dicasShuffle = shuffle(dicas);
  return dicasShuffle;
}

var comparaArray = function(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  for (var i = 0, len = arr1.length; i < len; i++){
    if (arr1[i] !== arr2[i]){
      return false;
      }
    }
    return true;
}

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var verificaArray = function(array) {
	if (array.indexOf('rgb(100, 149, 237)') != -1) {
  		alert('Digite uma senha válida');
  		return true;
  };

}

var confirma = function() {
  var tela = [];
  for(var i = 0; i <= 3;i++) tela.push($('.selecao div').eq(i).css("background-color"));
  if(verificaArray(tela)) return;
  contador++
  marcarCores("#" + contador + " td div", tela);
  marcarCores("." + contador + " div", compara(senha, tela));
  verificaStatus(senha, tela);
}

var mudaCor = function(elem){
  switch ($(elem).attr("id")) {
    case "1c":
      $(elem).css("background", cores[count1c]);
      count1c ++;
      if (count1c >= 8) count1c = 0;
      break;
    case "2c":
        $(elem).css("background", cores[count2c]);
        count2c ++;
        if (count2c >= 8) count2c = 0;
        break;
    case "3c":
          $(elem).css("background", cores[count3c]);
          count3c ++;
          if (count3c >= 8) count3c = 0;
          break;
    case "4c":
            $(elem).css("background", cores[count4c]);
            count4c ++;
            if (count4c >= 8) count4c = 0;
            break;
  }
}

var verificaStatus = function(senha, tela){
  if (comparaArray(senha,tela)){
    setTimeout(alertarGanhou, 100);
    marcarCores(".codigo td div", senha);
    $(".confirma").off();
    return true;
  }
  if (contador == 10 && comparaArray(senha,tela) == false) {
    setTimeout(alertarPerdeu, 100);
    marcarCores(".codigo td div", senha);
    $(".confirma").off();
    return false;
  }
}

var alertarGanhou = function(){
    ganhou.play();
    alert("Você ganhou!!!");
  }

var alertarPerdeu = function(){
    perdeu.play();
    alert("Você perdeu!!!");
}

$(document).ready(function() {
  fazTabela();
  senha = geraCodigo();
  $(".selecao div").click(function(){
    mudaCor(this);
  });
  $(document).keydown(function(e) {
    var i;
    if (e.which == 49) i = 1;
    if (e.which == 50) i = 2;
    if (e.which == 51) i = 3;
    if (e.which == 52) i = 4;
    mudaCor("#" + i + "c");
  });
  $(".confirma").click(confirma);
  $(".regras").click(function(){
    $(".pRegras").toggle();
  });
});
