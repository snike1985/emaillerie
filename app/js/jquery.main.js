"use strict";
( function(){

    $(function(){

        $('.gallery').each( function() {
            new Gallery( $(this) );
        } );

        $('.language').each( function() {
            new Language( $(this) );
        } );

        $('.site__header').each( function() {
            new Header( $(this) );
        } );

    });

    var Gallery = function(obj) {

        //private properties
        var _obj = obj,
            _slider = _obj.find( '.swiper-container' ),
            _pagination = _obj.find( '.swiper-pagination' ),
            _prev = _obj.find( '.swiper-button-prev' ),
            _next = _obj.find( '.swiper-button-next' ),
            _sliderItems = _slider.find('.swiper-slide'),
            _sliderLength = _obj.find( '.gallery__counter-length' ),
            _currentSlider = _obj.find( '.gallery__counter-current' ),
            _swiper;

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'click': function() {


                    }
                });

            },
            _initGallery = function() {
                _swiper = new Swiper(_slider, {
                    pagination: _pagination,
                    paginationClickable: true,
                    nextButton: _next,
                    prevButton: _prev,
                    loop: true,
                    onSlideChangeStart: function () {
                        var activeBullet = _pagination.find('.swiper-pagination-bullet-active');
                        _currentSlider.text(activeBullet.index() + 1);
                    }
                });
            },
            _init = function() {
                _addEvents();
                _initGallery();
                _sliderLength.text(_sliderItems.length)
            };

        //public properties

        //public methods

        _init();
    };

    var Language = function(obj) {

        //private properties
        var _obj = obj,
            _list = _obj.find( '.language__list' ),
            _items = _list.find( '.language__item' ),
            _currentElem = _obj.find( '.language__current' );

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'click': function() {


                    }
                });

                _items.on({
                    'click': function() {
                        var curElem = $(this);

                        if ( !curElem.hasClass( 'active' ) ) {
                            _changeActiveElem(curElem);
                        } else {
                            if ( _obj.hasClass( 'open' ) ) {
                                _hideList();
                            } else {
                                _showList();
                            }
                        }
                    }
                });

            },
            _changeActiveElem = function(activeElem) {
                _items.removeClass('active');
                activeElem.addClass('active');
                _hideList();
            },
            _showList = function() {
                _obj.addClass( 'open' );
            },
            _hideList = function() {
                _obj.removeClass( 'open' );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Header = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu-btn' ),
            _menu = _obj.find( '.menu' ),
            _item = _menu.find( '.menu__item' ),
            _wrap = _obj.find( '.site__header-layout' ),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _showMenu();
                        } else {
                            _hideMenu();
                        }
                    }
                });

                _item.on({
                    'click': function() {

                    }
                });

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _showMenu = function() {
                _obj.addClass( 'active' );
                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
            },
            _hideMenu = function() {
                _obj.removeClass( 'active' );
                _wrap.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();