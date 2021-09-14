document.addEventListener('DOMContentLoaded', function() {

    let swiperHero = new Swiper('.swiper-container--hero', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    let body = document.body;
    let item = document.querySelectorAll('.item');

    body.addEventListener('mousemove', function(e) {
        let x = -(e.pageX + this.offsetLeft) / 40;
        let y = -(e.pageY + this.offsetTop) / 40;

        if (item) {
            for (let i = 0; i < item.length; i++) {
                item[i].style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0px)';

                item[0].style.transform = 'translate3d(' + -x + 'px,' + -y + 'px, 0px)';
            }
        }


        if (document.querySelector('.work__water')) {
            document.querySelector('.work__water').style.transform = 'translate3d(' + -x + 'px,' + -y + 'px, 0px)';
            document.querySelector('.work__img').style.transform = 'translate3d(' + x + 'px,' + '0px, 0px)';
        }

    })

    toggleClass('.burger', '.nav', 'active');

    var d = new Date();
    let text = document.querySelector('.copyright').textContent;
    document.querySelector('.copyright').textContent = text + d.getFullYear();
})


function toggleClass(button, content, activeClass) {
    let btn = document.querySelector(button);
    let element = document.querySelector(content)
    btn.addEventListener('click', function() {
        element.classList.toggle(activeClass);
        btn.classList.toggle(activeClass);


    })

}

let oldScrollTopPosition = 0;

window.addEventListener('scroll', function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const scrollTopPosition = document.documentElement.scrollTop;
    console.log(oldScrollTopPosition > scrollTopPosition);
    if (oldScrollTopPosition > scrollTopPosition) {
        document.querySelector('.header').classList.add('active');
        document.querySelector('.header').style.transform = "translateY(0%)";
    } else {

        document.querySelector('.header').style.transform = "translateY(-100%)";
        document.querySelector('.header').classList.remove('active');

    }
    if (winScroll == 0) {
        document.querySelector('.header').classList.remove('active');
    }
    oldScrollTopPosition = scrollTopPosition;
})


// $(function() {
// вызываем форму
$(document).on("click", ".call_form", function(e) {
    e.preventDefault(); // отменяем переход по ссылке


    var this_ = $(this);
    if (this_.hasClass("disabled"))
        return false;

    this_.addClass("disabled");

    $.ajax({
        url: "/include/form.php",
        type: "POST",
        data: {},
        success: function(data) {
            $("body").append(data);
            $(".modal_background").css({ "display": "flex" });
            $(".modal_form").fadeIn();
            this_.removeClass("disabled");
        }
    });
});
// а это для закрытия формы
$(document).on("click", ".close_form", function(e) {
    e.preventDefault();
    $(".modal_background").hide().remove();
});



$('#form').on("submit", function(e) {
    e.preventDefault();
    var dataF = new FormData(this);
    $.ajax({
        url: "/basket-product.php",
        type: "POST",
        data: dataF,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            // $("body").append(data);
            $(".modal_basketsucces").addClass('active');

            $(".overlay").addClass('active');

            $(document).on("click", ".modal_basketsucces-ok", function(e) {
                e.preventDefault();
                $(".modal_basketsucces").removeClass('active');
                $(".overlay").removeClass('active');
            });

            $(document).on("click", ".overlay", function(e) {
                e.preventDefault();
                $(".modal_basketsucces").removeClass('active');
                $(".overlay").removeClass('active');
            });

            checkBasket('#form .button--js-tobasket');
        }


    });
});

$('#form1').on("submit", function(e) {
    e.preventDefault();
    var dataF = new FormData(this);
    $.ajax({
        url: "/basket-product.php",
        type: "POST",
        data: dataF,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            // $("body").append(data);
            $(".modal_basketsucces").addClass('active');

            $(".overlay").addClass('active');

            $(document).on("click", ".modal_basketsucces-ok", function(e) {
                e.preventDefault();
                $(".modal_basketsucces").removeClass('active');
                $(".overlay").removeClass('active');
            });

            $(document).on("click", ".overlay", function(e) {
                e.preventDefault();
                $(".modal_basketsucces").removeClass('active');
                $(".overlay").removeClass('active');
            });

            checkBasket('#form1 .button--js-tobasket');
        }


    });
});

