(function ($) {
    "use strict";
    
    // Commons Variables
    var $window = $(window),
        $body = $('body');
    
    // Mobile Menu
    $('.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        $body.addClass('mobile-menu-open');
    });
    $('.mobile-menu-close, .offcanvas-menu-close').on('click', function(e) {
        e.preventDefault();
        $body.removeClass('mobile-menu-open');
    });
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( $this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) || ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active').children('ul').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
                $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
            } else {
                $this.parent('li').addClass('active').children('ul').slideDown().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-down').addClass('zmdi-chevron-up');
                $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
            }
        }
    });
    
    // Close When Click Outside Elements
    $body.on('click', function(e){
        var $target = e.target;
        
        // Mobile Menu Close
        if (!$($target).is('.offcanvas-mobile-menu, .mobile-menu-toggle') && !$($target).parents().is('.offcanvas-mobile-menu, .mobile-menu-toggle')) {
            $body.removeClass('mobile-menu-open');
        }
    });
    
    // Testimonial Slider
    $('.testimonial-slider').slick({
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        appendArrows: '.testimonial-arrows',
        prevArrow: '<button class="slick-prev"><i class="fa fa-long-arrow-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fa fa-long-arrow-right"></i></button>',
    });
    
    // Service Slider
    $('.service-slider').slick({
        arrows: false,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button class="slick-prev"><i class="fa fa-long-arrow-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fa fa-long-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    // Team Slider
    $('.team-slider').slick({
        arrows: false,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button class="slick-prev"><i class="fa fa-long-arrow-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fa fa-long-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    // Portfolio Details Image Slider
    $('.portolio-details-image-slider').slick({
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
    });
    
    // Portfolio Filter (Isotope)
    var $isotopeGrid = $('.isotope-grid'),
    $isotopeFilter = $('.isotope-filter');
    $isotopeGrid.imagesLoaded(function () {
        // filter items on button click
        $isotopeFilter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $(this).addClass('is-checked').siblings().removeClass('is-checked');
            $isotopeGrid.isotope({
                filter: filterValue,
            });
        });
        // init Isotope
        $isotopeGrid.isotope({
            itemSelector: '.isotope-item',
            masonry: {
                columnWidth: '.resizer',
            }
        });
    });
    
    // Sidebar Sticky
    $('.sidebar-sticky').stickySidebar({
        topSpacing: 60,
        bottomSpacing: 60
    });
    
    // Counter Up
    $('.counter').counterUp();
    
    // Popup
    $('.video-popup').magnificPopup({
		type: 'iframe',
	});
    
    // Skills Bar
    $('.skill').waypoint(function() {
        $('.skill').each(function() {
            var $this = $(this),
                $progressBar = $this.find('.progress-bar'),
                $value = $progressBar.data('value');
            $progressBar.animate({
                width: $value,
            }, 'fast');
        });
    }, { offset: '75%' });
    
    // Instagram Feed
    if($('.widget-instagram').length) {
        var feed = new Instafeed({
            get: 'user',
            userId: 6665768655,
            accessToken: '6665768655.1677ed0.313e6c96807c45d8900b4f680650dee5',
            target: 'widget-instagram',
            resolution: 'thumbnail',
            limit: 8,
            template: '<li><a href="{{link}}" target="_new"><img src="{{image}}" /></a></li>',
        });
        feed.run();
    }
    
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    
    // AjaxChimp (MailChimp)
    if($('#contact-map').length) {
        var myCenter=new google.maps.LatLng(-37.8201657,144.9587475);
        function initialize(){
            var mapProp = {
                center:myCenter,
                scrollwheel: false,
                zoom: 12,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("contact-map"),mapProp);
            var marker=new google.maps.Marker({
                position:myCenter,
                map: map,
            });
            marker.setMap(map);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }

    // Ajax Contact Form
    $(function() {
        // Get the form.
        var form = $('#contact-form');
        // Get the messages div.
        var formMessages = $('.form-messege');
        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
            // Serialize the form data.
            var formData = $(form).serialize();
            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                // Set the message text.
                $(formMessages).text(response);
                // Clear the form.
                $('#contact-form input:not([type="submit"]), #contact-form textarea').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
    });
    
})(jQuery);