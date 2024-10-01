// // Controls main nav function.
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.mainnavSystem = {
      attach: function (context) {

        var isOpened = function(){
            var status = $('#mainnav').hasClass('show') ? true : false;
            // console.log(status);
            return status;
        }

        var isMobile = function(){
            var status = $(window).width() < 992;
            // console.log(status);
            return status;
        }

        // add all the elements inside modal which you want to make focusable
        var  focusableElements = 'button, a, input, select, textarea';
        var modal = $('#mainnav'); // select the modal by it's id
        
        var firstFocusableElement = modal.find(focusableElements)[0]; // get first element to be focused inside modal
        var focusableContent = modal.find(focusableElements);
        var lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
        
        document.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            let isESCPressed = e.key === 'Escape' || e.keyCode === 27;
            if (!isTabPressed) {
                if (isOpened() && isESCPressed){
                    $('#pmenu-toggle').click();
                }
                return;
            }
            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement && isMobile()) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
                }
            }
            else { // if tab key is pressed

                // console.log('current', document.activeElement);
                // console.log('last', lastFocusableElement);
                // console.log('first', firstFocusableElement);
                // console.log('dynamiclast',$(lastFocusableElement).closest('li.dropdown').children('a.nav-item'));

                firstFocusableElement = modal.find(focusableElements)[0]; // get first element to be focused inside modal
                focusableContent = modal.find(focusableElements);
                lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
                
                if ($(lastFocusableElement).closest('li.dropdown').length > 0 && !$(lastFocusableElement).closest('li.dropdown').children('a.nav-item').hasClass('show')) {
                    console.log('hidden');
                    lastFocusableElement = $(lastFocusableElement).closest('li.dropdown').children('a.nav-item')[0];
                    console.log('last', lastFocusableElement);
                }
                
                if ((document.activeElement === lastFocusableElement) && isMobile()) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
                }
            }
        });

        $('#pmenu-toggle').off().on('click', function(e) {
            $("#mainnav .mcopy-search").html('');
            $("#mainnav .mcopy-nav").html('');
            
            $( "#block-searchapipagesearchblockform" ).clone().removeClass().addClass('d-block d-lg-none psearch').appendTo( "#mainnav .mcopy-search" );
            $( "#utility-nav .nav" ).clone().removeClass().addClass('d-block d-lg-none umenu my-3').appendTo( "#mainnav .mcopy-nav" );
            

            if (isOpened()){

                $('body').removeClass('pmenu-open').addClass('pmenu-close');
                $('#pmenu-toggle').focus();
            }
            else {
                $('body').removeClass('pmenu-close').addClass('pmenu-open');
            }
  
        });
  
        $('#pnav-close, #primary-nav-bg').off().on('click', function(e) {
  
            $('#pmenu-toggle').click();

  
        });
      }
    };
  })(jQuery, Drupal);
