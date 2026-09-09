var skr = null;
$(document).ready(function () {
    skrollr_int();

    // Reinitialize skrollr on window resize
    $(window).on('resize', function () {
        skrollr_int();
    });
    

    // Lấy phần tử header
    const header = document.querySelector('.header-scroll');

    // Biến để theo dõi vị trí cuộn
    let lastScrollTop = 0;

    // Lắng nghe sự kiện cuộn trang
    window.addEventListener('scroll', function() {
    // Lấy vị trí cuộn hiện tại
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 300) {
        // Nếu cuộn xuống hoặc cuộn lên và vị trí cuộn > 300px
        if (currentScroll > lastScrollTop) {
        // Cuộn xuống -> loại bỏ class active
        header.classList.remove('active');
        } else {
        // Cuộn lên và vị trí cuộn > 300px -> thêm class active
        header.classList.add('active');
        }
    } else {
        // Nếu cuộn lên hoặc cuộn xuống và vị trí cuộn < 300px -> loại bỏ class active
        header.classList.remove('active');
    }

    // Cập nhật vị trí cuộn để so sánh lần tiếp theo
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Ngăn không cho lastScrollTop âm
    });

    var interleaveOffset = 0.5;
    var $progressBar = document.querySelector('.swiper-scrollbar1');
    var tlprogressBar = new TimelineMax({
        //yoyo:true,
        //repeat:-1
    });
    var sliderTime = 5;
    var sliderInit = false;
    setTimeout(function(){
        new Swiper('.sbanner .swiper', {
            pagination: {
                el: '.sbanner .swiper-pagination',
                clickable: true,
            },
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1000,
            watchOverflow: true,
            parallax: true,
            watchSlidesProgress: true,
            loop: true,
            navigation: {
                nextEl: '.sbanner .swiper-button-next',
                prevEl: '.sbanner .swiper-button-prev'
            },
            autoplay: {
                delay: sliderTime * 1000,
                disableOnInteraction: false
            },
            fadeEffect: {
                crossFade: true
            },
            on: {
                init: function () {
                    tlprogressBar.fromTo($progressBar, sliderTime, {
                        transformOrigin: "0px 0px",
                        scaleX: 0
                    }, {
                        transformOrigin: "0px 0px",
                        scaleX: 1
                    })
                },
                imagesReady: function () {
                    this
                        .el
                        .classList
                        .remove('loading');
                    this
                        .autoplay
                        .start();
                },
                slideChangeTransitionStart: function () {
                    if (sliderInit) {
                        TweenMax.to($progressBar, 1.1, {
                            transformOrigin: "0px 0px",
                            scaleX: 0
                        })
                    } else {
                        sliderInit = true;
                    }
                },
                slideChangeTransitionEnd: function () {
                    let swiper = this;
                    tlprogressBar.restart();
                },
                progress: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper
                            .slides[i]
                            .progress,
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;

                        swiper
                            .slides[i]
                            .querySelector(".slide-image")
                            .style
                            .transform = "translateX(" + innerTranslate + "px)";
                    }
                },
                touchStart: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper
                            .slides[i]
                            .style
                            .transition = "";
                    }
                },
                setTransition: function (speed) {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper
                            .slides[i]
                            .style
                            .transition = speed + "ms";
                        swiper
                            .slides[i]
                            .querySelector(".slide-image")
                            .style
                            .transition = speed + "ms";
                    }
                }
            }
        });

        new Swiper(".partner-slider .swiper", {
            slidesPerView: 'auto',
            spaceBetween: 11,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 1,
                disableOnInteraction: false
            },
        });
        
        new Swiper(".hproject .swiper", {
            slidesPerView: 3,
            spaceBetween: 10,
            speed: 2000,
            loop: true,
            navigation: {
                nextEl: '.hproject .swiper-button-next',
                prevEl: '.hproject .swiper-button-prev'
            },
            autoplay: {
                delay: sliderTime * 1000,
                disableOnInteraction: false
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                450: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        });

        
        new Swiper(".hnews .swiper", {
            slidesPerView: 3,
            spaceBetween: 25,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: sliderTime * 1100,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: '.hnews .swiper-button-next',
                prevEl: '.hnews .swiper-button-prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                450: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
            },
        });
        
        new Swiper(".team .swiper", {
            slidesPerView: 6,
            spaceBetween: 24,
            speed: 2000,
            loop: false,
            autoplay: {
                delay: sliderTime * 1000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                450: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                600: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                850: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1100: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                },
                1400: {
                    slidesPerView: 6,
                    spaceBetween: 24,
                },
            },
        });


        function fixMemberHeightAndCaption() {
            var maxMemberHeight = 0;

            // Reset heights first
            $('.team .swiper-slide, .team .member-caption').css('height', 'auto');

            // Find the tallest member (slide)
            $('.team .swiper-slide').each(function () {
                var memberHeight = $(this).outerHeight();
                if (memberHeight > maxMemberHeight) {
                    maxMemberHeight = memberHeight;
                }
            });

            // Get the fixed height of the member-top section
            var memberTopHeight = $('.team .member-top').outerHeight();

            // Calculate the height available for the member-caption
            var captionHeight = maxMemberHeight - memberTopHeight;

            // Apply the max height to all members
            $('.team .swiper-slide').outerHeight(maxMemberHeight);

            // Apply the calculated height to the .member-caption
            $('.team .member-caption').outerHeight(captionHeight);
        }

        // Run after everything loads (important for images)
       // $(window).on('load', function () {
            fixMemberHeightAndCaption();
        //});

        // Recalculate on window resize
        $(window).on('resize', function () {
            fixMemberHeightAndCaption();
        });

        
        new Swiper(".sectors .swiper", {
            slidesPerView: 6,
            spaceBetween: 5,
            speed: 2000,
            loop: false,
            autoplay: {
                delay: sliderTime * 1000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                300: {
                    slidesPerView: 2,
                },
                600: {
                    slidesPerView: 3,
                },
                850: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 5,
                },
                1500: {
                    slidesPerView: 6,
                    spaceBetween: 5,
                },
            },
        });

        new Swiper(".pgicons .swiper", {
            slidesPerView: 6,
            spaceBetween: 5,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: sliderTime * 1000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".pgicons .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                300: {
                    slidesPerView: 2,
                },
                600: {
                    slidesPerView: 4,
                },
                850: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 5,
                },
            },
        });        

        new Swiper(".pfeat .swiper", {
            slidesPerView: 6,
            spaceBetween: 5,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: sliderTime * 1100,
                disableOnInteraction: false
            },
            pagination: {
                el: ".pfeat .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                300: {
                    slidesPerView: 2,
                },
                600: {
                    slidesPerView: 4,
                },
                850: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 5,
                },
            },
        });
                

        new Swiper(".pgallery .swiper", {
            slidesPerView: 6,
            spaceBetween: 5,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: sliderTime * 1100,
                disableOnInteraction: false
            },
            pagination: {
                el: ".pgallery .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                450: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });

        new Swiper(".services .swiper", {
            slidesPerView: 4,
            spaceBetween: 60,
            speed: 2000,
            loop: false,
            autoplay: {
                delay: sliderTime * 1000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1500: {
                    slidesPerView: 4,
                    spaceBetween: 60,
                },
            },
        });
    }, 3000);

    setTimeout(function () {
        jQuery('#loading').addClass('end');
    }, 500);
    setTimeout(function () {
        jQuery('#loading').addClass('remove');
    }, 2000);
    setTimeout(function () {
        jQuery('#loading').removeClass('end');
    }, 3000);

    jQuery(window).scroll(function(){
        jQuery('.banner:not(.none_scroll) .shadow').css("opacity", jQuery(window).scrollTop() / 1000) - 1;
        jQuery('.sbanner:not(.none_scroll) .shadow').css("opacity", jQuery(window).scrollTop() / 1000) - 1;
        jQuery('.slbanner:not(.none_scroll) .shadow').css("opacity", jQuery(window).scrollTop() / 1000) - 1;
    });

    // jQuery(document).on('click', 'a', function(event) {
    //     event.preventDefault();
    //     /* Act on the event */
    //     var nextPage = jQuery(this).attr('href');

    //     jQuery('#loading').removeClass('remove');

    //     setTimeout(function() {
    //         window.location.href = nextPage;
    //     }, 2000);
    // });
    
    // Chọn các phần tử cần thiết
    const mapImage = document.querySelector('.map--img');
    const locationList = document.querySelectorAll('.location--list li');
    const locationAddressList = document.querySelector('.location--address');
    const pins = document.querySelectorAll('.map--img span'); // Chọn tất cả các pin trong map

    // Lặp qua các phần tử .location--list để thêm sự kiện hover
    locationList.forEach((locationItem) => {
        locationItem.addEventListener('mouseenter', () => {
            //mapImage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Lấy class của li đang hover (ví dụ: pin1, pin2, ...)
            const pinClass = locationItem.classList[0];

            // Tìm phần tử tương ứng trên bản đồ và thêm class active
            const pinOnMap = mapImage.querySelector(`.${pinClass}`);
            if (pinOnMap) {
                pinOnMap.classList.add('active');
            }

            // Cập nhật địa chỉ vào .location--address từ data-address của li
            const address = locationItem.getAttribute('data-address');

            // Làm sạch tất cả địa chỉ trong .location--address
            locationAddressList.querySelectorAll('li').forEach((addressItem) => {
                addressItem.classList.remove('active'); // Gỡ bỏ hiệu ứng active
            });


            // Thêm class 'visible' để hiển thị địa chỉ
            locationAddressList.classList.add('visible');

            // Thêm class 'active' vào mục li tương ứng để áp dụng animation
            locationAddressList.querySelector(`li.${pinClass}`).classList.add('active');
        });

        // Khi hover ra ngoài li
        locationItem.addEventListener('mouseleave', () => {
            // Gỡ bỏ class active khỏi phần tử trên bản đồ
            const pinClass = locationItem.classList[0];
            const pinOnMap = mapImage.querySelector(`.${pinClass}`);
            if (pinOnMap) {
                pinOnMap.classList.remove('active');
            }

            // Gỡ bỏ class 'visible' để ẩn danh sách địa chỉ
            locationAddressList.classList.remove('visible');

            // Gỡ bỏ class 'active' khỏi tất cả các mục li
            locationAddressList.querySelectorAll('li').forEach((addressItem) => {
                addressItem.classList.remove('active');
            });
        });
    });

    // Khi hover vào các pin trên bản đồ
    pins.forEach((pin) => {
        pin.addEventListener('mouseenter', () => {
            //mapImage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Lấy class của pin đang hover (ví dụ: pin1, pin2, ...)
            const pinClass = pin.classList[0];

            // Tìm phần tử tương ứng trong danh sách .location--list và kích hoạt hover
            const locationItem = document.querySelector(`.location--list .${pinClass}`);
            if (locationItem) {
                locationItem.classList.add('active');
            }

            // Cập nhật địa chỉ vào .location--address từ data-address của pin
            const address = locationItem.getAttribute('data-address');

            // Làm sạch tất cả địa chỉ trong .location--address
            locationAddressList.querySelectorAll('li').forEach((addressItem) => {
                addressItem.classList.remove('active'); // Gỡ bỏ hiệu ứng active
            });

            // Thêm class 'visible' để hiển thị địa chỉ
            locationAddressList.classList.add('visible');

            // Thêm class 'active' vào mục li tương ứng để áp dụng animation
            locationAddressList.querySelector(`li.${pinClass}`).classList.add('active');
        });

        // Khi hover ra ngoài pin
        pin.addEventListener('mouseleave', () => {
            // Lấy class của pin đang hover (ví dụ: pin1, pin2, ...)
            const pinClass = pin.classList[0];

            // Gỡ bỏ class active khỏi phần tử trong .location--list
            const locationItem = document.querySelector(`.location--list .${pinClass}`);
            if (locationItem) {
                locationItem.classList.remove('active');
            }

            // Gỡ bỏ class 'visible' để ẩn danh sách địa chỉ
            locationAddressList.classList.remove('visible');

            // Gỡ bỏ class 'active' khỏi tất cả các mục li trong .location--address
            locationAddressList.querySelectorAll('li').forEach((addressItem) => {
                addressItem.classList.remove('active');
            });
        });
    });

    // animate menu
    jQuery('#menu-trigger').on('change', function () {
        if (jQuery(this).is(':checked')) {
            tlMenu.restart();
            setTimeout(function () {
                jQuery('body').addClass('none-scroll');
            }, 300);
        } else {
            tlMenu.reverse();
            setTimeout(function () {
                jQuery('body').removeClass('none-scroll');
            }, 300);
        }
    });
    var tlMenu = new TimelineMax({ paused: true });
    var sidebar = document.querySelector('.sidebar');
    var sidebarOverlay = document.querySelector('.sidebar-overlay');
    var sidebarList = document.querySelectorAll('.sidebar-inner ul li');
    var sidebarLang = document.querySelector('.sidebar_lang');
    var sidebarButton = document.querySelector('.sidebar_button');

    tlMenu.to(sidebarOverlay, 0.5, { opacity: 0.5, ease: Power4.easeOut }, "-=0.2")
        .to(sidebar, 0.5, { y: 0, ease: Power4.easeOut });

    tlMenu.to(sidebarLang, 0.3, { x: 0, opacity: 1, ease: Power4.easeOut });

    sidebarList.forEach(function (item) {
        tlMenu.fromTo(item, 0.3, { x: 10, opacity: 0, ease: Power4.easeOut }, { x: 0, opacity: 1, ease: Power4.easeOut }, "-=0.18")
    });

    tlMenu.to(sidebarButton, 0.3, { x: 0, opacity: 1, ease: Power1.easeOut });
    
    // Scroll Animation
    setTimeout(function () {
        var $animation_elements = jQuery('[data-anim]');
        var $window = jQuery(window);

        function anim() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + 600);

            jQuery.each($animation_elements, function () {
                var $element = jQuery(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + 600);

                //check to see if this current container is within viewport
                if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                    $element.attr('data-anim', "true");
                } else {
                    //$element.attr('data-anim', "false");
                }
            });
        }

        $window.on('scroll resize', anim);
        $window.trigger('scroll');
    }, 2500);


});

