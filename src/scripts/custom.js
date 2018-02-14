;(function () {

	var mobileMenuOutsideClick = function() {

    $(document).click(function (e) {
      var container = $("#site-offcanvas, .js-site-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.js-site-nav-toggle').addClass('site-nav-white');

        if ( $('body').hasClass('offcanvas') ) {

          $('body').removeClass('offcanvas');
          $('.js-site-nav-toggle').removeClass('active');
        
        }   
      }
    });

  };

  var offcanvasMenu = function() {

    $('#page').prepend('<div id="site-offcanvas" />');
    $('#page').prepend('<a href="#" class="js-site-nav-toggle site-nav-toggle site-nav-white"><i></i></a>');
    var clone1 = $('.menu').clone();
    $('#site-offcanvas').append(clone1);

    $('#site-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
    $('#site-offcanvas')
      .find('li')
      .removeClass('has-dropdown');  

    // Hover dropdown menu on mobile
    $('.offcanvas-has-dropdown').mouseenter(function(){
      var $this = $(this);

      $this
        .addClass('active')
        .find('ul')
        .slideDown(500, 'easeOutExpo');       
      }).mouseleave(function(){

      var $this = $(this);
      $this
        .removeClass('active')
        .find('ul')
        .slideUp(500, 'easeOutExpo');       
      });

    $(window).resize(function(){

      if ( $('body').hasClass('offcanvas') ) {

        $('body').removeClass('offcanvas');
        $('.js-site-nav-toggle').removeClass('active');
        
      }
    });
  };


  var burgerMenu = function() {
    
    $('body').on('click', '.js-site-nav-toggle', function(event){
      var $this = $(this);

      if ( $('body').hasClass('overflow offcanvas') ) {
        $('body').removeClass('overflow offcanvas');
      } else {
        $('body').addClass('overflow offcanvas');
      }
      $this.toggleClass('active');
      event.preventDefault();

    });

  };

  $(window).load(function(){

  	mobileMenuOutsideClick();
    offcanvasMenu();
    burgerMenu();

    $('#status').fadeOut(); 
    $('#preloader').delay(350).fadeOut('slow'); 
    $('body').delay(350).css({'overflow':'visible'});

  });
  
}());