var tiles = function(content){
  if (bookmarksFolderId === null) {
    initiateFolder();
  }

  content.html('');

  chrome.bookmarks.getChildren(bookmarksFolderId, function(bookmarks){
    $.each(bookmarks, function(key, bookmark){
      var data = JSON.parse(bookmark.title);
      
      content.append(tile({
        'id': bookmark.id, 
        'left': data.left, 
        'top': data.top,
        'width': data.w, 
        'height': data.h, 
        'color': data.c, 
        'url': bookmark.url,
        'icon': data.icon,
        'title': data.t,
        'desc': data.d}));
    });
  }); 

  return content;
};

/*Tile Templates */
var tile = function(params){
  var optClass = function(){
    switch(params.color){
      case '0': return 'orangeTile';
      case '1': return 'blueTile';
      case '2': return 'greenTile';
      case '3': return 'redTile';
      case '4': return 'darkBlueTile';
      case '5': return 'lightBlueTile';
      case '6': return 'yellowTile';
    }
  };
  var tileContent = $("<a />");
  tileContent.attr({
    "href": params.url, 
    "data-id": params.id, 
    "data-color": params.color, 
    "data-width": params.width, 
    "data-height": params.height,
    "data-top": params.top,
    "data-left": params.left}).addClass("tile");
  
  tileContent.addClass(optClass());

  tileContent.css({
    'top': params.top + "px",
    'left': params.left + "px",
    'width': ((scale + tileSpace) * params.width - tileSpace) + "px",
    'height': ((scale + tileSpace) * params.height - tileSpace) + "px",
    'display': 'inline'
	});
  if (!!params.icon) {
    tileContent.append(tileImage(params.icon, params.width, params.height));
  }
  else{
    tileContent.append(tileTitleText(params.title, params.desc));
  }
  
  tileContent.append("<button class='tileEdit'><img src='../images/edit.png' width='16' /></button>");
  return tileContent;
};

/* Tile with only a title and description */
var tileTitleText = function(title, text) {
  return "<div class='title'>" + title + "</div><div class='desc'>" + text + "</div>";
};

/* Tile with only an image */
var tileImage = function(image, width, height){ 
	return "<img src='" + image + "' height='" + ((scale + tileSpace) * height - tileSpace) + "' />";
}