$('#form2').on("submit", function(e) {
    e.preventDefault();
    var dataF = new FormData(this);
    $.ajax({
        url: "/basket-product.php",
        type: "POST",
        data: dataF,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            // $("body").append(data);
            $(".modal_basketsucces").addClass('active');

            $(".overlay").addClass('active');

            $(document).on("click", ".modal_basketsucces-ok", function(e) {
                e.preventDefault();
                $(".modal_basketsucces").removeClass('active');
                $(".overlay").removeClass('active');
            });

            $(document).on("click", ".overlay", function(e) {
                e.preventDefault();
                $(".modal_basketsucces").removeClass('active');
                $(".overlay").removeClass('active');
            });

            checkBasket('#form2 .button--js-tobasket');
        }


    });
});



function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}



let bskFlag = JSON.parse(getCookie('PRODUCT'));
if (bskFlag == null) {
    bskFlag = [];
}
let count = 0;
let count2 = 0;



if (bskFlag) {
    count = bskFlag.length;
    $('.bth-basket__count').text(count);
}




function checkBasket(button) {

    if (bskFlag.indexOf($(button).val()) == -1) {


        bskFlag.push($(button).val());
        setCookie('PRODUCT', JSON.stringify(bskFlag), 2);

        count2 = bskFlag.length;

        $('.bth-basket__count').text(count2);
    } else {

        console.log($(button).val());
        $(".modal_basketsucces h2").text('Товар уже был добавлен в корзину');
    }

}

// Коллличественный спинер

(function() {

    var Spinner = function(rootElement) {
        //Add button selector
        var addButtonSelector = '.js_spin-add';
        //Remove button selector
        var removeButtonSelector = '.js_spin-remove';
        //Number input selector
        var numberInputSelector = '.js_spin-input';
        //A variable to store the markup for the add button
        var addButtonMarkup = '<button type="button" class="js_spin-add">+</button>';
        //A variable to store the markup for the remove button
        var removeButtonMarkup = '<button type="button" class="js_spin-remove">-</button>';
        //Variable to store the root's container
        var container;
        //A variable for the markup of the number input pattern
        var markup;
        //A variable to store a number input
        var numberInput;
        //Variable to store the add button
        var addButton;
        //Variable to store the remove button
        var removeButton;
        //Store max value
        var maxValue;
        //Store min value
        var minValue;
        //Store step value
        var step;
        //Store new value
        var newValue;
        //Variable to store the loop counter
        var i;

        //Initialisation function
        this.init = function() {
            container = rootElement;
            //Get the markup inside the number input container
            markup = container.innerHTML;
            //Create a button to decrese the value by 1
            markup += removeButtonMarkup;
            //Create a button to increase the value by 1
            markup += addButtonMarkup;
            //Update the container with the new markup
            container.innerHTML = markup;

            //Get the add and remove buttons
            addButton = rootElement.querySelector(addButtonSelector);
            removeButton = rootElement.querySelector(removeButtonSelector);

            //Get the number input element
            numberInput = rootElement.querySelector(numberInputSelector);

            //Get min, max and step values
            if (numberInput.hasAttribute('max')) {
                maxValue = parseInt(numberInput.getAttribute('max'), 10);
            } else {
                maxValue = 99999;
            }
            if (numberInput.hasAttribute('min')) {
                minValue = parseInt(numberInput.getAttribute('min'), 10);
            } else {
                minValue = 0;
            }
            if (numberInput.hasAttribute('step')) {
                step = parseInt(numberInput.getAttribute('step'), 10);
            } else {
                step = 1;
            }

            //Change the number input type to text
            numberInput.setAttribute('type', 'text');

            //If there is there no pattern attribute, set it to only accept numbers
            if (!numberInput.hasAttribute('pattern')) {
                numberInput.setAttribute('pattern', '[0-9]');
            }

            //Add click events to the add and remove buttons
            addButton.addEventListener('click', add, false);
            removeButton.addEventListener('click', remove, false);
        };

        //Methods for setting values
        this.setAddButtonMarkup = function(markup) {
            addButtonMarkup = markup;
        };

        this.setRemoveButtonMarkup = function(markup) {
            removeButtonMarkup = markup;
        };

        this.setAddButtonSelector = function(selector) {
            addButtonSelector = selector;
        };

        this.setRemoveSelector = function(selector) {
            removeButtonSelector = selector;
        };

        this.setNumberInputSelector = function(selector) {
            numberInputSelector = selector;
        };

        //Function to add one to the quantity value
        var add = function(ev) {
            newValue = parseInt(numberInput.value, 10) + step;
            //If the value is less than the max value
            if (newValue <= maxValue) {
                //Add one to the number input value
                numberInput.value = newValue;
                //Button is active
                removeButton.disabled = false;
            }
            //If the value is equal to the max value
            if (numberInput.value == maxValue || newValue > maxValue) {
                //Disable the button
                addButton.disabled = true;
            }
            ev.preventDefault();
        };
        //Function to subtract one from the quantity value
        var remove = function(ev) {
            newValue = parseInt(numberInput.value, 10) - step;
            //If the number input value is bigger than the min value, reduce the the value by 1
            if (newValue >= minValue) {
                numberInput.value = newValue;
                addButton.disabled = false;
            }
            //If the input value is the min value, add disabled property to the button
            if (numberInput.value == minValue || newValue < minValue) {
                removeButton.disabled = true;
            }
            ev.preventDefault();
        };
    };

    //Get all of the number input elements
    var spins = document.querySelectorAll('.js_spin');
    //Store the total number of number inputs
    var spinsTotal = spins.length;
    //A variable to store one number inputs
    var spin;
    //A counter for the loop
    var i;
    //Loop through each number input
    for (i = 0; i < spinsTotal; i = i + 1) {
        //Create a new Spin object for each number input
        spin = new Spinner(spins[i]);
        //Start the initialisation function
        spin.init();
    }

}(this, this.document));

