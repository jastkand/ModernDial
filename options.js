(function($){
  // Saves options to localStorage.
  function save_options() {
    var color = $('#picker').val();
    localStorage["background_color"] = color;
  }

  // Restores select box state to saved value from localStorage.
  function restore_options() {
    var color = localStorage["background_color"];
    if (!color) {
      return;
    }
    $('#picker').val(color);
  }

  $(function(){
    restore_options();
    $('#picker').miniColors();
    $('#save-options').click(function(e){
      save_options();
      e.preventDefault();
    })
  });
})(jQuery);