var bookmarkTitle = function(){
  var title = {
    "t": $('#site_title').val(),
    "d": $('#site_description').val(),
    "w": $('select#tile_width option:selected').val(),
    "h": $('select#tile_height option:selected').val(),
    "c": $('select#tile_color option:selected').val()
  }
  return JSON.stringify(title);
}

var bookmarkUrl = function(){
  var url = $('#site_url').val();
  return (url.indexOf('://') == -1) ? 'http://' + url : url;
}