// });




let mapsR = document.getElementById('yandexmapa');

if (mapsR) {
    let lat = document.getElementById('lat').textContent;
    let lon = document.getElementById('lon').textContent;
    let name = document.querySelector('.adress-js').textContent;
    let geo = [lat, lon];

    let tag;
    if (typeof(ymaps) == 'undefined') {
        tag = document.createElement('script');
        tag.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        tag.onload = function() {
            ymaps.ready(init);
        }
    } else {
        ymaps.ready(init);
    }

    function init() {
        // ymaps.ready(function() {
        let map = new ymaps.Map(mapsR, {
            // center: [59.880069, 30.259939],
            center: geo,
            zoom: 15
        });


        let place = new ymaps.Placemark(
            geo, {
                hintContent: name,
            }, {
                iconImageHref: 'http://nahodka.artfactor-test.ru/local/templates/boon/img/pin.svg',
                // iconImageHref: '/img/contacts/ya_maps_pin.svg',
                iconImageSize: [64, 64],
                iconLayout: 'default#image',
            }
        );
        map.geoObjects.add(place);
        map.behaviors.disable('scrollZoom');
        // map.behaviors.disable('multiTouch');
        map.behaviors.disable('drag');

        mapsR.addEventListener('click', function() {
            map.behaviors.enable('drag');
            map.behaviors.disable('scrollZoom');
        })
    };

}




let product = document.querySelectorAll('.basket__list li');
let allSum = document.querySelector('#all-sum');
let allSumInput = document.querySelector('#allsum-input');
let allBtnDelete = document.querySelectorAll('.btn-delete');
let productsID = [];

for (let i = 0; i < allBtnDelete.length; i++) {
    productsID.push(allBtnDelete[i].value);
}

console.log(productsID);
let totalSum = 0;

let allSumProduct = document.querySelectorAll('.js-input-sum');

let btnReset = document.querySelector('button[type="reset"]');

if (btnReset) {
    btnReset.addEventListener('click', function() {
        if (bskFlag) {
            bskFlag = [];
            setCookie('PRODUCT', JSON.stringify(bskFlag), 2);

            count2 = bskFlag.length;

            $('.bth-basket__count').text(count2);

            for (let i = 0; i < product.length; i++) {
                product[i].remove();
                totalSum = 0;

            }
            document.querySelector('.basket__header').remove();
            allSum.textContent = totalSum;
            allSumInput.value = totalSum;
        }
    })
}


