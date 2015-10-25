var inventory = {
        "038000219740": {
            name: "Froot Loops",
            cost: 3.49,
            img: "http://www.naturalnews.com/images/FrootLoops.jpg"
        },
        "default": {
            name: "No Item Selected",
            cost: "N/A",
            img: "../img/checkitout.svg"
        }
    },
    cart = {};


var self, confirmationPage = {
    vars: {
        confirmName: $(".confirmation-page--item-name"),
        confirmCost: $(".item-cost--value"),
        confirmCount: $(".item-count--value"),
        confirmImg: $(".confirmation-page--item-image"),
        confirmPage: $(".confirmation-page"),
        confirmCode: 0,
        confirmItemCost: 0,
        confirmQuantity: 1
    },
    update: function () {
        $(".item-count--value").text(this.vars.confirmQuantity);
        this.vars.confirmCost.text(this.vars.confirmQuantity * this.vars.confirmItemCost);
    },
    increaseQuantity: function (count) {
        this.vars.confirmQuantity = this.vars.confirmQuantity + count;
        this.update();
    },
    decreaseQuantity: function (count) {
        this.vars.confirmQuantity = this.vars.confirmQuantity - count;
        this.update();
    },
    open: function (code) {
        console.log("code", code);
        if(inventory[code]) {
            this.vars.confirmCode = code;
            this.set(inventory[code]);
        } else {
            this.set(inventory["default"]);
        }
        this.vars.confirmPage.addClass("open");
    }, 
    init: function () {
        this.set(inventory["default"]);
        self = this.vars;
    },
    confirm: function () {
        console.log(inventory[this.vars.confirmCode], parseInt(this.vars.confirmQuantity));

        cart[this.vars.confirmCode] = {
            item: inventory[this.vars.confirmCode],
            quantity: this.vars.confirmQuantity, 
            totalCost: parseInt(inventory[this.vars.confirmCode].cost) * parseInt(this.vars.confirmQuantity)
        };
        var message = this.vars.confirmQuantity + " " + 
            cart[this.vars.confirmCode].item.name + " added to cart!"
        mrToast.show(message);
    },
    close: function () {
        this.vars.confirmPage.removeClass("open");
    },
    set: function (item) {
        var bgurl = 'url(' + item.img + ')';
        this.vars.confirmItemCost = item.cost;
        this.vars.confirmName.text(item.name);
        this.vars.confirmCost.text(item.cost);
        this.vars.confirmCount.text(item.quantity);
        this.vars.confirmImg.css('background-image', bgurl);
    }
};
confirmationPage.init();

var mrToast = { 
    toastBox: $('.mr-toast'),
    textBox: $('.mr-toast--message'),
    show: function (message) {
        this.textBox.html(message);
        this.toastBox.addClass("open");
        setTimeout(function () { 
            mrToast.toastBox.removeClass('open');
        }, 2000);

        setTimeout(function () { 
            if($('.confirmation-page').hasClass('open')) {
                confirmationPage.close();
            }
            if($('.cart-page').hasClass('open')) {
                cartPage.close();
            }
        }, 2170);
        
    }
};

var addToSelector = function (item) {
    var elm = '<div class="cart-page--item">' +
            '<div class="cart-page--item-name">' +
                item.item.name + 
            '</div>' +
            '<div class="cart-page--item-count">' +
                item.quantity +
            '</div>' +
            '<div class="cart-page--item-cost">' +
                item.totalCost +
            '</div>' +
        '</div>';
        elm = $.parseHTML( elm )[0];
        cartPage.list.append(elm);
}

var cartPage = { 
    page: $('.cart-page'),
    list: $(".cart-page--item-list"),
    totalCost: 0,
    show: function () {
        for(var key in cart) {
            console.log( cart[key].totalCost);
            this.totalCost = this.totalCost + cart[key].totalCost;
            addToSelector(cart[key]);
        }
        this.page.addClass("open");
    },
    close: function () {
        this.totalCost = 0;
        this.list.html("");
        this.page.removeClass("open");
    }
};

var ajaxSuccess = function () {
    var message = $.parseHTML( "<p>Purchase Complete!</p> <p>Your total is $" + cartPage.totalCost +"</p>");

    cart = {};
    cartPage.totalCost = 0;
    mrToast.show(message)
}
// Confirm page
// ========================================================
$(document).on('click touchstart', ".confirmation-page--up-arrow button", function () {
    confirmationPage.increaseQuantity(1);
    return false;
});
$(document).on('click touchstart', ".confirmation-page--down-arrow button", function () {
    confirmationPage.decreaseQuantity(1);
    return false;
});
$(document).on('click touchstart', ".confirmation-page--cancel-button button", function () {
    confirmationPage.close();
    return false;
});
$(document).on('click touchstart', ".confirmation-page--confirm-button button", function () {
    confirmationPage.confirm();
    return false;
});

// Camera page
// ========================================================
$(document).on('click touchstart', ".camera-page--cart-button button", function () {
    cartPage.show();
    return false;
});

// Cart page
// ========================================================
$(document).on('click touchstart', ".cart-page--cancel-button button", function () {
    cartPage.close();
    return false;
});
$(document).on('click touchstart', ".cart-page--confirm-button button", function () {
    $.ajax({
      type: "POST",
      url: "https://104.131.64.46/checkitout",
      data: cart,
      success: ajaxSuccess(),
      dataType: "json"
    });
    cartPage.close();
    return false;
});

console.log("com page", confirmationPage);