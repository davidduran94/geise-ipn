$(function(){
	$('input[type="text"],input[type="password"]').addClass('inp-txt');
	$('input[type="button"], input[type="submit"], input[type="reset"], button').addClass('inp-btn');
	$('.inp-btn').each(function(){$(this).attr('title',$(this).val());});
	
    $("a").each(function() {
        if (!$(this).attr("title")) {
            $(this).attr("title", $(this).text().replace(/<[^>]+>/ig, " "));
	    }
	});
	
	$('h2 a, #nav-breadcrumbs li.back-to-sector').append('<b />');
	$('.company-details').append('<em />');
	$('footer article:last').css({paddingRight:0,width:180,border:0});
	$('#sh-structure-link').append('<i />').click(function(){
		$(this).toggleClass('active');
		$('#overlay').toggle();
		return false;
	});

	truncate('show-fulltext') // link for activation

	$('#nav-overlay ul').before('<b>'+$('li.current a',this).html()+'</>');
	$('#nav-overlay a').click(function(){
		$('#nav-overlay li').removeClass('current');
		$('.overlay-i').hide();
		var currentText = $(this).html();
		var shTab = $(this).attr('href');
		$('#nav-overlay b').html(currentText);
		$(this).parent().addClass('current');
		$(shTab).show();
		return false;
	});
	$('#overlay-close').click(function(){
		$('#overlay').hide();
		$('#sh-structure-link').removeClass('active');
		return false;
	});

	//$('#nav-breadcrumbs li:last-child').addClass('last');

	$('#nav-geo a').hover(function(){
		var showSector = $(this).attr('href');
		$(showSector).show();
	},function(){
		var showSector = $(this).attr('href');
		$(showSector).hide();
	});

	$('#nav-choose-year').before('<a href="#" class="prev-btn" id="prev-year" /><a href="#" class="next-btn" id="next-year" />');
	$('#nav-choose-year li a').click(function(){
		var showYear = $(this).html();
		var showTab = $(this).attr('href');
		$('#history-tab-year').html(showYear);
		$('#nav-choose-year li').removeClass('current');
		$('.history-tab').hide();
		$(this).parent().addClass('current');
		$(showTab).show();
		return false;
	});
	
	var prSlider = $('#nav-choose-year ul');
	if ( prSlider.position() ) {
		var prSlide = $('li:not(.wide)',prSlider).width() + 1;
		var prSlideWide = $('li.wide',prSlider).width() + 1;
		var prSlideWidth = $('li:not(.wide)',prSlider).length*prSlide +  $('li.wide',prSlider).length*prSlideWide;
		var curPos = 0;
		var pos = 0;
		var offset = prSlideWidth - $('#nav-choose-year').width();
		var startPos = prSlider.position().left;
		prSlider.css('width', prSlideWidth);
		
		
		
		$('#next-year').click(function(){
			pos = $(prSlider).position();
			if((startPos - pos.left + 2) <= offset) {
				curPos = curPos + prSlide;	
				$(prSlider).animate({'left':'-'+curPos});
			}
			return false;
		});
		
		$('#prev-year').click(function(){
			pos = $(prSlider).position();
			if(pos.left < startPos) {
				curPos = curPos - prSlide;	
				$(prSlider).animate({'left':'-'+curPos});
			} 
			return false;
		});
	}
	/*$('#next-year').click(function(){
		$(prSlider).animate({'right':prSlide},0,function(){
			$('li:last',prSlider).after($('li:first',prSlider));
			$(prSlider).css('left','0');
		});
		return false;
	});
	$('#prev-year').click(function(){
		$(prSlider).animate({'left':prSlide},0,function(){
			$('li:first',prSlider).before($('li:last',prSlider));
			$(prSlider).css('left','0');
		});
		return false;
	});*/

	$('.history-tab ul li:last-child').css({border:0});
	$('cite p:last-child').css({padding:0});

	$('#choose-sector dt > a').click(function(){
		$(this).parent().toggleClass('active');
		$(this).parent().next('dd').slideToggle('fast');
		return false;
	});
	
	if (window.location.hash && $('#choose-sector dt' + window.location.hash).length) {
		$('#choose-sector dt' + window.location.hash + ' a').trigger('click');
	}

	$('#nav-social a').append('<i />');

	$('select').wrap('<div class="select" />');
	$('.select').each(function(){
		var selVal = $('option:selected',this).text();
		$(this).append('<span>'+selVal+'</span>');
		var select = $('select',this);
		$(select).change(function(){
			var parent = $(this).parent();
			$('span',parent).text();
			var selVal = $('option:selected',this).text();
			$('span',parent).text(selVal);
		});
	});

	$('#news-list-sort fieldset:first-child').css({padding:0}).find('label').css({paddingLeft:0});

	//отправка формы с фильтром в новостях
	/*if ($("form#news-list-sort").length) {
		
		$("form#news-list-sort fieldset").find('select').each(function(){
			$(this).change(function(){
				
				//для месяца отправляем форму, только если указан год
				if ($(this).attr('id') == 'news-list-sort-arc') {
					if (!($('select#news-list-sort-year').val() > 0)) {
						return false;
					}						
				}
				$("form#news-list-sort").submit();
			});
		});
	}*/
	charity();
	focusblur();
	//yearSlider();
	reportsSlider();
	if(!$('#inner-slider.type-2').length){
		philosophySlider();
	}
	fontSize();
	titleCase();
	
	//форма подписки на рассылку
	subscribe_list_change();
	$("input[type='checkbox'].subscribe_list").click(function(){
		subscribe_list_change();
	});
	
	$("input[type='checkbox'].all_companies").click(function(event){
		
		if ($(this).is(':checked')) {
			$("input[type='checkbox'].subscribe_list_company:checked").removeAttr('checked');
		}
	});
	$("input[type='checkbox'].subscribe_list_company").click(function(event){
		if ($(this).is(':checked')) {
			
			$("input[type='checkbox'].all_companies:checked").removeAttr('checked');
		}
		
	});
	///
	$(".checklist input:not(:checked)").each(function(){
		$(this).after($('<a class="checkbox-a checkbox-select" id="checkbox-a-'+$(this).attr('id')+'" href="#">&nbsp;</a>'));
	});
	$(".checklist input:checked").each(function(){
		$(this).after($('<a class="checkbox-a checkbox-deselect" id="checkbox-a-'+$(this).attr('id')+'" href="#">&nbsp;</a>'));
	});
	$(".checklist input").change(function(){
		if($(this).is(':checked')){
			$('#checkbox-a-'+$(this).attr('id')).removeClass('checkbox-select').addClass('checkbox-deselect');
		}else{
			$('#checkbox-a-'+$(this).attr('id')).addClass('checkbox-select').removeClass('checkbox-deselect');
		}
	});
	//$(".checklist input:checked").parent().addClass("selected");
	 
	$(".checklist .checkbox-a").click(function(event) {
		if($(this).is('.checkbox-select')){
			event.preventDefault();
			//$(this).parent().addClass("selected");
			$(this).parent().find(":checkbox").attr("checked","checked");
			$(this).removeClass('checkbox-select').addClass('checkbox-deselect');
			
			
		}else{
			event.preventDefault();
			//$(this).parent().removeClass("selected");
			$(this).parent().find(":checkbox").removeAttr("checked");
			$(this).addClass('checkbox-select').removeClass('checkbox-deselect');
		}
		if($(this).parent().is(':not(.all)')){
			$('li.all .checkbox-a').removeClass('checkbox-deselect').addClass('checkbox-select');
			$('li.all input').removeAttr('checked');
		}
		
		if($(this).parent().is('.all')){
			if($(this).is('.checkbox-select')) return;
			
			$('li:not(.all) .checkbox-a').removeClass('checkbox-deselect').addClass('checkbox-select');
			$('li:not(.all) input').removeAttr('checked');
			
		}
	});
	
	$(".checklist label").click(function(e){
		//var input = $('#'+$(this).attr('for'));
		$(this).parent().find(".checkbox-a").click();
		////input.click();
		//console.log(input);
		return false;
	});
	
	
	//fancybox
	$("a.fancybox").fancybox({
		'titleShow' : true,
		'titlePosition' 		: 'inside'
	});
	
	
	$('#structure-choose li a').click(function(){
		var showTab = $(this).attr('href');
		$('#structure-choose li').removeClass('current');
		$('.structure-tab').hide();
		$(this).parent().addClass('current');
		$(showTab).show();
		if(showTab == '#str') {
			$('#for_table').show();
		} else {
			$('#for_table').hide();
		}
		return false;
	});
	
	
});