for (let i = 0; i < product.length; i++) {

    let add = product[i].querySelector('.js_spin-add');
    let remove = product[i].querySelector('.js_spin-remove');
    let price = product[i].querySelector('.js-sum').textContent;
    let sum = product[i].querySelector('.js-sum');
    let sumInput = product[i].querySelector('.js-input-sum');
    let input = product[i].querySelector('.js_spin-input');


    let btnDelete = product[i].querySelector('.btn-delete');


    add.addEventListener('click', function() {
        sum.textContent = price * input.value;
        sumInput.value = price * input.value;
        totalSum = 0;
        for (let i = 0; i < allSumProduct.length; i++) {
            console.log(parseInt(allSumProduct[i].value));
            totalSum = totalSum + parseInt(allSumProduct[i].value);
        }

        allSum.textContent = totalSum;
        allSumInput.value = totalSum;
    })
    remove.addEventListener('click', function() {
        sum.textContent = price * input.value;
        sumInput.value = price * input.value;
        totalSum = 0;
        for (let i = 0; i < allSumProduct.length; i++) {

            console.log(parseInt(allSumProduct[i].value));
            totalSum = totalSum + parseInt(allSumProduct[i].value);
        }
        allSum.textContent = totalSum;
        allSumInput.value = totalSum;
    })

    input.addEventListener('change', function() {
        sum.textContent = price * input.value;
        sumInput.value = price * input.value;
        totalSum = 0;
        for (let i = 0; i < allSumProduct.length; i++) {
            console.log(parseInt(allSumProduct[i].value));
            totalSum = totalSum + parseInt(allSumProduct[i].value);
        }
        allSum.textContent = totalSum;
        allSumInput.value = totalSum;
    })

    btnDelete.addEventListener('click', function() {
        product[i].remove();
        allSumProduct = document.querySelectorAll('.js-input-sum');
        totalSum = 0;
        for (let i = 0; i < allSumProduct.length; i++) {
            totalSum = totalSum + parseInt(allSumProduct[i].value);
        }
        allSum.textContent = totalSum;
        allSumInput.value = totalSum;


        if (bskFlag.indexOf(btnDelete.value) == -1) {

            // bskFlag.push($(button).val());

        } else {

            bskFlag.splice(bskFlag.indexOf(btnDelete.value), 1);
            setCookie('PRODUCT', JSON.stringify(bskFlag), 2);

            count2 = bskFlag.length;

            $('.bth-basket__count').text(count2);
            // $(".modal_basketsucces h2").text('Товар уже был добавлен в корзину');
        }

    })

    if (bskFlag.indexOf(btnDelete.value) == -1) {


        product[productsID.indexOf(btnDelete.value)].remove();

        allSumProduct = document.querySelectorAll('.js-input-sum');

        // totalSum = 0;

        // for (let i = 0; i < allSumProduct.length; i++) {
        //     console.log(parseInt(allSumProduct[i].value));
        //     totalSum = totalSum + parseInt(allSumProduct[i].value);

        // }

        // allSum.textContent = totalSum;
        // allSumInput.value = totalSum;



    } else {

        // console.log('Товара есть')

    }
    allSumProduct = document.querySelectorAll('.js-input-sum');

    console.log(allSumProduct);
    totalSum = 0;

    for (let i = 0; i < allSumProduct.length; i++) {
        console.log(parseInt(allSumProduct[i].value));
        totalSum = totalSum + parseInt(allSumProduct[i].value);

    }

    allSum.textContent = totalSum;
    allSumInput.value = totalSum;

    console.log(totalSum);

}



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
                this.style.border = " 1px solid #149437";
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



$('#basket').on("submit", function(e) {
    e.preventDefault();
    var dataF = new FormData(this);
    $.ajax({
        url: "/result.php",
        type: "POST",
        data: dataF,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            // $("body").append(data);
            $(".modal_ordersucces").addClass('active');

            $(".overlay").addClass('active');

            // $(document).on("click", ".modal_ordersucces-ok", function(e) {
            //     e.preventDefault();
            //     $(".modal_ordersucces").removeClass('active');
            //     $(".overlay").removeClass('active');
            // });

            // $(document).on("click", ".overlay", function(e) {
            //     e.preventDefault();
            //     $(".modal_ordersucces").removeClass('active');
            //     $(".overlay").removeClass('active');
            // });
            if (bskFlag) {
                bskFlag = [];
                setCookie('PRODUCT', JSON.stringify(bskFlag), 2);

                count2 = bskFlag.length;

                $('.bth-basket__count').text(count2);

                for (let i = 0; i < product.length; i++) {
                    product[i].remove();

                    totalSum = 0;

                }
                document.querySelector('.basket__header').remove();
                allSum.textContent = totalSum;
                allSumInput.value = totalSum;
            }

        }



    });
});