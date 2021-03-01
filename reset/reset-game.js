var password = [];
var userPassword = [0, 0, 0, 0];
var answer = [];
var lifeNumber = 3;
var monsterNumber = 5;
var rightAnwsers = 0

var changeTool = function(elem) {
  var id = parseInt($(elem).attr("id").replace('n','')) - 1;
  $(elem).children('#tool').attr("src","reset-assets/tools/arma"+ userPassword[id]+".svg");
  console.log(userPassword[id]);
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

function test() {
  checkPassword();
  if (rightAnwsers != 4) monsterNumber--;
  if (monsterNumber == 0) {
    $('#testButton').unbind();
    $('.testButton').css({ opacity: 0.1});
  }

  updateLabel();
}

function atack() {
  checkPassword();
  if (rightAnwsers != 4) lifeNumber--;
  if (lifeNumber == 0) {
    $('#myModal1').modal('show');
  }
  updateLabel();
}

var checkPassword = function() {
  var rightAnwsers = 0;
  var rightColorWrongPositions = 0;
  for(var i = 0; i <= 3; i++) {
    if (password[i] == userPassword[i]) {
      rightAnwsers++;
    } else if (password.includes(userPassword[i])) {
      rightColorWrongPositions++;
    } 
  }
  this.rightAnwsers = rightAnwsers
  speak(rightAnwsers, rightColorWrongPositions);
  
}

function speak(rightAnwsers, rightColorWrongPositions){
  var rightAnwsersLabel = " arma na posição correta";
  var rightColorWrongPositionsLabel = " arma correta está no slot errado";
  if (rightAnwsers != 1) rightAnwsersLabel = " armas nas posições corretas";
  if (rightColorWrongPositions != 1) rightColorWrongPositionsLabel = " armas corretas estão no slot errado!";
  $(".speach").text("Hmmm.. você acertou " + rightAnwsers + rightAnwsersLabel + "! Tirando isso, " + 
                      rightColorWrongPositions + rightColorWrongPositionsLabel);
}

function updateLabel() {
  $(".monster-number").text(monsterNumber);
  $(".life-number").text(lifeNumber);
}

$(document).ready(function() {
  password = generatePassword();
  updateLabel();

  $(".slot").click(function(){
    changeTool(this);
  });

  $("#testButton").click(test);
  $("#atackButton").click(atack);
  
});