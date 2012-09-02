(function($) { 
  /*Show the homepage with tiles */
  showHome = function(callback){
    $("html").css("overflow-x","auto");
    $content = $("#content");
    $content.css('margin-left',0).css("margin-top",30).width($("#wrapper").width()).html("<img src='images/loader.gif' height='24' width='24'/>").fadeIn(1000);
    
    $content.stop().fadeOut(500,function(){
      $content = tiles($content);
      $content.show(100, function(){
        $('.tile').draggable({
          opacity: 0.7, 
          grid: [scale + tileSpace, scale + tileSpace],
          start: function(event, ui) {
            $(this).addClass('noclick');
          },
          stop: function(event, ui) {
            $(this).data('id').toString();
            $(this).top();
            $(this).left();

            setTimeout(function(){$(this).removeClass('noclick');}, 500);
          }
        });
        $('.tileEdit').click(function(e){
          var element = $(this).parent();
          showForm(function(){
            modifiedBookmarkId = element.data("id").toString();

            $('#site_url').val(element.attr("href"));
            $('#site_title').val(element.find('.title').html());
            $('#site_description').val(element.find('.desc').html());
            $('#tile_color').val(element.data("color"));
            $('#tile_width').val(element.data("width"));
            $('#tile_height').val(element.data("height"));
          });
          e.preventDefault();
        });
        if (typeof callback == "function" && callback()) {
          callback();
        }
      });
    });
  };

  initiateFolder = function(){
    function listBookmarks(bookmarks) {
      bookmarks.forEach(function(bookmark) {
        if (bookmark.title === "ModernDial Bookmarks") {
          bookmarksFolderId = bookmark.id;
        };
        if (bookmark.children) listBookmarks(bookmark.children);
      });
    };

    if (bookmarksFolderId == null) {
      chrome.bookmarks.getTree(function(bookmarks){
        listBookmarks(bookmarks);
 
        if (bookmarksFolderId == null) {
          chrome.bookmarks.create({
            'parentId': '1',
            'title': 'ModernDial Bookmarks'
          }, function(bookmarkFolder) {
            bookmarksFolderId = bookmarkFolder.id;
          });
        }
      });
    }

    return bookmarksFolderId;
  };

  showForm = function(callback){
    $("html").css("overflow-x","auto");
    $content = $("#content");
    $content.css('margin-left',0).css("margin-top",30).width($("#wrapper").width()).html("<img src='images/loader.gif' height='24' width='24'/>").fadeIn(1000);
    
    $.get(chrome.extension.getURL('form.html'), function(newContent, textStatus){
      if(textStatus == 'error'){ // if error
        $content.html("<h2 style='margin-top:0px;'>We're sorry :(</h2>the page you're looking for is not found."); // show with nice animation :)
      }
      $content.stop().fadeOut(500,function(){
        $content.html(newContent);
        $content.show(100, function(){
          $('#navSave').click(function(e) {
            if (modifiedBookmarkId == null){
              // Create new bookmark
              if (bookmarksFolderId == null){
                initiateFolder();
              }

              chrome.bookmarks.create({
                'parentId': bookmarksFolderId,
                'title': bookmarkTitle(
                  $('#site_title').val(),
                  $('#site_description').val(),
                  $('select#tile_width option:selected').val(),
                  $('select#tile_height option:selected').val(),
                  $('select#tile_color option:selected').val(),
                  0, 0),
                'url': bookmarkUrl()
              }, function(e){
                console.log(JSON.stringify(e));
              });  
            }
            else {
              // Update existing bookmark
              chrome.bookmarks.update(modifiedBookmarkId, {
                'url': bookmarkUrl(),
                'title': bookmarkTitle(
                  $('#site_title').val(),
                  $('#site_description').val(),
                  $('select#tile_width option:selected').val(),
                  $('select#tile_height option:selected').val(),
                  $('select#tile_color option:selected').val(),
                  0, 0)
              }, function(e){
                modifiedBookmarkId = null;
              });
            }

            showHome();
            e.preventDefault();
          });
          $('#navCancel').click(function(e) {
            showHome();
            e.preventDefault(); 
          });
          if (typeof callback == "function" && callback()) {
            callback();
          }
        });
      });
    });

    $(window).resize(); // check the scrollbars now
    $(document).unbind("keydown").unbind("keyup"); // let the keyboard work normal
    $("#catchScroll").unbind("mousedown"); // we may scroll with the mouse here
  };

  $(function() {
    initiateFolder();
    showHome();

    $('#addTile').click(function(e){
      showForm();
      e.preventDefault();
    });

    // $('#customize').click(function(e){
    //   e.preventDefault();
    // });

  });
})(jQuery);