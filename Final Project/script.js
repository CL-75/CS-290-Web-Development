var pictures = 0;
carousel();
function carousel()    //Code from w3schools.com
{
	var y = document.getElementsByClassName("CarouselPics");

	  for(var x=0; x < y.length; x++)
	  	y[x].style.display = "none";

	  pictures++;

	   if(pictures > y.length)
	   	pictures = 1;

	   y[pictures-1].style.display = "block";
	   setTimeout(carousel, 4000);
}
