// workaround to preventing mozilla firefox from scrolling
// up and down with the up and down arrow keys
$(window).scroll(function () { 
  window.scrollTo(0,0);
});