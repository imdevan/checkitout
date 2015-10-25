var inventory = {
        "038000219740": {
            name: "Froot Loops",
            cost: 3.49,
            img: "http://www.naturalnews.com/images/FrootLoops.jpg"
        },
      "611269101713": {
          name: "Red Bull - Sugar Free",
          cost: 3.49,
          img: "https://www.7-eleven.com/Content/Catalog/225_red_bull_sugarfree_12_oz.png"
      },
      "038000635502": {
            name: "Kellogs Special K Original Toasted Rice Cereal",
            cost: 3.25,
            img: "http://www.staples-3p.com/s7/is/image/Staples/s0966808_sc7?$splssku$"
        },
      "03400704": {
            name: "Ice Breakers Mints Coolmint",
            cost: 2.35,
            img: "http://www.hersheys.com/icebreakers/images/icebreakers/products/icebreakers_mints_Coolmint.png"
        },
      "602652170041": {
            name: "Kind Fruit & Nut Delight",
            cost: 1.59,
            img: "http://i5.walmartimages.com/dfw/dce07b8c-370a/k2-_8a78b686-91a8-4425-aa40-9655999d40ef.v1.jpg"
        },
      "722252100900": {
            name: "Clif Bar Chocolate Chip",
            cost: 2.79,
            img: "http://www.tennisexpress.com/prodimages/35095-DEFAULT-L.jpg"
        },
      "04913207": {
            name: "Sprite 12 oz",
            cost: .99,
            img: "http://ecx.images-amazon.com/images/I/5199MaubmZL.jpg"
        },
      "04963406": {
            name: "Coca Cola 12 oz",
            cost: .99,
            img: "http://www.givesomethingback.com/Themes/Theme78/gsbproducts/400/GSBCOKE.jpg"
        },
      "038000219344": {
            name: "Kellogs Rice Krispies Toasted Rice Cereal .88 oz",
            cost: 1.09,
            img: "http://img.zanda.com/item/24050740000012/1024x768/Kelloggs_Rice_Krispies_Toasted_Rice_Cereal.jpg"
        },
      "01600011945": {
            name: "General Mills Cheerios 5/8 oz",
            cost: 1.09,
            img: "http://153.13.148.54/~/media/Images/Product/ProductDetail/Cereals/Singlepak/General-Mills-Singlepak-Cereal/11945000-Cheerios-2.ashx"
        },
      "070470459165": {
            name: "Yoplait Greek Yogurt - Friends in the Fight",
            cost: 1.59,
            img: "http://www.yoplait.com/~/media/Images/YoPlait/Flavor%20Images/Carousal/Yoplait_Greek_New/greek_blended_blueberry_new.ashx"
        },
      "079117106066": {
            name: "Anderson Dairy Vitamin D Milk Half Pint",
            cost: .99,
            img: "http://guideimg.alibaba.com/images/shop/102/01/26/0/anderson-dairy-vitamin-d-milk-1-pt_2723250.jpg"
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
        var num = this.vars.confirmQuantity * this.vars.confirmItemCost;
        this.vars.confirmCost.text(
            parseFloat(Math.round(num * 100) / 100).toFixed(2)
        );
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
        var numutil = inventory[this.vars.confirmCode].cost * this.vars.confirmQuantity;
        var num = parseFloat(Math.round(numutil * 100) / 100).toFixed(2);
        cart[this.vars.confirmCode] = {
            item: inventory[this.vars.confirmCode],
            quantity: this.vars.confirmQuantity,
            totalCost: num
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
        var num = parseFloat(Math.round(item.cost * 100) / 100).toFixed(2);
        this.vars.confirmItemCost = item.cost;
        this.vars.confirmName.text(item.name);
        this.vars.confirmCost.text(num);
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
    var num = parseFloat(Math.round(item.totalCost * 100) / 100).toFixed(2);
    var elm = '<div class="cart-page--item">' +
            '<div class="cart-page--item-name">' +
                item.item.name +
            '</div>' +
            '<div class="cart-page--item-count">' +
                item.quantity +
            '</div>' +
            '<div class="cart-page--item-cost">' +
                num +
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
      url: "http://127.0.0.1:8000/checkitout/api/processTransaction",
      data: cart,
      success: ajaxSuccess(),
      dataType: "json"
    });
    cartPage.close();
    return false;
});

console.log("com page", confirmationPage);