function changeTab(event, tabId) {
    // Xóa active class khỏi tất cả các tab và nội dung
    const tabs = document.querySelectorAll('.tk-tabs .child');
    const contents = document.querySelectorAll('.tk-contents .child');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Thêm active class vào tab được chọn và nội dung tương ứng
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// skrollr first load init
function skrollr_int() {

    if (!is_mobile()) {
        skr_init();

        jQuery(window).on('load', function () {
            // load again when img a load
            if (skr != null) {
                skr.refresh();
            }
        })
    }
}

// skrollr init function
function skr_init() {

    if (jQuery(window).width() <= 1023) {
        if (skr != null) {
            skr.destroy();
        }
    } else {
        skr = skrollr.init({
            smoothScrolling: false,
            forceHeight: false
        });
    }
}


/* ********************************************* *
 * HELPERS
 * ********************************************* */
// SIMPLE MOBILE CHECK
function is_mobile() {
    return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}
function is_mobile_ios() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

// SIMPLE BROWSER CHECK
function is_browser_chrome() {
    return /Chrome/.test(navigator.userAgent);
}
function is_browser_safari() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
}
function is_browser_firefox() {
    return /Firefox/.test(navigator.userAgent);
}
function is_browser_ie() {
    return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null)));
}
function is_browser_ie9() {
    return ($.browser.msie && parseInt($.browser.version, 10) <= 9) ? true : false;
}

// SIMPLE OS CHECK
function is_mac_os() {
    return navigator.platform.indexOf('Mac') > -1;
}

// SIMPLE SCREEN CHECK
function is_screen(max_width) {
    if (!!window.matchMedia) {
        return window.matchMedia('(max-width:' + max_width + 'px)').matches;
    }
}