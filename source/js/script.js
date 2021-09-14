'use strict';


import { event } from 'jquery';
import Swiper, { Scrollbar, Thumbs, Navigation, Pagination, EffectFade, Autoplay, Mousewheel, Keyboard, Lazy } from 'swiper';

Swiper.use([Scrollbar, Thumbs, EffectFade, Pagination, Navigation, Autoplay, Mousewheel, Keyboard, Lazy]);


var $ = require("jquery");
window.jQuery = $;


var fancybox = require("@fancyapps/fancybox");

$('[data-fancybox]').fancybox({
    buttons: [
        'slideShow',
        'fullScreen',
        'thumbs',
        //'share',
        'download',
        //'zoom',
        'close'
    ],
    thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        // parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
    },
    openEffect: 'elastic',

});


let getCoordsNew = function(el) {
    let block = $(el),
        offset = block.offset(),
        topOffset = offset.top,
        bottomOffset = topOffset + block.outerHeight();
    return {
        top: topOffset,
        bottom: bottomOffset
    }
};


function scrollToTopStatic(element) {
    let topForm = Math.round(getCoordsNew(document.querySelector('.form')).top);
    window.scrollTo({
        top: topForm,
        behavior: "smooth"
    });


}

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let flagAnchorWasClick = false;
document.querySelectorAll('a').forEach((element) => {

    element.addEventListener('click', function() {
        if (element.href.indexOf('#')) {
            flagAnchorWasClick = true;

            console.log(flagAnchorWasClick);
        }

    })

})

let oldScrollTopPosition = 0;

window.addEventListener('scroll', function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const scrollTopPosition = document.body.scrollTop || document.documentElement.scrollTop;

    if (oldScrollTopPosition > scrollTopPosition) {
        if (!flagAnchorWasClick) {
            document.querySelector('.header').style.transform = "translateY(0%)";

        } else {
            document.querySelector('.header').style.transform = "translateY(-100%)";
            setTimeout(function() {
                flagAnchorWasClick = false;
            }, 1000)

        }

    } else {
        document.querySelector('.header').style.transform = "translateY(-100%)";

        burger.classList.remove('active');
        nav.classList.remove('active');


    }
    if (winScroll == 0) {
        document.querySelector('.header').style.transform = "translateY(0%)";
    }
    oldScrollTopPosition = scrollTopPosition;
})

let menu = document.querySelectorAll('.hero__links');
for (let i = 0; i < menu.length; i++) {
    // МЕню в лукбуке
    (function() {
        const target = menu[i].querySelector(".target");
        const links = menu[i].querySelectorAll(".hero__links-item");

        for (let i = 0; i < links.length; i++) {
            if (links[i].classList.contains('current')) {

                const width = links[i].getBoundingClientRect().width;
                const height = links[i].getBoundingClientRect().height;
                const left = links[i].getBoundingClientRect().left + window.pageXOffset;


                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
                target.style.left = `${left}px`;

                target.style.transform = "none";
                target.style.opacity = '1';
            }
        }

        function mouseenterFunc() {
            if (!this.classList.contains("active")) {

                for (let i = 0; i < links.length; i++) {
                    if (links[i].classList.contains("active")) {
                        links[i].classList.remove("active");
                    }

                    // links[i].style.opacity = "0.25";
                }

                this.classList.add("active");

                // this.style.opacity = "1";

                const width = this.getBoundingClientRect().width;
                const height = this.getBoundingClientRect().height;
                const left = this.getBoundingClientRect().left + window.pageXOffset;


                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
                target.style.left = `${left}px`;

                target.style.transform = "none";
                target.style.opacity = '1';
            } else {
                target.style.opacity = '1';
            }
        }

        function mouseleaveFunc() {
            let currentFlag = false;

            for (let i = 0; i < links.length; i++) {

                if (links[i].classList.contains('current')) {

                    currentFlag = true;

                }
            }
            if (currentFlag) {
                let current = menu[i].querySelector(".hero__links-item.current");
                const width = current.getBoundingClientRect().width;
                const height = current.getBoundingClientRect().height;
                const left = current.getBoundingClientRect().left + window.pageXOffset;


                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
                target.style.left = `${left}px`;

                target.style.transform = "none";
                target.style.opacity = '1';
            } else {

                // target.style.left = `0px`;

                // target.style.transform = "translateX(-100%)";
                target.style.opacity = '0';

            }

        }

        for (let i = 0; i < links.length; i++) {

            links[i].addEventListener("mouseenter", mouseenterFunc);
        }
        let container = menu[i];
        if (container) {
            container.addEventListener("mouseleave", mouseleaveFunc);
        }



        function resizeFunc() {
            const active = document.querySelector(".hero__links-item a.active");

            if (active) {
                const width = active.getBoundingClientRect().width;
                const height = active.getBoundingClientRect().height;
                const left = active.getBoundingClientRect().left + window.pageXOffset;
                // const top = active.getBoundingClientRect().top + window.pageYOffset + 6;

                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
                target.style.left = `${left}px`;
                // target.style.top = `${top}px`;

            }
        }

        window.addEventListener("resize", resizeFunc);

    })();
}