function subscribe_list_change() {
	//если не отмечен ни один лист подписки, компании не активны
	if ($("input[type='checkbox'].subscribe_list").length) {
		if (!($("input[type='checkbox']:checked.subscribe_list").length > 0)) {
			$("input[type='checkbox'].subscribe_list_company").attr('disabled', true);
			$("input[type='checkbox'].all_companies").attr('disabled', true);
		}
		else {
			$("input[type='checkbox'].subscribe_list_company").attr('disabled', false);
			$("input[type='checkbox'].all_companies").attr('disabled', false);
		}
	}
}

function fontSize(){
	var fontSizes = ['8pt', '100%', '10pt'];
	var fontClasses = ['s','','l'];
	var fontSizePosition=1;
	var fontClass='';
	//console.log('cookie',$.cookie('fontSize'));
	if($.cookie('fontSize')!=null){
		fontSizePosition = $.cookie('fontSize');
		changeFontSize();
	}
	
	$('#site-font-size .site-font-s').click(function(){
		if(fontSizePosition<=0) return false;
		fontSizePosition--;
		changeFontSize();
		saveFontSize();
		return false;
	});
	
	$('#site-font-size .site-font-l').click(function(){
		if(fontSizePosition>=fontSizes.length-1) return false;
		fontSizePosition++;
		changeFontSize();
		saveFontSize();
		return false;
	});
	
	function changeFontSize(){
		for(i in fontSizes)
			$('body').removeClass('font-'+fontClasses[i]);
		
		if(fontClasses[fontSizePosition]){
			fontClass='font-'+fontClasses[fontSizePosition];
			$('body').addClass(fontClass);
		}else{
			fontClass='';
		}
		
		if(fontSizePosition==fontSizes.length-1){
			$('#site-font-size .site-font-l').fadeTo(0,.5);
		}else{
			$('#site-font-size .site-font-l').fadeTo(0,1);
		}
		if(fontSizePosition==0){
			$('#site-font-size .site-font-s').fadeTo(0,.5);
		}else{
			$('#site-font-size .site-font-s').fadeTo(0,1);
		}
	}
	
	function saveFontSize(){
		//console.log('save', fontSizePosition, fontSizes[fontSizePosition], fontClass);
		$.cookie('fontSize', fontSizePosition, { expires: 365, domain:document.domain, path:'/' });
	}
	
}

