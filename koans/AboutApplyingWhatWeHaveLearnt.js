var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var noNuts = function(x) {return x.containsNuts === false};
      var noMushrooms = function(x) {return x != "mushrooms"};

      var noNutsAndMushrooms = function(x) {return (x.containsNuts === false) && _(x.ingredients).all(noMushrooms)};
      
      productsICanEat = _(products).filter(noNutsAndMushrooms);
      
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    /* try chaining range() and reduce() 
    var sum
    made a version below that uses more than just range and reduce
    returning to work on this more
    */

    var rangeByThrees = _.range(0, 1000, 3);
    var rangeByFives = _.range(0, 1000, 5);
    var ranges = _.union(rangeByThrees, rangeByFives).sort(function(a, b) {return a - b});
    var sum = _.reduce(ranges, function(memo, num) {return memo + num}, 0);
    
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = {};

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 }
    var getIngredients = function(product) {return product.ingredients};
    var ingredientBuilder = function(counter, next) {counter[next] = (counter[next] || 0) + 1; return counter;};
    //chain() together map(), flatten() and reduce() 
    var ingredientCount = _(products).chain()
            .map(getIngredients)
            .flatten()
            .reduce(ingredientBuilder, {})
            .value();

    /*
    //without the chaining
    var getIngredients = function(product) {return product.ingredients};
    var ingredientsArrays = _.map(products, getIngredients);
    var ingredients = _.flatten(ingredientsArrays);
    var ingredientBuilder = function(counter, next) {counter[next] = (counter[next] || 0) + 1; return counter;};
    var ingredientCount = _.reduce(ingredients, ingredientBuilder, {});
    */
    
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {
    expect(undefined).toBe(1);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    expect(undefined).toBe(1);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      //returns 232792560
      //skips over checking 1-10 because anything divisible by those digits
      //must also be divisible by those in 10-20
      var divisibilityChecker = function() {
      var target = 11;
      var isDivisible = false;
      while(!isDivisible) {
        if(!(target % 20 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 19 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 18 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 17 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 16 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 15 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 14 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 13 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 12 === 0)) {
          target += 11;
          continue;
        }
        if(!(target % 11 === 0)) {
          target += 11;
          continue;
        }
        isDivisible = true;
      }
      return target;
    }
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sumOfSquares = function(num1, num2) {
      return (num1 * num1) + (num2 * num2);
    };
    var squareOfSums = function(num1, num2) {
      var sum = num1 + num2;
      return sum * sum;
    };
    var difference = function(num1, num2) {
      return num1 - num2;
    };
    var squares = sumOfSquares(2, 2);
    var sums = squareOfSums(2, 2);

    expect(difference(sums, squares)).toBe(8);
  });

  it("should find the 10001st prime", function () {
    expect(undefined).toBe(1);
  });
  
});
