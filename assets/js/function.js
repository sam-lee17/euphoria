'use strict';
function liadrin_video() {
    $('.liadrin-video a').simpleLightboxVideo();
}
/*mobile_menu*/
function liadrin_clone_main_menu() {
    var _clone_menu = $('#header .clone-main-menu');
    var _target = $('#box-mobile-menu .clone-main-menu');
    var _data_width = $('#header .main-navigation').data('width');
    if ($(window).innerWidth() <= _data_width) {
        if (_clone_menu.length > 0) {
            _clone_menu.each(function () {
                $(this).appendTo('#box-mobile-menu .box-inner');
            });
        }
    } else {
        if (_target.length > 0) {
            _target.each(function () {
                $(this).appendTo('#header .main-navigation');
            });
        }
    }
    function action_addClass() {
        $('body').addClass('box-mobile-menu-open');
        return false;
    }
    function action_removeClass() {
        $('body').removeClass('box-mobile-menu-open');
        return false;
    }
    $(".mobile-navigation").on('click', action_addClass);
    $("#box-mobile-menu .close-menu, .body-overlay, #box-mobile-menu .menu-item .highlighted-word__link").on('click', action_removeClass);
}
function box_mobile_menu() {
    var _content = $('#box-mobile-menu .clone-main-menu');
    if ($(window).innerWidth() <= 1024) {
        _content.each(function () {
            var t = $(this);
            t.addClass('active');
            $(this).find('.toggle-submenu').on('click', function () {
                t.removeClass('active');
                var text_next = $(this).prev().text();
                $('#box-mobile-menu .box-title').html(text_next);
                t.find('li').removeClass('mobile-active');
                $(this).parent().addClass('mobile-active');
                $(this).parent().closest('.submenu').css({
                    'position': 'static',
                    'height': '0',
                });
                $('#box-mobile-menu #back-menu').css('display', 'block');
            })
        });
        $('#box-mobile-menu #back-menu').on('click', function () {
            _content.find('li.mobile-active').each(function () {
                _content.find('li').removeClass('mobile-active');
                if ($(this).parent().hasClass('main-menu')) {
                    _content.addClass('active');
                    $('#box-mobile-menu .box-title').html('MAIN MENU');
                    $('#box-mobile-menu #back-menu').css('display', 'none');
                } else {
                    _content.removeClass('active');
                    $(this).parent().parent().addClass('mobile-active');
                    $(this).parent().css({
                        'position': 'absolute',
                        'height': 'auto',
                    });
                    var text_prev = $(this).parent().parent().children('a').text();
                    $('#box-mobile-menu .box-title').html(text_prev);
                }
            })
        });
    }
    $('.mobile-navigation').on('click', function () {
        $('body').addClass('box-mobile-menu-open');
    });
    $('#box-mobile-menu .close-menu, .body-overlay').on('click', function () {
        $('body').removeClass('box-mobile-menu-open');
    });
}
function liadrin_get_scrollbar_width() {
    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
        $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
        inner = $inner[0],
        outer = $outer[0];
    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();
    return (width1 - width2);
}
/* ---------------------------------------------
 Resize mega menu
 --------------------------------------------- */
function liadrin_resizeMegamenu() {
    var window_size = jQuery('body').innerWidth();
    window_size += liadrin_get_scrollbar_width();
    if (window_size > 991) {
        if ($('#header .main-menu-wrapper').length > 0) {
            var container = $('#header .main-menu-wrapper');
            if (container != 'undefined') {
                var container_width = 0;
                container_width = container.innerWidth();
                var container_offset = container.offset();
                setTimeout(function () {
                    $('.main-menu .item-megamenu').each(function (index, element) {
                        $(element).children('.megamenu').css({'max-width': container_width + 'px'});
                        var sub_menu_width = $(element).children('.megamenu').outerWidth();
                        var item_width = $(element).outerWidth();
                        $(element).children('.megamenu').css({'left': '-' + (sub_menu_width / 2 - item_width / 2) + 'px'});
                        var container_left = container_offset.left;
                        var container_right = (container_left + container_width);
                        var item_left = $(element).offset().left;
                        var overflow_left = (sub_menu_width / 2 > (item_left - container_left));
                        var overflow_right = ((sub_menu_width / 2 + item_left) > container_right);
                        if (overflow_left) {
                            var left = (item_left - container_left);
                            $(element).children('.megamenu').css({'left': -left + 'px'});
                        }
                        if (overflow_right && !overflow_left) {
                            var left = (item_left - container_left);
                            left = left - ( container_width - sub_menu_width );
                            $(element).children('.megamenu').css({'left': -left + 'px'});
                        }
                    })
                }, 100);
            }
        }
    }
}
new WOW().init();

