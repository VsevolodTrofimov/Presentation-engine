//page transition effects (s+position of slide being shown now)
var slides = {
	//slide shown on presentation launch
	s0 : {
		//slide change effect ( when changing to next slide in initiated)
		transition : "fadeToTop",
	},
	s1 : {
		transition : "slideUp",
		//things to change on slide before transition begins
		beforeSwitch: function (){
			$("#screen-size-sample-panel-1").hide();
			$("#screen-size-sample-panel-2").hide();
		},
		// in-slide action like appending or change of something
		actions: {
			a1 : function() {
				$("#screen-size-sample-panel-1").fadeIn(200);
			},
			a2 : function() {
				$("#screen-size-sample-panel-2").fadeIn(200);
			}
		}
	},
};

$(document).ready(function() {
		$(document).keyup(function(event) {
			var key = event.which;

			if(key == 39) {
				nextPage();
			}

			if(key == 37) {
				previousPage();
			}
			if(key == 69) {
				slideAction();
			}
			
		});
	});

/* Effect list
Sliding (simple)
	-Command : slide+Direction
	-Directions : Left, Right, Up, Down
	-Example : slideLeft

Sliding (different easing)
	-Command : ease+Direction
	-Directions : Left, Right, Up, Down
	-Example : easeLeft

----------

Fade (fading slide is static)
	-Command : fadeFrom+Direction
	-Directions : Left, Right, Top, Bottom
	-Example : fadeFromLeft


Fade (fading slide moves)
	-Command : fadeTo+Direction
	-Directions : Left, Right, Top, Bottom
	-Example : fadeToLeft

----------

Scale Down (1 scales down, 2 slide slides from aside)
	-Command : scaleFrom+Direction
	-Directions : Left, Right, Top, Bottom
	-Example : scaleFromLeft 


Scale Down Switch (1 scales down, 2 slide does the same)
	-Command : scaleIn


Scale Up Switch (1 scales up, 2 slide does the same)
	-Command : scaleOut


Scale Up (1 slides away, 2 slide scales uo)
	-Command : openTo+Direction
	-Directions : Left, Right, Top, Bottom
	-Example : openToLeft


Scale Switch (1 sldie scales down, 2 slides scales up, at 1 moment they switch)
	-Command : scaleSwitch

----------

Glue ( 1 slide assymetrycally scales down, second slides In)
	-Command : glueTo+Direction
	-Directions : Left, Right, Top, Bottom
	-Example : glueToLeft

----------

Flip ( slide rotates by 180deg ) 
	-Command : flip+Direction
	-Directions : Left, Right, Up, Down
	-Example : flipLeft

----------

Fall ( slide falls realisticly )
	-Command : fall

----------

Newspaper ( that crazy oldschool event )
	-Command : newspaper

----------

Push ( 1 page "pushes" another, it's 3D effect )
	-Command : pushTo+Direction
	-Directions : Left, Right, Top, Bottom
	-Example :  pushToLeft

Push & Pull ( imagine window which is opend from 1 side and closed from another )
	-Command : push/pullFrom+Direction
	-Directions : Left, Right, Top, Bottom
	-Example :  push/pullFromLeft

----------

Fold ( like making paper half it's size )
	-Command : fold+Direction
	-Directions : Left, Right, Up, Dowm
	-Example :  foldLeft


Unfold ( reverse of fold )
	-Command : unfold+Direction
	-Directions : Left, Right, Up, Dowm
	-Example :  funoldLeft

----------

Room ( 3d cube rotate transition from inside, slides are on sides of cube )
	-Command : roomRotate+Direction
	-Directions : Left, Right, Up, Dowm
	-Example :  roomRotateLeft


Cube ( 3d cube rotate transition from outside, slides are on sides of cube )
	-Command : cubeRotate+Direction
	-Directions : Left, Right, Up, Dowm
	-Example :  cubeRotateLeft


Carousel ( 3d cube rotate transition from inside, slides are on sides of cube , sides are not connected )
	-Command : carouselRotate+Direction
	-Directions : Left, Right, Up, Dowm
	-Example :  carouselRotateLeft

----------

Slides ( just like you do it with real sheets of paper using your arms )
	-Command : slidesRotate

----------

Gallery ( compound of Scale Down & Silde effects )
	-Command : gallery
*/
	