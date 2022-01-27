/* Name: Casey Levy
 * Date: 7/9/19
 * Description: Using high-order functons to sort automobiles by make, model, etc. */

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    var temp = array;
     do
     {
        swapped = false;
         for(var x=0; x<array.length-1; x++)
         {
            if(comparator(temp[x], temp[x+1]))
            {
                var temp2 = temp[x];
                temp[x] = temp[x+1];
                temp[x+1] = temp2;
                swapped = true;
            }
         }
     }

     while(swapped);

     return temp;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if(auto1.year < auto2.year)
        return true;

    else if(auto1.year <= auto2.year)
     return false;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later (from A-Z).*/
function makeComparator( auto1, auto2){
    if(auto1.make.toUpperCase() > auto2.make.toUpperCase())
        return true;

    else if(auto1.make.toUpperCase() <= auto2.make.toUpperCase())
        return false;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    var temp = function(auto)
    {
        switch(auto.type.toLowerCase())
        {
            case "roadster":
            return 1;

            case "pickup":
            return 2;

            case "suv":
            return 3;

            case "wagon":
            return 4;

            case "sedan":
            return 5;

            default:
            return 6;
        }
    }

   if(temp(auto1) < temp(auto2))
    return true;

   else if(temp(auto1) == temp(auto2))
    return yearComparator(auto1, auto2);

    else
      return false;
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged. */

Automobile.prototype.logMe = function(bool)
{
    if(bool == true)
        console.log(this.year + ' ' + this.make + ' ' + this.model + ' ' + this.type);

    else
      console.log(this.year + ' ' + this.make + ' ' + this.model + ' ');
}


function showArr(array, bool)
{
    for(var x=0; x<array.length; x++)
        array[x].logMe(bool);
}

console.log("*****");
console.log("The cars sorted by year are:");
showArr(sortArr(yearComparator, automobiles), false);

console.log("The cars sorted by make are:");
showArr(sortArr(makeComparator, automobiles), false);

console.log("The cars sorted by type are:");
showArr(sortArr(typeComparator, automobiles), false);
console.log("*****");