function setMainSwiperMouseOver() {

    swiperBig.detachEvents();
    // swiperBig.mousewheel.disable();


}

function setMainSwiperMouseOut() {

    swiperBig.attachEvents();
    // swiperBig.mousewheel.enable();


}




let swiperClient,
    swiperServ,
    swiperEq,
    swiperProject,
    swiperHero,
    swiperBig;

document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('.swiper-container--client')) {
        swiperClient = new Swiper('.swiper-container--client', {
            slidesPerView: 3,
            // slidesPerGroup: 3,
            // freeMode: true,
            centeredSlides: true,
            // slidesPerView: 'auto',
            spaceBetween: 50,
            // loopedSlides: 2,
            loop: true,
            loopAdditionalSlides: 5,
            // loopFillGroupWithBlank: true,
            autoplay: {
                delay: 1000,
            },
            // virtual: {
            //     slides: (function() {
            //         var slides = [];
            //         for (var i = 0; i < 6; i += 1) {
            //             slides.push('Slide ' + (i + 1));
            //         }
            //         return slides;
            //     }()),
            // },

            breakpoints: {
                768: {
                    slidesPerView: 5,


                },
                1280: {
                    slidesPerView: 7,

                    spaceBetween: 40,
                },
            }
        });

        swiperClient.on('beforeLoopFix', function() {
            document.querySelector('.client .swiper-wrapper').classList.add('transitionOff');
        })

        swiperClient.on('loopFix', function() {
            document.querySelector('.client .swiper-wrapper').classList.remove('transitionOff');
        })
    }

    if (document.querySelector('.hero__links')) {
        swiperHero = new Swiper('.hero__links', {
            // slidesPerView: 1,
            freeMode: true,
            edgeSwipeThreshold: 300,
            simulateTouch: true,
            slidesPerView: 'auto',
            // spaceBetween: 50,

        });
        if (document.querySelector('.swiper-container--hero')) {
            document.querySelectorAll('.hero__links').forEach((element) => {

                element.addEventListener('mouseover', setMainSwiperMouseOver);
                element.addEventListener('mouseout', setMainSwiperMouseOut);
                element.addEventListener('touchstart', setMainSwiperMouseOver);
                element.addEventListener('touchmove', setMainSwiperMouseOver);
                element.addEventListener('touchend', setMainSwiperMouseOut);
            })
        }

    }
    swiperBig = new Swiper('.swiper-container--hero', {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loopPreventsSlide: false,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        // loopFillGroupWithBlank: true,
        // shortSwipes: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1280: {
                // shortSwipes: true,
            },
        }
        // freeMode: true,
        // slidesPerView: 'auto',
        // spaceBetween: 50,

    });
    if (swiperBig) {

        document.querySelectorAll('.swiper-container--hero .swiper-slide:not(.swiper-slide-active) .animated').forEach((element) => {
            element.classList.add('hide');
        })
        swiperBig.on('slideChange', function() {
            document.querySelector('.swiper-container--hero').classList.add('load');

            document.querySelectorAll('.swiper-slide .animated').forEach((element) => {
                element.classList.add('hide');
                element.classList.remove('show');

            })

            setTimeout(function() {
                document.querySelectorAll('.swiper-slide-active .animated').forEach((element) => {
                    element.classList.add('show');
                    element.classList.remove('hide');

                })

            }, 500)



        });


        let slideLink = document.querySelectorAll('.hero__link');

        for (let i = 0; i < slideLink.length; i++) {
            slideLink[i].addEventListener('click', function(event) {
                event.preventDefault();
                // swiperBig.on('beforeLoopFix', function() {
                //     swiperBig.slidePrev(500, true);
                //     console.log('Сейчас будет луп фикс')
                // });
                swiperBig.slideNext(500, true);
            })
        }
    }

    swiperServ = new Swiper('.swiper-container--services', {
        // slidesPerView: 1,
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoHeight: false,
        preloadImages: false,
        watchSlidesVisibility: true,
        // Enable lazy loading
        lazy: {
            loadOnTransitionStart: true,
            // lazyLoadingInPrevNext: true,
            // lazyLoadingInPrevNextAmount: 5
        },
        scrollbar: {

            el: '.swiper-scrollbar--services',


        },
        breakpoints: {
            700: {
                // slidesPerView: 2,
                spaceBetween: 20,
            },
            1285: {
                slidesPerView: 3,
                spaceBetween: 50,
                scrollbar: {
                    hide: true,
                },
            },

        }
    });


    swiperEq = new Swiper('.swiper-container--equipment', {
        slidesPerView: 1,
        preloadImages: false,
        watchSlidesVisibility: true,
        // Enable lazy loading
        lazy: {
            loadOnTransitionStart: true,
            // lazyLoadingInPrevNext: true,
            // lazyLoadingInPrevNextAmount: 5
        },
        scrollbar: {

            el: '.swiper-scrollbar--equipment',


        },
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next--equipment',
            prevEl: '.swiper-button-prev--equipment',
        },
        breakpoints: {
            700: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 25,
                scrollbar: {
                    hide: true,
                },
            },

        }
    });


    swiperProject = new Swiper('.swiper-container--project', {
        slidesPerView: 1,

        scrollbar: {
            el: '.swiper-scrollbar--project',
        },
        spaceBetween: 20,
        preloadImages: false,
        watchSlidesVisibility: true,
        // Enable lazy loading
        lazy: {
            loadOnTransitionStart: true,
            // lazyLoadingInPrevNext: true,
            // lazyLoadingInPrevNextAmount: 5
        },
        breakpoints: {
            700: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 25,
                scrollbar: {
                    hide: true,
                },
            },

        }
    });
})




