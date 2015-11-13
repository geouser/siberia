

/*
#############################
#   Main JS for ____________   #
#############################
*/
(function($){ // slider clients list
    $(window).load(function(){
        $("#my-thumbs-list").mThumbnailScroller({
          axis:"x",
          type:"hover-precise"
        });
    });
})(jQuery);


jQuery(document).ready(function($) {

$('.clients-slider ul img').addClass('grayscale');

$(function() {
  $(".offer-slider").slick({
    autoplay: true,
    fade: true
  });
});

$(function() { // banner on hover
  $('.product-info').mouseover(function(){
    $(this).parent().children('.dowloadProduct').css('top', '0');
  });
  $('.dowloadProduct').mouseover(function(){
    $(this).css('top', '0%');
  });
  $('.dowloadProduct').mouseout(function(){
    $(this).css('top', '200%');
  });
});


$(function() { // scroll to anchor
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
$(function() { 
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

$(function() {  // drag and drop 
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
        $('.open-callback').click();
        console.log(responseText);
        this.removeAllFiles();
        $('form').each(function(index, el) {
          $(this)[0].reset();
        });

       });

    } // init end
  }); // dropzone end
});


  function googleMap_initialize() {

      var mapCenterCoord = new google.maps.LatLng(56.011893, 92.873528);
      var mapMarkerCoord = new google.maps.LatLng(56.011893, 92.873528);

      var mapOptions = {
        center: mapCenterCoord,
        zoom: 17,
        //draggable: false,
        disableDefaultUI: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var markerImage = new google.maps.MarkerImage('images/blue-marker.svg');
      var marker = new google.maps.Marker({
        icon: markerImage,
        position: mapMarkerCoord, 
        map: map,
        title:"Siberian Wild Apps"
      });
      $(window).resize(function (){
        map.setCenter(mapCenterCoord);
      });
  };
  googleMap_initialize();


  
});




