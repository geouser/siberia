// Global parameters
window.params = {
  widthFull: 750,
  maxRowHeight: 0,
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};

function Main() {

  // Modules initialization
  var maxRowHeight = new MaxHeight($('.cross-row'));


  // polyfills
  window.viewportUnitsBuggyfill.init();

  // add conditional classes
  if (params.isIOS) $('html').addClass('-ios');
  if (params.isMobile) $('html').addClass('-mobile');

}

$(function(){
  Main();
});

$(window).on('load', function(){
  setTimeout(function(){
    $(window).trigger('resize');
  }, 500);
});

// Áðàóçåð Internet Explorer?
$(function(){
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
      var v = parseFloat( RegExp.$1 );
      $('html').addClass("ie");
      $('html').addClass("ie"+v);
    }
  } else if (navigator.appName == 'Netscape') {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
      var v = parseFloat( RegExp.$1 );
      $('html').addClass("ie");
      $('html').addClass("ie"+v);
    }
  }
});



/*
#############################
#   Main JS for ____________   #
#############################
*/

jQuery(document).ready(function($) {

$('.responsive').slick({
  dots: false,
  autoplay: true,
  infinite: false,
  speed: 12000,
  arrows: false,
  pauseOnHover: true,
  autoplaySpeed: 1,
  slidesToShow: 12,
  slidesToScroll: 4,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6
      }
    }
  ]
});

$('.product').click(function(){
  $(this).children('.dowloadProduct').css('top', '0');
});
$('.dowloadProduct').mouseover(function(){
  $(this).css('top', '0%');
});
$('.dowloadProduct').mouseout(function(){
  $(this).css('top', '200%');
});

/*-----------------------------------------------------------------*/  
  $('.magnific').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',
    modal: false,

    closeBtnInside: true,
    preloader: false,
    
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  function done (data) {
    alert(data);
  }

  var maxSize = 5;
  Dropzone.autoDiscover = false;
  $("#dropzone").dropzone({
    url: "index.html",
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: maxSize, // MB
    maxFiles: 1,
    uploadMultiple: false,
    maxFiles: 1,
    accept: function(file, done) {
      done();
    },
    init: function() {
      this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
      });
      this.on("addedfile", function(file) {
      if (file.size > maxSize*1024000){
          alert('Файл слишком большой. Максимальный размер 5Mb.')
          this.removeAllFiles();
        }
      });


    }
  });


  
});




