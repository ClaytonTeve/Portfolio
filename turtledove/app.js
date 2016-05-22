//Colors are stored in a global variable to be used while ordering a custom bird.

var mainBodyColor = $('.mainBodyColor').val('background-color');
var wingsColor = $('.wingsColor').val('background-color');
var innerWingColor = $('.innerWingColor').val('background-color');
var mainThreadColor = $('.mainThreadColor').val('background-color');
var secondaryThreadColor = $('.secondaryThreadColor').val('background-color');
var accentThreadColor = $('.accentThreadColor').val('background-color');



$(document).ready(function(){
	//Hides the modal-dialog form when the page loads.
	$("#dialog").dialog({
						modal: true,
						autoOpen: false,
						width: $(window).width() > 450 ? 450 : $(window).width(),
						maxWidth: 450,
						title: 'Your Turtle Dove Order'
					});
	//Build up the unselectable order button.
	$('.order-button h1').text('Pick your six colors.')
	$('.order-button').css('display', 'inline');
	$('.order-button').animate({ opacity: 0 }, 0);
	$('.order-button').animate({ opacity: .35, bottom: "+120px" }, 2000);
	
	//Activate the order button. It opens the dialog for the user to submit their contact information.
	$(document).click(function(){
		//Are all of the color boxes selected?
		if ($('li.selected').length === 6) {
			$('.order-button h1').text('Order your custom bird!');
			$('.order-button').fadeTo(1200, 1);
			$('.order-button').addClass('active-button');
			//Code to open the dialog form.
			$(document).ready(function(){
	
				$(function() {
					$(".order-button").on("click", function() {
						$("#dialog").dialog("open");
					});
				});

				//validating Form Fields.....
				$("#submit").click(function(e){

				var email = $("#email").val();
				var name = $("#name").val();
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if( email ==='' || name ==='')
			       {
					 alert("Please fill all fields...!!!!!!");
					 e.preventDefault();
			       }
			    else if(!(email).match(emailReg))
			       {
			         alert("Invalid Email...!!!!!!");
					 e.preventDefault();
			       }    
				else 
				   {
			         alert("Form Submitted Successfully......");
			         $("#dialog").dialog("close");
				   }
				
				});
					
			});
		};
	});
});



//This code was modifed from a simular problem being solved here: http://jsfiddle.net/PvE3P/42/
$(window).resize(function() {
        myDialog.dialog( "option", "position", 'center' );
        if($(window).width() < 450){
            var width = myDialog.dialog( "option", "width" );
            myDialog.dialog( "option", "width", $(window).width() );
	};
});


///////////////////////////////////////////////////////
//Make arrays of colors for the felt and thread colors. 
///////////////////////////////////////////////////////

var feltColors = [
'#4f2682', //Purple
'#027248', //Teal
'#008b5a', //Sea Green
'#8abe40', //Light Green
'#23398e', //Dark Blue
'#018ca9', //Light Blue
'#4aa943', //Green
'#fde102', //Yellow
'#f19120', //Light Orange
'#ea5924', //Orange
'#c72748', //Red
'#e50771', //Pink
'#edbab9', //Light Pink
'#ce9e7a', //Tan
'#f0dac2', //Light Tan
'#3a2426', //Dark Brown
'#262223', //Black
'#9ea3a9', //Grey
'#ffffff', //White
'#3e476c' //Blue Grey

]
var threadColors = [
'#05356E', //Flat Blue
'#092AB5', //Blue
'#0CDDE8', //Light Blue 
'#0DB4FF', //Cyan Blue
'#00FFC4', //Teal
'#0CE877', //Sea Green
'#336E05', //Dark Green
'#009E21', //True Green
'#0DFF3E', //Bright Green
'#8AFF0D', //Yellow Green
'#FFEF00', //Bright Yellow
'#CF9B0A', //Golden Yellow
'#E86A0C', //Pumpkin
'#FF4800', //Dark Orange
'#E82A0C', //Red Orange
'#CF0A10', //Deep Red
'#E5007A', //Pinkish Purple
'#33056E', //Dark Purple
'#ffffff', //White
'#212121', //Black
'#888888', //Grey
'#444444', //Light Grey
'#ce9e7a', //Tan
'#f0dac2' //Light Tan
]

//this function add the colors to the color-picker boxes
function propColors ( list , location ) {
  for (var i = 1; i <= list.length; i += 1) {
  	//Add a list item for each color in stock.
   $("<li></li>").appendTo(location);
   //Change background color of list items added to color in stock.
   $(location +' li:nth-child('+i+')').css('background-color', list[i-1])
	};
};

//Adds the felt colors used for the birds body to the document.
$(document).ready(propColors(feltColors,".bird-body ul"));

//Adds the thread colors used for the birds body to the document.
$(document).ready(propColors(threadColors, ".thread ul"))




////////////////////////////////////////////////////////////
//Changes which color is selected on each part of the bird
//by adding the selected class to the list item clicked.
////////////////////////////////////////////////////////////


function activateElement (element){
	//Remove class "selected" from sibling elements
	$(element).siblings().removeClass("selected");
	//Add class "selected" to clicked element
	$(element).addClass("selected");

}

//Main Body Color
$(".main-body-select li").click(function(){
	activateElement(this);
	mainBodyColor = $(this).css("background-color");
	//Changes fill color of the main-body class in the SVG of the bird.
	$(".main-body").css("fill", mainBodyColor);
});

//Wings Color
$(".wings-select li").click(function(){
	activateElement(this);
	//store color here
	wingsColor = $(this).css("background-color");

	$(".wings").css("fill", wingsColor);
});

//Inner Wing Color
$(".inner-wing-select li").click(function(){
	activateElement(this);
	//store color here
	innerWingColor = $(this).css("background-color");

	$(".inner-wing").css("fill", innerWingColor);
});

//Main Thread Color
$(".main-thread-select li").click(function(){
activateElement(this);
	//store color here
	mainThreadColor = $(this).css("background-color");

	$(".detail").css("fill", mainThreadColor);
});

//Secondary Thread Color
$(".secondary-thread-select li").click(function(){
	activateElement(this);
	//store color here
	secondaryThreadColor = $(this).css("background-color");

	$(".secondary-color").css("fill", secondaryThreadColor);
});

//Accent Thread Color
$(".accent-thread-select li").click(function(){
	activateElement(this);
	//store color here
	accentThreadColor = $(this).css("background-color");

	$(".primary-color").css("fill", accentThreadColor);
});




