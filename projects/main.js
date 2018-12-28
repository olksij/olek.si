$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

function activeNav() {
  var num = document.getElementById("mySidenav").style.width;
  if(num == "0px")
  {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("NavLogo").style.zIndex="0";
  }
  else
  {
    document.getElementById("NavLogo").style.zIndex="1";
    document.getElementById("mySidenav").style.width = "0";
  }
} 

function PageLoaded(){
  var nsw=document.getElementById("NoteScreenshot").style.offset.width;
  document.getElementById("NoteScreenshot").style.height=nsw*0.5 + "px";

  var pagetop=document.getElementById("note-page").style.top;

}

function PageResized(){
  var nsw=document.getElementById("NoteScreenshot").style.offset.width;
  document.getElementById("NoteScreenshot").style.height=nsw*0.5 + "px";
}

function Scrolled(){
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;

  if (scrolled<250){
    document.getElementById("body").style.backgroundColor='#ffffff';
  }
  else{
    document.getElementById("body").style.backgroundColor='#E0EBFC';
  }
}