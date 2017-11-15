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
	
	
	
	addItemToCart(name, price, count);
	displayCart();
});

$("#clear-cart").click(function(event){
	clearCart();
	displayCart();
});

function displayCart() {
	var cartArray = listCart();
	var output = "";
	for (var i in cartArray) {
		output += "<li>"+cartArray[i].name+" "+"<span>"+cartArray[i].count+"</span>"+"</li>";
	}
	$("#show-cart").html(output);
	$("#total-cart").html(totalCart());
};

/***************************************/
// Shopping cart functions
/* Scope - Determins where a variable or a value is visible */ 

var cart = [];
//when you use the sintax below, it actually generates an object

var Item = function(name, price, count) {
	this.name = name
	this.price = price
	this.count = count
};

/*
// new item for shopping cart
var apple = new Item("Apple", 1.99, 1); // {name, price, count}

cart.push(new Item("Brush", 2.13, 1));
cart.push(apple);*/

// addItemToCart(name, price, count)

function addItemToCart(name, price, count) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].count += count;
			saveCart();
			return;
		}
	}
	var item = new Item(name, price, count);
	cart.push(item);
	saveCart();
};

// removeItemFromCart(name) // Removes one item

function removeItemFromCart(name) {
	for (var i in  cart) {
		if (cart[i].name === name) {
			cart[i].count --;
			if (cart[i].count === 0) {
				cart.splice(i, 1); //it removes "1" item from the array
			}
			return;
		}
	}
	saveCart();
}

// removeItemFromCartAll(name) //Removes all items with name

function removeItemFromCartAll(name) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart.splice(i, 1);
			break;
		}
	}
	saveCart();
}


//clearCart()

function clearCart() {
	cart = [];
	saveCart();
}

//countCart() -> Returns total count

function countCart() {
	var totalCount = 0;
	for (var i in cart){
		totalCount += cart[i].count;
	}
	return totalCount;
}

//totalCart() -> Returns the total cost

function totalCart() {
	var totalCost = 0;
	for (var i in cart) {
		totalCost += cart[i].price * cart[i].count;
	}
	return totalCost;
}

//listCart() -> an array of items

function listCart() {
	/*return cart.slice(); -> here, the slice property makes a copy of the array; but still reference the objects inside*/
	var cartCopy = [];
	for (var i in cart) {
		var item = cart[i];
		var itemCopy = {};
		for (var p in item) {
			itemCopy[p] = item[p];
		}
		cartCopy.push(itemCopy);
	}
	return cartCopy;
}

//saveCart() -> Local

function saveCart() {
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

//loadCart() -> loads the cart when page is opened

function loadCart() {
	cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();
displayCart();



