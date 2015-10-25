var inventory = {
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
