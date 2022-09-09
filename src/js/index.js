import $ from 'jquery'
import "slick-carousel"

$(document).ready(function() {
    // console.log( "ready!");
    $('.slider-box').slick({
      slidesToShow: 1,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      arrow:false,
      vertical:true,
      asNavFor: '.card-head'
        // responsive: [
        //     {
        //       breakpoint: 992,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 1,
        //         arrows:false,
        //       }
        //     },
        //     {
        //       breakpoint: 768,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         arrows:false,
        //       }
        //     },
        //   ]
    });
    
    $('.card-head').slick({
      asNavFor: '.slider-box',
      slidesToShow: 7,
      slidesToScroll: 7,
      dots: true,
      adaptiveHeight:true,
      // centerMode: true,
      focusOnSelect: true,
      vertical:true,
    });


    $('.btn-responsive').click(function(){
      $(".head--navigation").toggleClass("active");
    });

    $('section,.closing-btn').click(function(){
      $(".head--navigation").removeClass("active");
    });

    $('.prowess').click(function(){
      $(".footer--container-wrapper,.img1-foot,.img2-foot").toggleClass("footoggle");
      
      // $(".img1-foot").hide();
      // $(".img2-foot").show();
      
    });

});