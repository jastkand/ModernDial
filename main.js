(function($) { 
  /*Show the homepage with tiles */
  showHome = function(){
    $("html").css("overflow-x","auto");
    $content = $("#content");
    $content.css('margin-left',0).css("margin-top",30).width($("#wrapper").width()).html("<img src='images/loader.gif' height='24' width='24'/>").fadeIn(1000);
    
    $content.stop().fadeOut(500,function(){
      $content = tiles($content);
      $content.show(100, function(){});
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

  showForm = function(){
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
            // should validate data
            // url is auto validating, should perform function checking is bookmark created
            var bookmarkTitle = function(){
              var title = {
                "t": $('#site_title').val(), //.replace(/\|/g, "-"),
                "d": $('#site_description').val(), //.replace(/\|/g, "-"),
                "w": $('select#tile_width option:selected').val(),
                "h": $('select#tile_height option:selected').val(),
                "c": $('select#tile_color option:selected').val()
              }
              return JSON.stringify(title);
            }

            if (bookmarksFolderId == null){
              initiateFolder();
            }

            chrome.bookmarks.create({
              'parentId': bookmarksFolderId,
              'title': bookmarkTitle(),
              'url': $('#site_url').val()
            }, function(e){});

            showHome();
            e.preventDefault();
          });
          $('#navCancel').click(function(e) {
            showHome();
            e.preventDefault(); 
          });
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

    $('#customize').click(function(e){
      $('.tile').draggable({
        opacity: 0.7, 
        grid: [scale + tileSpace, scale + tileSpace],
        start: function(event, ui) {
          $(this).addClass('noclick');
        },
        stop: function(event, ui) {
          setTimeout(function(){$(this).removeClass('noclick');}, 500);
        }
      });
      e.preventDefault();
    });

  });
})(jQuery);