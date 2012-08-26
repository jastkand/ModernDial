(function($) { 
  /*Show the homepage with tiles */
  showHome = function(){
    $("html").css("overflow-x","auto");
    $content = $("#content");
    $content.css('margin-left',0).css("margin-top",30).width($("#wrapper").width()).html("<img src='images/loader.gif' height='24' width='24'/>").fadeIn(1000);
    
    // Temporary it will be done this way. Ahhhhh....
    var newContent = '<a href="#" data-empty="true" class="tile group0 greenTile" style="margin-top: 0px; margin-left: 0px; width: 280px; height: 135px; display: inline; "> \
        <div class="title"></div>   \
        <div class="desc">Add item</div>\
      </a>\
      <a href="http://plus.google.com" class="tile group0 blueTile" style="margin-top: 145px; width: 280px; height: 135px; display: inline; ">\
        <div class="title">Google+</div>  \
        <div class="desc">Lorem ipsum dolar sit</div> \
      </a>\
      <a href="#" class="tile group0 redTile" style="margin-top: 290px; width: 280px; height: 135px; display: inline; ">\
        <div class="title" style="margin-left:60px;"></div>   \
        <div class="desc">Add item</div>\
      </a>\
      <a href="#" class="tile group0 orangeTile" style="margin-top: 0px; margin-left: 290px; width: 135px; height: 135px; display: inline; "> \
        <div class="title"></div>   \
        <div class="desc">Add item</div>\
      </a>\
      <a href="#" class="tile group0 darkBlueTile" style="margin-top: 145px; margin-left: 290px; width: 135px; height: 135px; display: inline; ">    \
        <div class="title"></div>   \
        <div class="desc">Add item</div>   \
      </a>\
      <a href="#" class="tile group0 lightBlueTile" style="margin-top: 290px; margin-left: 290px; width: 290px; height: 135px; display: inline; "> \
        <div class="title"></div>\
        <div class="desc">Add item</div>   \
      </a>\
      <a href="#" class="tile group0 lightBlueTile" style="margin-top: 0px; margin-left: 1690px; width: 135px; height: 135px; display: inline; ">\
        <div class="title"></div>   \
        <div class="desc">Add item</div>\
      </a>\
      <a href="#" class="tile group0 orangeTile" style="margin-top: 0px; margin-left: 435px; width: 290px; height: 280px; display: inline; "> \
        <div class="title"></div>   \
        <div class="desc">Add item</div>\
      </a>\
      <a href="#" class="tile group0 darkBlueTile" style="margin-top: 290px; margin-left: 590px; width: 135px; height: 135px; display: inline; ">    \
        <div class="title"></div>   \
        <div class="desc">Add item</div>   \
      </a>';
    $content.stop().fadeOut(500,function(){
      $content.html(newContent);
      $content.show(100, function(){
        $('.tile[data-empty="true"]').click(function(e){
          showForm();
          e.preventDefault(); 
        });
      });
    });
  };

  initiateFolder = function(){
    if (!!bookmarksFolderId) {
      chrome.bookmarks.getTree(function(bookmarks){
        listBookmarks(bookmarks);
      });
    }

    function listBookmarks(bookmarks) {
      bookmarks.forEach(function(bookmark) {
        if (bookmark.title === "ModernDial Bookmarks") {
          bookmarksFolderId = bookmark.id;
        };
        if (bookmark.children) listBookmarks(bookmark.children);
      });
    };

    if (!!bookmarksFolderId) {
      chrome.bookmarks.create({
        'parentId': '1',
        'title': 'ModernDial Bookmarks'
      }, function(bookmarkFolder) {
        bookmarksFolderId = bookmarkFolder.id;
        return bookmarksFolderId;
      });
    };
  };

  showForm = function(){
    $("html").css("overflow-x","auto");
    $content = $("#content");
    $content.css('margin-left',0).css("margin-top",30).width($("#wrapper").width()).html("<img src='images/loader.gif' height='24' width='24'/>").fadeIn(1000);
    
    $.get('form.html', function(newContent, textStatus){
      if(textStatus == 'error'){ // if error
        $content.html("<h2 style='margin-top:0px;'>We're sorry :(</h2>the page you're looking for is not found."); // show with nice animation :)
      }
      $content.stop().fadeOut(500,function(){
        $content.html(newContent);
        $content.show(100, function(){
          $('#navSave').click(function(e) {
            showHome();
            
            initiateFolder();

console.log(bookmarksFolderId);

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
    showHome();
  });
})(jQuery);