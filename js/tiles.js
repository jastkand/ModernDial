var tiles = function(content){
  if (bookmarksFolderId === null) {
    initiateFolder();
  }

  content.html('');

  chrome.bookmarks.getChildren(bookmarksFolderId, function(bookmarks){
    var tilesMap = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
    $.each(bookmarks, function(key, bookmark){
      var data = JSON.parse(bookmark.title);

      var left = data.left / (scale + tileSpace);
      var top = data.top / (scale  + tileSpace);
      for (var i = 0; i < data.w; i++){
        for (var j = 0; j < data.h; j++) {
          tilesMap[top + j][left + i] = 1;
          log("title: " + data.t + ";top: " + top + "; left: " + left + "; i: " + i + "; j: " + j);
        }
      }
      log(tilesMap);
      
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

tileImageAdvanced = function(group,x,y,width,height,bg,linkPage,img,imgSizeWidth,imgSizeHeight,optClass){
	drawHeight = (imgSizeWidth*scaleSpace-tileSpace)
	drawWidth = (imgSizeHeight*scaleSpace-tileSpace)
	tileContent += ("<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px ;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	<img src='"+img+"' width="+drawWidth+" height="+drawHeight+" \
	style='margin-left: "+((scaleSpace*width-tileSpace-drawWidth)*0.5)+"px; \
	margin-top: "+((scaleSpace*height-tileSpace-drawHeight)*0.5)+"px'/></a>");
}
tileTitleTextImage = function(group,x,y,width,height,bg,linkPage,title,text,img,imgSize,imgToTop,imgToLeft,optClass){ // Tile with an image on the left side, a title, and a description, width is always 2
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	<img style='float:left; margin-top:"+imgToTop+"px;margin-left:"+imgToLeft+"px;' src='"+img+"' height="+imgSize+" width="+imgSize+"/> \
	<div id='title' style='margin-left:"+(imgSize+5+imgToLeft)+"px;'>"+title+"</div>\
	<div id='desc' style='margin-left:"+(imgSize+6+imgToLeft)+"px;'>"+text+"</div>\
	</a>");
}
tileLive = function(group,x,y,width,height,bg,linkPage,title,img,imgSize,imgToTop,imgToLeft,speed,text1,text2,text3,text4,text5,optClass){
	id= "livetile"+(group+''+x+''+y).replace(/\./g,'_')
	if(img!=''){
		imgInsert = "<img style='float:left; margin-top:"+imgToTop+"px;margin-left:"+imgToLeft+"px;' src='"+img+"' height="+imgSize+" width="+imgSize+"/>"
	}else{
		imgInsert = '';
		imgSize = 0;
		imgToLeft = 0;
	}
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px; margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	"+imgInsert+"\
	<div id='title' style='margin-left:"+(imgSize+5+imgToLeft)+"px;'>"+title+"</div>\
	<div class='livetile' style='margin-left:"+(imgSize+10+imgToLeft)+"px;' id='"+id+"' >"+text1+"</div>\
	</a>");
	setTimeout(function(){newLiveTile(id,group,new Array(text1,text2,text3,text4,text5),speed,0)},1500); // init this tile
}
tileImageSlider = function(group,x,y,width,height,bg,linkPage,img,imgsize, text,slideDistance,optClass){
	tileContent += ("<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+" tileImageSlider' id='"+slideDistance+" ' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+"'>\
	<div class='tileSliderWrapper' style='position:absolute;'>\
	<div style='width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px;'>\
	<img src='"+img+"' height="+imgsize+" width="+imgsize+" style='margin-left: "+((width*scaleSpace-imgsize-tileSpace)*0.5)+"px; margin-top: "+((height*scaleSpace-imgsize-tileSpace)*0.5)+"px'/>\
	</div>\
	<div id='tileSliderText'>"+text+"</div>\
	</div>\
	</a>");
	$(document).on("mouseover",'.tileImageSlider',function(){
		$(this).find(".tileSliderWrapper").stop().animate({"margin-top":-$(this).height()*$(this).attr("id")},250,"linear");
	});
	$(document).on("mouseleave",'.tileImageSlider',function(){
		$(this).find(".tileSliderWrapper").stop().animate({'margin-top':0},300,"linear");
	});
}
tileSlideshow = function(group,x,y,width,height,bg,linkPage,title,speed,path1,path2,path3,path4,path5,optClass){
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*(scaleSpace)+"px; margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*(scaleSpace)-tileSpace)+"px; height:"+(height*(scaleSpace)-tileSpace)+"px; \
	background:"+bg+";'>\
	<div class='tileSlideshowTitle'>"+title+"</div>\
	<img class='tileSlideshowImageBack' id='slideshow_"+group+''+x+''+y+"_back' src='"+path1+"'>\
	<img class='tileSlideshowImage' id='slideshow_"+group+''+x+''+y+"' src='"+path1+"' >\
	</a>");
	var images = [path1, path2, path3, path4, path5];
	setTimeout(function(){
		$.each(images, function (i, val) {$('<img/>').attr('src', val)})//start prechaching images;
		newSlideshow(("slideshow_"+group+''+x+''+y),group,images,speed,0)
	},2000); // init this tile	
}
tileCustom = function(group,x,y,width,height,bg,linkPage,content,optClass){ // make your own tiles
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	"+content+"\
	</a>");
}