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
  speed: 3000,
  arrows: true,
  pauseOnHover: true,
  autoplaySpeed: 5000,
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
        slidesToShow: 4,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
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

$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
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
  var uploadedFile;
  Dropzone.autoDiscover = false;

  $("#dropzone").dropzone({
    url: "forms.php",
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: maxSize, // MB
    maxFiles: 1,
    uploadMultiple: false,
    maxFiles: 1,
    autoProcessQueue: false,
    accept: function(file, done) {
      done();
      uploadedFile = file;
    },
    init: function() {
      var myDropzone = this;

      this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
            uploadedFile = file;
      });
      this.on("addedfile", function(file) {
      if (file.size > maxSize*1024000){
          alert('Файл слишком большой. Максимальный размер 5Mb.')
          this.removeAllFiles();
        }
      });

      $(".submit").on('click', function(e) {
           e.preventDefault();
           e.stopPropagation();
           myDropzone.processQueue();
        });

      myDropzone.on("sending", function(file, xhr, formData) {
        // Will send the filesize along with the file as POST data.
        formData.append('name', $('input[name="name"]').val());
        formData.append('tel', $('input[name="tel"]').val());
        formData.append('email', $('input[name="email"]').val());
        formData.append('msg', $('textarea[name="msg"]').val());
      });

      myDropzone.on("complete", function(file, responseText) {
        $.magnificPopup.close();
        this.removeAllFiles();
        $('form').each(function(index, el) {
          $(this)[0].reset();
        });

       });

    } // init end
  }); // dropzone end


  /*$('form').on('submit', function(event) {
    event.preventDefault();


    var data = $(this).serialize();
    console.log(data);
    console.log(uploadedFile);
  });*/


  
});




