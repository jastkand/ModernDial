var fixFontColor = function(selector) {
  var color = localStorage["background_color"];
  if (!color) {
    return;
  }
  $('body').css("background", color);

  var buttonColor = Color("#fff");
  var backgroundColor = Color(color);
  
  var contrast = backgroundColor.contrast(buttonColor);
  if (contrast < 3) {
    $(selector).css("color", buttonColor.hexString());
  }
};

var log = function(string) {
	if (debug) {
		console.log("Log: " + string);
	}
};