function charity(){
	$('div.social-list > div:gt(0)').hide();
	$('#nav-social li').click(function(){
		$('div.social-list > div:eq(0)').slideUp();
		$('#nav-social li a').removeClass('active');
		$('a', this).addClass('active');
		var i = $(this).index()+1;
		$('div.social-list > div:gt(0)').slideUp();
		$('div.social-list > div').eq(i).stop(1,1).slideDown();
		return false;
	});
}

function titleCase(){
	if($('html').attr('lang') != 'en') return;
	
	$('#content h1').toTitleCase();
	$('#nav-breadcrumbs li a').toTitleCase();
	/*$('#nav-breadcrumbs li:last').toTitleCase()*/
	$('#inner-pic strong').toTitleCase();
}

function yearSlider(){
	if(!$('#inner-slider:not(.type-2)').length)
		return;
	
	$('#inner-slider:not(.type-2) #inner-slides').before('<div id="inner-slider-nav" />').cycle({fx:'scrollHorz',pager:'#inner-slider-nav',prev:'#prev-slide',next:'#next-slide', timeout:0});
	$('#inner-slider:not(.type-2) #inner-slider-nav a').append('<b />');
}

function focusblur(){
	$('.fb-field').each(function(){$(this).attr('default',$(this).val());});
	$('.fb-field').focus(function(){if($(this).val()==$(this).attr('default')){$(this).val('');}});
	$('.fb-field').blur(function(){if($(this).val()==''){$(this).val($(this).attr('default'));}});
}

