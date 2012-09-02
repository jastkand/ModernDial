var bookmarkTitle = function(title, description, width, height, color, top, left){
  var title = {
    "t": title,
    "d": description,
    "w": width,
    "h": height,
    "c": color,
    "top": top,
    "left": left
  }
  return JSON.stringify(title);
}

var bookmarkUrl = function(url){
  var link = url;
  return (link.indexOf('://') == -1) ? 'http://' + link : link;
}