function creat_init_owl_carousel() {

    $('.slide-owl-carousel').each(function () {
        var $this = $(this),
            $loop = $this.attr('data-loop') == 'yes',
            $numberItem = parseInt($this.attr('data-number'), 10),
            $Nav = $this.attr('data-navControl') == 'yes',
            $Dots = $this.attr('data-Dots') == 'yes',
            $autoplay = $this.attr('data-autoPlay') == 'yes',
            $autoplayTimeout = parseInt($this.attr('data-autoPlayTimeout'), 10),
            $marginItem = parseInt($this.attr('data-margin'), 10),
            $rtl = $this.attr('data-rtl') == 'yes',
            $resNumber; // Responsive Settings
        $numberItem = (isNaN($numberItem)) ? 1 : $numberItem;
        $autoplayTimeout = (isNaN($autoplayTimeout)) ? 4000 : $autoplayTimeout;
        $marginItem = (isNaN($marginItem)) ? 0 : $marginItem;
        switch ($numberItem) {
            case 1 :
                $resNumber = {
                    0: {
                        items: 1
                    }
                };
                break;
            case 2 :
                $resNumber = {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: $numberItem
                    }
                };
                break;
            case 3 :
            case 4 :
                $resNumber = {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: $numberItem
                    }
                };
                break;
            default : // $numberItem > 4
                $resNumber = {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: $numberItem
                    }
                };
                break;
        } // Endswitch

        $(this).owlCarousel({
            loop: $loop,
            nav: $Nav,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            dots: $Dots,
            autoplay: $autoplay,
            autoplayTimeout: $autoplayTimeout,
            margin: $marginItem,
            //responsiveClass:true,
            rtl: $rtl,
            responsive: $resNumber,
            autoplayHoverPause: true,
            //center: true,
            onRefreshed: function () {
                var total_active = $this.find('.owl-item.active').length;
                var i = 0;
                $this.find('.owl-item').removeClass('active-first active-last');
                $this.find('.owl-item.active').each(function () {
                    i++;
                    if (i == 1) {
                        $(this).addClass('active-first');
                    }
                    if (i == total_active) {
                        $(this).addClass('active-last');
                    }
                });
            },
            onTranslated: function () {
                var total_active = $this.find('.owl-item.active').length;
                var i = 0;
                $this.find('.owl-item').removeClass('active-first active-last');
                $this.find('.owl-item.active').each(function () {
                    i++;
                    if (i == 1) {
                        $(this).addClass('active-first');
                    }
                    if (i == total_active) {
                        $(this).addClass('active-last');
                    }
                });
            },
            onResized: function () {
            }
        });
    });
}

creat_init_owl_carousel();

// smooths croll
function smooth_scroll() {
    $(function () {
        // This will select everything with the class smoothScroll
        // This should prevent problems with carousel, scrollspy, etc...
        $('a[href*="#"]:not([href="#"]):not([href*="#mm-"]):not([href="#primary-navigation"])').not('a[data-toggle="tab"]').on('click', function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').stop().animate({
                        scrollTop: target.offset().top
                    }, 1000); // The number here represents the speed of the scroll in milliseconds
                    return false;
                }
            }
        });
    });
}

// Change the speed to whatever you want
// Personally i think 1000 is too much
// Try 800 or below, it seems not too much but it will make a difference

$(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.main-header.header-fixed').addClass('menu-bg');
    } else {
        $('.main-header.header-fixed').removeClass('menu-bg')
    }
});
$(document).on("scroll", function () {
    200 < $(window).scrollTop() ? $(".backtotop").addClass("active") : $(".backtotop").removeClass("active")
});
$(window).on("resize", function () {
    liadrin_clone_main_menu();
    liadrin_resizeMegamenu();
});
$(document).on("ready", function () {
    $('.highlighted-word__link').mouseover(function(){
        $(this).find('.path').css({'-webkit-animation':'in 0.4s linear forwards','animation':'in 0.4s linear forwards'});
    });
    $('.highlighted-word__link').mouseout(function(){
        $(this).find('.path').css({'-webkit-animation':'out 0.4s linear','animation':'out 0.4s linear'});
    });
    liadrin_clone_main_menu();
    liadrin_resizeMegamenu();
    box_mobile_menu();


});
$(window).on("load", function () {
    smooth_scroll();
    liadrin_clone_main_menu();
    box_mobile_menu();
});
liadrin_video();
$('.counter').counterUp({
    delay: 10,
    time: 1000
});

