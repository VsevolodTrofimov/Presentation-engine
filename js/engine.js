var nextPage, previousPage;


var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.slide' ),
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

	}



	nextPage = function(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		if(options.showPage){
			if( options.showPage < pagesCount - 1 ) {
				current = options.showPage;
			} else {
				current = 0;
			}
		} else{
			if( current < pagesCount - 1 ) {
				++current;
			}
			else {
				current = 0;
			}
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';
			inClass = anmiationEffect( animation ).inClass;
			outClass = anmiationEffect( animation ).outClass;
			
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	previousPage = function(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		if( options.showPage ){
			if( options.showPage < pagesCount - 1 ) {
				current = options.showPage;
			} else {
				current = 0;
			}
		} else{
			if( current > 0) {
				--current;
			}
			else {
				current = $pages.length-1;
			}
		}
		animation = reverseEffect( animation );
		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';
			inClass = anmiationEffect( animation ).inClass;
			outClass = anmiationEffect( animation ).outClass;
		

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}


	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};




	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	function reverseEffect( animation ){
		if( animation.substring(0,4) == "open" ) {
			animation = "scaleFrom" + animation.substring(6);
		} else if( animation.substring(0,9) == "scaleFrom" ){
			animation = "openTo" + animation.substring(9);
		} else if (  animation == "scaleIn" ){
			animation = "scaleOut";
		} else if (  animation == "scaleOut" ){
			animation = "scaleIn";
		} else if (  animation == "scaleSwitch" ){
			animation = "scaleSwitch";
		} else{
			if( animation.substring(animation.length-2)=="Up" ){
				animation = animation.substring(0,animation.length-2)+"Down";
			} else if( animation.substring(animation.length-4)=="Down" ){
				animation = animation.substring(0,animation.length-4)+"Up";
			} else if( animation.substring(animation.length-3)=="Top" ){
				animation = animation.substring(0,animation.length-3)+"Bottom";
			} else if( animation.substring(animation.length-6)=="Bottom" ){
				animation = animation.substring(0,animation.length-6)+"Top";
			} else if( animation.substring(animation.length-4)=="Left" ){
				animation = animation.substring(0,animation.length-4)+"Right";
			} else if( animation.substring(animation.length-5)=="Right" ){
				animation = animation.substring(0,animation.length-5)+"Left";
			}
		}
		return animation;
	}

	function anmiationEffect( name ){
		var outClass,
			inClass;
		switch( name ) {

			case "slideLeft":
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case "slideRight":
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case "slideUp":
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case "slideDown":
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case "fadeFromRight":
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case "fadeFromLeft":
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case "fadeFromBottom":
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case "fadeFromTop":
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case "fadeToLeft":
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case "fadeToRight":
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case "fadeToTop":
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case "fadeToBottom":
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case "easeLeft":
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case "easeRight":
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case "easeUp":
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case "easeDown":
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case "scaleFromRight":
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case "scaleFromLeft":
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case "scaleFromBottom":
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case "scaleFromTop":
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case "scaleIn":
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case "scaleOut":
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case "openToLeft":
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case "openToRight":
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case "openToTop":
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case "openToBottom":
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case "scaleSwitch":
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case "glueToLeft":
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case "glueToRight":
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case "glueToTop":
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case "glueToBottom":
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case "flipRight":
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case "flipLeft":
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case "flipUp":
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case "flipDown":
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case "fall":
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case "newspaper":
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case "pushToLeft":
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case "pushToRight":
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case "pushToTop":
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case "pushToBottom":
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case "push/pullFromRight":
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case "push/pullFromLeft":
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case "push/pullFromBottom":
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case "push/pullFromTop":
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case "foldLeft":
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case "foldRight":
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case "foldUp":
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case "foldDown":
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case "unfoldRight":
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case "unfoldLeft":
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case "unfoldDown":
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case "unfoldUp":
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case "roomRotateLeft":
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case "roomRotateRight":
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case "roomRotateUp":
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case "roomRotateDown":
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case "cubeRotateLeft":
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case "cubeRotateRight":
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case "cubeRotateUp":
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case "cubeRotateDown":
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case "carouselRotateLeft":
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case "carouselRotateRight":
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case "carouselRotateUp":
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case "carouselRotateDown":
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case "slidesRotate":
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case "gallery":
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}
		return {outClass: outClass, inClass: inClass};
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};

})();
