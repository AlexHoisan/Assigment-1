/* Mobile nav */

$('.js--nav-icon').click(function(){
    var nav = $('.js--main-nav');
    var icon = $('.js--nav-icon i');
        
    nav.toggleClass('showNav');
    if (icon.hasClass('ion-navicon-round')) {
        icon.addClass('ion-close-round');
        icon.removeClass('ion-navicon-round');
    } else {
        icon.addClass('ion-navicon-round');
        icon.removeClass('ion-close-round');
    }
        
});

/* Shopping Cart */



$(".add-to-cart").click(function(event){
	event.preventDefault();
	var name = $(this).attr("data-name");
	var price = Number($(this).attr("data-price"));
	var a = document.getElementById("order-quantity");
	var count = parseFloat(a.options[a.selectedIndex].text);
	
	
	
	shoppingCart.addItemToCart(name, price, count);
	displayCart();
});

$("#clear-cart").click(function(event){
	shoppingCart.clearCart();
	displayCart();
});

function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = "";
	var position = 1;
	for (var i in cartArray) {
		output += `
				  <tr>
					<td>
					  <button class='delete-item' data-name='"+cartArray[i].name+"'>X</button>
					  <p>${position}</p>
					</td>
					<td>
					  ${cartArray[i].name}
					</td>
					<td>
					  <span>${cartArray[i].count}</span>
					  <div class='add-remove-buttons'>
						<button class='plus-item' data-name='${cartArray[i].name}'>+</button>
						<button class='substract-item' data-name='${cartArray[i].name}'> - </button>
					  </div>
					</td>
					<td>
					  ${cartArray[i].price}
					</td>
					<td>
					  ${cartArray[i].total}
					</td>
				  </tr>
				`
		
		position ++;
	}
	$("#show-cart").html(output);
	$("#count-cart").html(shoppingCart.countCart())
	$("#total-cart").html(shoppingCart.totalCart());
}

$("#show-cart").on("click", ".delete-item", function(event) {
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCartAll(name);
	displayCart();
});

$("#show-cart").on("click", ".plus-item", function(event) {
	var name = $(this).attr("data-name");
	shoppingCart.addItemToCart(name, 0, 1);
	displayCart();
});

$("#show-cart").on("click", ".substract-item", function(event) {
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCart(name);
	displayCart();
});



/***************************************/
// Shopping cart functions

var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function(name, price, count) {
	this.name = name
	this.price = price
	this.count = count
};

shoppingCart.addItemToCart = function(name, price, count) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count += count;
			this.saveCart();
			return;
		}
	}
	var item = new this.Item(name, price, count);
	this.cart.push(item);
	this.saveCart();
};

shoppingCart.removeItemFromCart = function(name) {
	for (var i in  this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count --;
			if (this.cart[i].count == 0) {
				this.cart.splice(i, 1); 
			}
			break;
		}
	}
	this.saveCart();
};

shoppingCart.removeItemFromCartAll = function(name) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart.splice(i, 1);
			break;
		}
	}
	this.saveCart();
};

shoppingCart.clearCart = function() {
	this.cart = [];
	this.saveCart();
};

shoppingCart.countCart = function() {
	var totalCount = 0;
	for (var i in this.cart){
		totalCount += this.cart[i].count;
	}
	return totalCount;
};

shoppingCart.totalCart = function() {
	var totalCost = 0;
	for (var i in this.cart) {
		totalCost += this.cart[i].price * this.cart[i].count;
	}
	return totalCost.toFixed(2);
};

shoppingCart.listCart = function() {
	var cartCopy = [];
	for (var i in this.cart) {
		var item = this.cart[i];
		var itemCopy = {};
		for (var p in item) {
			itemCopy[p] = item[p];
		}
		itemCopy.total = (item.price * item.count).toFixed(2);
		cartCopy.push(itemCopy);
	}
	return cartCopy;
};

shoppingCart.saveCart = function() {
	localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
};

shoppingCart.loadCart = function() {
	this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
};

shoppingCart.loadCart();
displayCart();