if (document.querySelector('.link-detail')) {
    document.querySelector('.link-detail').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.hero__desc-wrap').classList.add('active');
        document.querySelector('.link-detail').style.display = "none";
    })
}


// Получаем нужный элемент
var element = document.querySelectorAll('.animate');
var element2 = document.querySelectorAll('.shine');
var Visible = function(target) {

    for (let i = 0; i < target.length; i++) {
        // Все позиции элемента
        var targetPosition = {
                top: window.pageYOffset + target[i].getBoundingClientRect().top,
                left: window.pageXOffset + target[i].getBoundingClientRect().left,
                right: window.pageXOffset + target[i].getBoundingClientRect().right,
                bottom: window.pageYOffset + target[i].getBoundingClientRect().bottom
            },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
            target[i].classList.add('visible');
        } else {
            // Если элемент не видно, то запускаем этот код

        };
    }

};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
    Visible(element);
    Visible(element2);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible(element);
Visible(element2);




// Пошаговая форма
let btntabs = document.querySelectorAll('.button-step');
for (let i = 0; i < btntabs.length; i++) {
    btntabs[i].addEventListener('click', function(event) {
        event.preventDefault();
        let tab = document.querySelectorAll('.form fieldset')[i];
        let tabnext = document.querySelectorAll('.form fieldset')[i + 1];
        let link = document.querySelectorAll('.steps__item')[i];
        let linknext = document.querySelectorAll('.steps__item')[i + 1];

        let input = tab.querySelectorAll('[required]');

        let errorw = tab.querySelector('.error')


        let flagValid = true;
        let validMessage = "";
        for (let i = 0; i < input.length; i++) {

            if (!input[i].checkValidity()) {
                flagValid = false;

            }

            validMessage += '<p style="color:red;">' + input[i].title;

        }


        if (flagValid) {
            tab.classList.remove('current');

            tabnext.classList.add('current')
            link.classList.remove('current');
            linknext.classList.add('current');
            link.classList.add('active');
            linknext.classList.add('active');
            scrollToTopStatic(document.querySelector('form'));
        } else {


            errorw.innerHTML = validMessage;
            scrollToTopStatic(document.querySelector('form'));

        }

        link.addEventListener('click', function() {
            if (link.classList.contains('active')) {

                let current = document.querySelector('.form fieldset.current').classList.remove('current');
                let currentlink = document.querySelector('.steps__item.current').classList.remove('current');
                tab.classList.add('current');
                link.classList.add('current');
            }


        })
        linknext.addEventListener('click', function() {
            if (linknext.classList.contains('active')) {

                let current = document.querySelector('.form fieldset.current').classList.remove('current');
                let currentlink = document.querySelector('.steps__item.current').classList.remove('current');
                tabnext.classList.add('current');
                linknext.classList.add('current');
            }
        })

    })
}


