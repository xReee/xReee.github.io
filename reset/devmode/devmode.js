var password = [];
var userPassword = [0, 1, 2, 3];
var answer = [];
var lifeNumber = 3;
var monsterNumber = 5;
var rightAnwsers = 0

var changeTool = function(elem) {
  deslockutton();
  var id = parseInt($(elem).attr("id").replace('n','')) - 1;
  var arrayWithoutOldValue = userPassword.filter(item => item !== id)
  var newPassword = userPassword[id]
  var shouldContinue = true;

  while (shouldContinue) {
    newPassword++;
    if (newPassword > 5) newPassword = 0;
    if (!arrayWithoutOldValue.includes(newPassword)) {
      userPassword[id] = newPassword;
      shouldContinue = false;
    }
  }
  userPassword[id] = newPassword 
  $(elem).children('#tool').attr("src","devmode-assets/tools/arma"+ userPassword[id]+".svg");
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
  lockButtons();
  checkPassword(false);
  addGame();
  if (rightAnwsers != 4) {
    blink($("#monster"));
    monsterNumber--;
  } 
  if (monsterNumber == 0) {
    $('#testButton').unbind('click', test);
    $('#testButton').css({ opacity: 0.1});
  }
  updateMenuNumbers();
}

function atack() {
  lockButtons();
  addGame();
  checkPassword(true);
  if (rightAnwsers != 4) {
    lifeNumber--;
    blink($("#heart"));

    if (lifeNumber == 0) {
      lostGame();
   } else if (monsterNumber == 0) {
      resetTests();
    }
    updateMenuNumbers();
  } else {
    winGame();
  }
}

function lockButtons() {
  $('#testButton').unbind('click', test);
  $('#atackButton').unbind('click', atack);

  $('#testButton').css({ opacity: 0.1});
  $('#atackButton').css({ opacity: 0.1});
}

function deslockutton(){
  $('#testButton').bind('click', test);
  $('#atackButton').bind('click', atack);

  $('#testButton').css({ opacity: 1});
  $('#atackButton').css({ opacity: 1});
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
    $(".speach").text("SEU APP CRASHOU, -1 usuário utilizando seu app!");
    $(".speach").addClass('bubble-bottom-right').removeClass('bubble-bottom-left');
  } else {
    $(".speach").addClass('bubble-bottom-left').removeClass('bubble-bottom-right');
    var numberName = ["Zero","Um","Dois","Tres"]
    if (rightAnwsers != 4) {
      $(".speach").html("");
        for (i=0;i<4;i++) {
          $(".speach").append("Testando se espião.posicao"+numberName[i]+ " é igual a " +userPassword[i] + "<br>");
        }
      
      var rightAnwsersLabel = " teste passou!";
      var rightColorWrongPositionsLabel = " valor correto está na posição errada";
      if (rightAnwsers != 1) rightAnwsersLabel = " testes passaram";
      if (rightColorWrongPositions != 1) rightColorWrongPositionsLabel = " valores corretos estão nas posições erradas!";
      $(".speach").append("<b>Relatório: " + rightAnwsers + rightAnwsersLabel + "! Tirando isso, " + 
                        rightColorWrongPositions + rightColorWrongPositionsLabel + "</b>");
    } else {
      $(".speach").html("UAUUUU! <b>Você acertou todas!</b> Você já pode atacar!")
    }
  }
  
}

function updateMenuNumbers() {
  $(".monster-number").text(monsterNumber);
  $(".life-number").text(lifeNumber);
}

function resetTools() {
  for (var i = 1; i <= 4; i++) {
    $("#n" + i).children('#tool').attr("src","devmode-assets/tools/arma"+ userPassword[i - 1] +".svg");
  }
}

function winGame() {
  $("#modal-title").html("Parabéns!!!");
  $("#modal-subtitle").html("Todos seus testes passaram! Seu app está pronto pro deploy!");
  $('#modal-gameover').modal('show');
  resetGame();
}

function lostGame() {
  $("#modal-title").html("CRASHOU!");
  $("#modal-subtitle").html("Seu app crashou tanto que você perdeu todos seus usuários!! Tente novamente, você consegue!!");
  $('#modal-gameover').modal('show');
  resetGame();
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
  resetSpeach()
}

function resetSpeach() {
  $(".speach").html("Hmm.. melhor testar primeiro!");
  $(".speach").addClass('bubble-bottom-left').removeClass('bubble-bottom-right');
}

function resetTests() {
  monsterNumber = 5;
  $("#testButton").bind('click', test);
  $('.testButton').css({ opacity: 1});
}

function checkGameplay() {
    $('#modal-gameplay').modal('show');
}

function addGame() {
  $(".gameplay").append(`
          <div class="row">
               <span class="col-md-2 gameplay-slot"><img id="tool" src="devmode-assets/tools/arma`+ userPassword[0]+`.svg"></span>
               <span class="col-md-2 gameplay-slot"><img id="tool" src="devmode-assets/tools/arma`+userPassword[1]+`.svg"></span>
               <span class="col-md-2 gameplay-slot"><img id="tool" src="devmode-assets/tools/arma`+userPassword[2]+`.svg"></span>
               <span class="col-md-2 gameplay-slot"><img id="tool" src="devmode-assets/tools/arma`+userPassword[3]+`.svg"></span>
          </div>
    `);
}

$(document).ready(function() {
  resetGame();
  $(".slot").click(function(){
    changeTool(this);
  });

  $("#modal-tutorial").modal('show');

  $("#atackButton").click(atack);
  $("#jogadas").click(checkGameplay);
});