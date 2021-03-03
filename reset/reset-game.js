var password = [];
var userPassword = [0, 1, 2, 3];
var answer = [];
var lifeNumber = 3;
var monsterNumber = 5;
var rightAnwsers = 0

var changeTool = function(elem) {
  var id = parseInt($(elem).attr("id").replace('n','')) - 1;
  var arrayWithoutOldValue = userPassword.filter(item => item !== id)
  var newPassword = userPassword[id]
  var shouldContinue = true;

  while (shouldContinue) {
    newPassword++
    if (newPassword > 5) newPassword = 0
    if (!arrayWithoutOldValue.includes(newPassword)) {
      userPassword[id] = newPassword
      shouldContinue = false;
    }
  }
  userPassword[id] = newPassword 
  $(elem).children('#tool').attr("src","reset-assets/tools/arma"+ userPassword[id]+".svg");
  blink(elem);
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
  return newPassword;
}

function blink(elem) {
  $(elem).fadeTo('fast', 0.2).fadeTo('fast', 1.0);
}

function test() {
  checkPassword(false);
  if (rightAnwsers != 4) {
    blink($("#monster"));
    monsterNumber--;
  } 
  if (monsterNumber == 0) {

    $('#testButton').unbind();
    $('#testButton').css({ opacity: 0.1});
  }

  updateMenuNumbers();
}

function atack() {
  blink($("#atackButton"));
  checkPassword(true);
  if (rightAnwsers != 4) {
     lifeNumber--;
     blink($("#heart"));
  }
  if (lifeNumber == 0) {
    $('#modal-gameover').modal('show');
    resetGame();
  } else if (monsterNumber == 0) {
    resetTests();
  }
  updateMenuNumbers();
}

var checkPassword = function(isAtack) {
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
  speak(rightAnwsers, rightColorWrongPositions, isAtack);
}

function speak(rightAnwsers, rightColorWrongPositions, isAtack) {
  if (isAtack == true) {
    $(".speach").text("Hehe! Você errou, -1 de vida!");
    $(".speach").addClass('bubble-bottom-right').removeClass('bubble-bottom-left');
  } else {
    var rightAnwsersLabel = " arma na posição correta";
    var rightColorWrongPositionsLabel = " arma correta está no slot errado";
    if (rightAnwsers != 1) rightAnwsersLabel = " armas nas posições corretas";
    if (rightColorWrongPositions != 1) rightColorWrongPositionsLabel = " armas corretas estão no slot errado!";
    $(".speach").html("Hmmm.. <b>Resultado do teste</b>: você acertou " + rightAnwsers + rightAnwsersLabel + "! Tirando isso, " + 
                      rightColorWrongPositions + rightColorWrongPositionsLabel);
    $(".speach").addClass('bubble-bottom-left').removeClass('bubble-bottom-right');
  }
  
}

function updateMenuNumbers() {
  $(".monster-number").text(monsterNumber);
  $(".life-number").text(lifeNumber);
}

function resetTools() {
  for (var i = 1; i <= 4; i++) {
    $("#n" + i).children('#tool').attr("src","reset-assets/tools/arma"+ userPassword[i - 1] +".svg");
    console.log(userPassword[i])
    console.log($("#n" + i).children('#tool'))
  }
}

function resetGame() {
  password = generatePassword();
  lifeNumber = 3;
  rightAnwsers = 0
  userPassword = [0, 1, 2, 3];
  answer = [];
  updateMenuNumbers();
  resetTools();
  resetTests();
}

function resetTests() {
  monsterNumber = 5;
  $("#testButton").click(test);
  $('.testButton').css({ opacity: 1});
}

$(document).ready(function() {
  resetGame();

  $(".slot").click(function(){
    changeTool(this);
  });

  

});