let burger = document.querySelector('.burger');
let nav = document.querySelector('.nav');
burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
})

document.querySelectorAll('.nav__list li a').forEach((element) => {
    element.addEventListener('click', function() {
        burger.classList.remove('active');
        nav.classList.remove('active');
    })

})

// Отправка формы

$('#form-test').on("submit", function(e) {
    e.preventDefault();
    var dataF = new FormData(this);
    $.ajax({
        url: $('#form-test').attr('action'),
        type: "POST",
        data: dataF,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            document.querySelector('.form fieldset.current').classList.remove('current');
            document.querySelector('.form .thank').classList.add('current');

        }
    });
});

$('#form__modal').on("submit", function(e) {
    e.preventDefault();
    var dataF = new FormData(this);
    $.ajax({
        url: $('#form__modal').attr('action'),
        type: "POST",
        data: dataF,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            $.fancybox.open($('.thank__modal'), {
                touch: false,
                infobar: false
            });

            setTimeout(function() {
                $.fancybox.close(true);

            }, 2000)


        }

    });
});



// Валидация телефона

function telValidation() {

    function InputMask(options) {
        this.el = this.getElement(options.selector);
        if (!this.el) return console.log('Что-то не так с селектором');
        this.layout = options.layout || '+_ (___) ___-__-__';
        this.maskreg = this.getRegexp();

        this.setListeners();
    }

    InputMask.prototype.getRegexp = function() {
        let str = this.layout.replace(/_/g, '\\d')
        str = str.replace(/\(/g, '\\(')
        str = str.replace(/\)/g, '\\)')
        str = str.replace(/\+/g, '\\+')
        str = str.replace(/\s/g, '\\s')

        return str;
    }

    InputMask.prototype.mask = function(e) {
        let _this = e.target,
            matrix = this.layout,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = _this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        _this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });

        if (e.type == "blur") {
            var regexp = new RegExp(this.maskreg);
            if (!regexp.test(_this.value)) _this.value = "";
        } else {
            this.setCursorPosition(_this.value.length, _this);
        }
    }

    InputMask.prototype.setCursorPosition = function(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    InputMask.prototype.setListeners = function() {
        this.el.addEventListener("input", this.mask.bind(this), false);
        this.el.addEventListener("focus", this.mask.bind(this), false);
        this.el.addEventListener("blur", this.mask.bind(this), false);
        this.el.addEventListener('keyup', function(evt) {
            let length = this.value.length
            if (length < 18) {
                this.style.border = "1px solid #de4145";

            } else {
                this.style.border = " 1px solid #149F97";
            }
        });
    }

    InputMask.prototype.getElement = function(selector) {
        if (selector === undefined) return false;
        if (this.isElement(selector)) return selector;
        if (typeof selector == 'string') {
            var el = document.querySelector(selector);
            if (this.isElement(el)) return el;
        }
        return false
    }

    InputMask.prototype.isElement = function(element) {
        return element instanceof Element || element instanceof HTMLDocument;
    }



    let inputs = document.querySelectorAll('input[type="tel"]');

    Array.prototype.forEach.call(inputs, function(input) {
        new InputMask({
            selector: input, // в качестве селектора может быть элемент, или, собственно css селектор('#input', '.input', 'input'). Если селектор - тег или класс - будет получен только первый элемент
            layout: input.dataset.mask
        })
    })
}


telValidation();



document.querySelector('.with-sub>a').addEventListener('click', function(event) {
    event.preventDefault();
})
document.querySelector('.with-sub>a').addEventListener('click', function() {
    // window.location.href = '/';

    if (window.location.pathname.indexOf('/de/') > -1) {
        window.location.href = '/de/';
    } else {
        window.location.href = '/';
    }
})