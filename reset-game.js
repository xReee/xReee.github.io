var password = [];
var userPassword = [0, 1, 2, 3];
var answer = [];
var lifeNumber = 3;
var monsterNumber = 5;
var rightAnwsers = 0;
var rightColorWrongPositions = 0;
var devMode = true;

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
  lockButtons();
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
  addGame();
  lockButtons();
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
  $('#testButton').prop("disabled",true);

  $('#testButton').css({ opacity: 0.1});
  $(".shouldSelectTool").css({ opacity: 1});
}

function deslockutton(){
  if (monsterNumber != 0) {
    $('#testButton').prop("disabled",false);
    $('#testButton').css({ opacity: 1});
    $(".shouldSelectTool").css({ opacity: 0});
  }
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
  this.rightAnwsers = rightAnwsers;
  this.rightColorWrongPositions = rightColorWrongPositions;
  speak(rightAnwsers, rightColorWrongPositions, isAtack);
}

function speak(rightAnwsers, rightColorWrongPositions, isAtack) {
  if (isAtack == true) {
    $(".speach").text("Hehe! You missed, lost 1 lifepoint! Now you have left " + (lifeNumber - 1) + " lifepoints!");
    $(".speach").addClass('bubble-bottom-right').removeClass('bubble-bottom-left');
  } else {
    $(".speach").addClass('bubble-bottom-left').removeClass('bubble-bottom-right');
    if (rightAnwsers != 4) {
      var rightAnwsersLabel = " tool in correct position";
      var rightColorWrongPositionsLabel = " right tool in wrong postion";
      if (rightAnwsers != 1) rightAnwsersLabel = " tools in correct positions";
      if (rightColorWrongPositions != 1) rightColorWrongPositionsLabel = " right tools in wrong position!";
      $(".speach").html("<b>Testing results</b>: you got right " + rightAnwsers + rightAnwsersLabel + "! Besides that, " + 
                        rightColorWrongPositions + rightColorWrongPositionsLabel);
    } else {
      $(".speach").html("WOOOW! <b>you got right everything!</b> Now you're ready to attack!")
    }
  }
  
}

function updateMenuNumbers() {
  $(".monster-number").text(monsterNumber);
  $(".life-number").text(lifeNumber);
}

function resetTools() {
  for (var i = 1; i <= 4; i++) {
    $("#n" + i).children('#tool').attr("src","reset-assets/tools/arma"+ userPassword[i - 1] +".svg");
  }
}

function winGame() {
  $("#modal-title").html("Congratz!!!");
  $("#modal-subtitle").html("You got everything right and defeat the monster!!!");
  $('#modal-gameover').modal('show');
  resetGame();
}

function lostGame() {
  $("#modal-title").html("You lost!!");
  $("#modal-subtitle").html("Try again, you can do it!!");
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
  $(".gameplay").html("");
  $(".shouldSelectTool").css({ opacity: 0});
}

function resetSpeach() {
  $(".speach").html("Hmm.. I think is better test first!");
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
          <div class="row results">
                <div class="div-transparent"></div>
                <h4>Right: `+ rightAnwsers +` • Right in wrong position: `+ rightColorWrongPositions +` • Jogada:</h4>
                <span class="col-md-2 gameplay-slot"><img id="tool" src="reset-assets/tools/arma`+ userPassword[0]+`.svg"></span>
                <span class="col-md-2 gameplay-slot"><img id="tool" src="reset-assets/tools/arma`+userPassword[1]+`.svg"></span>
                <span class="col-md-2 gameplay-slot"><img id="tool" src="reset-assets/tools/arma`+userPassword[2]+`.svg"></span>
                <span class="col-md-2 gameplay-slot"><img id="tool" src="reset-assets/tools/arma`+userPassword[3]+`.svg"></span>
          </div>
    `);
}

$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  console.log(keycode);
  if(keycode == '97') {
    $("#modal-tutorial").modal('show');
  }
});

$(document).ready(function() {
  resetGame();
  $(".devLabel").css({ opacity: 0});
  $("#modal-tutorial").modal('show');

  $(".slot").click(function(){
    changeTool(this);
  });

  $(".btn-devMode").click(function() {
    if (devMode) {
      $(".btn-devMode").val('Disable developer mode')
      $("#target").attr("src","devmode/devmode-assets/npc/target.svg")
      $("#goblin").attr("src","devmode/devmode-assets/npc/goblin.svg")
      $(".devLabel").css({ opacity: 1});
    } else {
      $(".btn-devMode").val('Enable developer mode')
      $(".devLabel").css({ opacity: 0});
      $("#target").attr("src","reset-assets/npc/target.svg")
      $("#goblin").attr("src","reset-assets/npc/goblin.svg")
    }
    devMode = !devMode;
  });

  $("#atackButton").click(atack);
  $("#jogadas").click(checkGameplay);
});