function reportsSlider(){
	var innerSlider = null;
	var innerSliderNav = null;

	function updateSlider(){
		$('#inner-slider.type-2').ant1ucem_slider( {item:'#inner-slides > li', width:680, auto:false, speed:1000, inverse:true, smoothHeight:true,
			extra:function(d){
				$('#inner-slider-nav a').click(function(){
					$('#inner-slider-nav a').removeClass('activeSlide');
					$(this).addClass('activeSlide');
					var index = $('#inner-slider-nav .items a').index($(this));
					d.slideTo(index);
					//console.log('clicl '+index);
					return false;
				});

				$('#next-slide').click(function(){
					d.slide(1); return false;
				});
				$('#prev-slide').click(function(){
					d.slide(-1); return false;
				});
				// console.log('ini-',i);
			},
			onSlide: function(d){
				$('#inner-slider-nav a').removeClass('activeSlide');
				$('#inner-slider-nav a').eq(d.currentSlide).addClass('activeSlide');
				
				if ($("html").is(".ie6, .ie7, .ie8")) {
					$("#inner-slider.type-2 > .ie-decor").width(d.$mask.width() + 3).height(d.$mask.height() + 5);
				}
				
				//if(jQuery.browser.msie==true) return; ///!!!!
				
				if(d.currentSlide > innerSliderNav.displayedElems-1) {
					for(i=0;i<d.currentSlide - innerSliderNav.displayedElems+1;i++)
						$('#next-year').click();
				}
				
				//console.log('innerSliderNav',d.currentSlide,innerSliderNav.numSlides-innerSliderNav.displayedElems);
				if(d.currentSlide<innerSliderNav.numSlides-innerSliderNav.displayedElems+1)
					for(i=0;i<innerSliderNav.numSlides-innerSliderNav.displayedElems+1-d.currentSlide;i++)
						$('#prev-year').click();
			}
		});
		
		if ($('#inner-slider.type-2').length) { 
			innerSlider = $.data($('#inner-slider.type-2').get(0), 'data');
			innerSlider.slideTo(innerSlider.numSlides-1);
		}
	}

	$('#inner-slider-nav').ant1ucem_slider({item:'.items > a', cycle:false, width:74, auto:false, displayedElems:8,
		extra:function(d){
			//console.log(4242);
			$('#next-year').click(function(){
				d.slide(-1);
				return false;
			});
			$('#prev-year').click(function(){
				d.slide(1);
				return false;
			});
			
			//if(jQuery.browser.msie==true) 
			for(var i=d.getChanging; i>0; i--)
				d.slide(-1);
				
		},
		onRightBorder:function(d){
			//console.log('r');

		},
		onLeftBorder:function(d){
			//console.log('l');
		},
		onSlide: function(d){
			
			innerSlider = $.data($('#inner-slider').get(0), 'data');
			//$('#inner-slider-nav a').removeClass('activeSlide');
			//$('#inner-slider-nav a').eq(d.currentSlide).addClass('activeSlide');
		}
		
		
	});

	if($('#inner-slider-nav').length){
		innerSliderNav = $.data($('#inner-slider-nav').get(0), 'data');
		//console.log(innerSliderNav.numSlides);
		//if(jQuery.browser.msie==true) innerSliderNav.slideTo(innerSliderNav.numSlides-1);
	}
	
	updateSlider();

	$('#inner-slider-nav a').click(function(){
		$('#inner-slider-nav a').removeClass('activeSlide');
		$(this).addClass('activeSlide');
		//updateSlider();
		return false;
		
	});
}

function philosophySlider(){
	var innerSlider = null;
	var innerSliderNav = null;

	function updateSlider(){
		$('#inner-slider').ant1ucem_slider( {item:'#inner-slides > li', width:480, auto:false, speed:1000, inverse:true, smoothHeight:true,
			extra:function(d){
				$('#inner-slider-nav a').click(function(){
					$('#inner-slider-nav a').removeClass('activeSlide');
					$(this).addClass('activeSlide');
					var id = $(this).text() -0 - 1 ;
					d.slideTo(id);
					//console.log('+++ '+id);
					return false;
				});

				$('#next-slide').click(function(){
					d.slide(1); return false;
				});
				$('#prev-slide').click(function(){
					d.slide(-1); return false;
				});
				// console.log('ini-',i);
			},
			onSlide: function(d){
				$('#inner-slider-nav a').removeClass('activeSlide');
				$('#inner-slider-nav a').eq(d.currentSlide).addClass('activeSlide');
				
				if ($("html").is(".ie6, .ie7, .ie8")) {
					$("#inner-slider > .ie-decor").width(d.$mask.width() + 3).height(d.$mask.height() + 5);
				}
			}
		});
		
		if ($('#inner-slider').length) {
			innerSlider = $.data($('#inner-slider').get(0), 'data');
			innerSlider.slide();
		}
	}

	updateSlider();
	

	$('#inner-slider-nav a').click(function(){
		$('#inner-slider-nav a').removeClass('activeSlide');
		$(this).addClass('activeSlide');
		//updateSlider();
		return false;
		
	});
}

var truncate = function(achorId) {
	var doc = document,
		achor = doc.getElementById(achorId);
	if (!achor) return;
	achor.onclick = function() {
		var oThis = this,
			oThisId = this.id,
			oThisToggleClass = 'open',
			shortTxtBox = doc.getElementById('teaser'),
			fullTxtBox = doc.getElementById('fulltext');
		
		$(oThis).toggleClass(oThisToggleClass);
		
		
		shortTxtBox.style.display = (shortTxtBox.style.display.length === 0) ? 'none': '';
		fullTxtBox.style.display = (fullTxtBox.style.display.indexOf('block') !== -1) ? '': 'block';
		
		//console.log(shortTxtBox.style.display + ' ' + fullTxtBox.style.display);
		
		return false;
	}
	
	
}
