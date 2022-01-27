//Some code shared from medium.com

function deepEqual(x,y){
	if (x === y)
		return true;

	if(x == null || typeof x != "object" || y == null || typeof y != "object")
		return false;

	var propX = 0;
	var propY = 0;

	 for(var prop in x)
	 	propX += 1;

	  for(var prop in y){
	  	propY += 1;

	  	 if(!(prop in x) || !deepEqual(x[prop], y[prop]))
	  	 	return false;
	  }

 return propX == propY;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
//  true
console.log(deepEqual(obj, {here: 1, object: 2}));
//  false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
//  true