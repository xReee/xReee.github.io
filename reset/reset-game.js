var count1c = 0;
var count2c = 0;
var count3c = 0;
var count4c = 0;
var count5c = 0;
var count6c = 0;
var cores = [
    "rgb(255, 0, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
     "rgb(128, 0, 128)",
      "rgb(0, 255, 0)",
       "rgb(255, 165, 0)",
        "rgb(255, 192, 203)",
         "rgb(128, 128, 128)"
        ];

var mudaCor = function(elem){
    switch ($(elem).attr("id")) {
      case "n1":
        $(elem).css("background-color", cores[count1c]);
        count1c ++;
        if (count1c >= 8) count1c = 0;
        break;
      case "n2":
          $(elem).css("background-color", cores[count2c]);
          count2c ++;
          if (count2c >= 8) count2c = 0;
          break;
      case "n3":
            $(elem).css("background-color", cores[count3c]);
            count3c ++;
            if (count3c >= 8) count3c = 0;
            break;
      case "n4":
            $(elem).css("background-color", cores[count4c]);
            count4c ++;
            if (count4c >= 8) count4c = 0;
            break;
    case "n5":
        $(elem).css("background-color", cores[count5c]);
        count5c ++;
        if (count5c >= 8) count5c = 0;
        break;
    case "n6":
        $(elem).css("background-color", cores[count6c]);
        count6c ++;
        if (count6c >= 8) count6c = 0;
        break;
    }
  }


$(document).ready(function() {
    $(".border-8px-hot-toddy").click(function(){
        mudaCor(this);
      });
});