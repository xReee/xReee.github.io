var password = [];
var userPassword = [0, 0, 0, 0];
var cores = [
    "rgb(255, 0, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
    "rgb(128, 0, 128)",
    "rgb(0, 255, 0)",
    "rgb(255, 165, 0)",
  ];
var answer = [];

var changeTool = function(elem) {
  var id = parseInt($(elem).attr("id").replace('n','')) - 1;
  $(elem).css("background-color", cores[userPassword[id]]);
  userPassword[id] ++;
  if (userPassword[id] >= 6) userPassword[id] = 0;
}

var generatePassword = function() {
  var newPassword = [];
  for (var i = 0; i <= 3; i++) {
    var number = Math.floor((Math.random() * 6));
    if (newPassword.includes(number)) {
      i--;
    } else {
      newPassword[i] = number;
    }
  }

  console.log(newPassword);
  return newPassword;
}

var checkPassword = function() {
  var rightAnwsers = 0;
  var rightColorWrongPositions = 0;
  console.log(password);
  console.log(userPassword);
  for(var i = 0; i <= 3; i++) {
    if (password[i] == userPassword[i]) {
      rightAnwsers++;
    } else if (password.includes(userPassword[i])) {
      rightColorWrongPositions++;
    } 
  }
  speak(rightAnwsers, rightColorWrongPositions);
  console.log(rightAnwsers);
  console.log(rightColorWrongPositions);
}

function speak(rightAnwsers, rightColorWrongPositions){
  var rightAnwsersLabel = " arma na posição correta";
  var rightColorWrongPositionsLabel = " arma correta está no slot errado";
  if (rightAnwsers != 1) rightAnwsersLabel = " armas nas posições corretas";
  if (rightColorWrongPositions != 1) rightColorWrongPositionsLabel = " armas corretas estão no slot errado!";
  $(".speach").text("Hmmm.. você acertou " + rightAnwsers + rightAnwsersLabel + "! Tirando isso, " + 
                      rightColorWrongPositions + rightColorWrongPositionsLabel);
}

$(document).ready(function() {
  password = generatePassword();

  $(".slot").click(function(){
    changeTool(this);
  });

  $(".testButton").click(checkPassword);
});