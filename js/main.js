var inventory = {
        "611269101713": {
            name: "Red Bull - Sugar Free",
            cost: 3.49,
            img: "https://www.7-eleven.com/Content/Catalog/225_red_bull_sugarfree_12_oz.png"
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
        confirmQuantity: 0
    },
    open: function (code) {
        console.log("code", code);
        if(inventory[code]) {
            this.set(inventory[code]);
            this.vars.confirmCode = code;
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
        this.vars.confirmQuantity = 1;
        cart[this.vars.confirmCode] = {
            item: inventory[this.vars.confirmCode],
            quantity: this.vars.confirmQuantity, 
            totalCost: inventory[this.vars.confirmCode] * this.vars.confirmQuantity
        };
        mrToast.show("1 item added to cart!");
    },
    close: function () {
        this.vars.confirmPage.removeClass("open");
    },
    set: function (item) {
        var bgurl = 'url(' + item.img + ')';
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
        this.textBox.text(message);
        this.toastBox.addClass("open");
        setTimeout(function () { 
            mrToast.toastBox.removeClass('open');
            confirmationPage.close();
        }, 2000);
        
    }
};

$(document).on('click touchstart', ".confirmation-page--cancel-button button", function () {
    confirmationPage.close();
    return false;
});
$(document).on('click touchstart', ".camera-page--cart-button button", function () {
    confirmationPage.open("default");
    return false;
});
$(document).on('click touchstart', ".confirmation-page--confirm-button button", function () {
    confirmationPage.confirm();
    return false;
});

console.log("com page", confirmationPage);