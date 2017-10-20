"use strict";
( function(){

    $(function(){

        $('.callback').each( function() {
            new Callback( $(this) );
        } );

        $('.site__header').each( function() {
            new Header( $(this) );
        } );

        $('.gallery').each( function() {
            new Gallery( $(this) );
        } );

        $('.language').each( function() {
            new Language( $(this) );
        } );

        $('.map').each( function() {
            new Map( $(this) );
        } );

        $('.site').each( function() {
            new Site( $(this) );
        } );

        $('.show').each( function() {
            new Show( $(this) );
        } );

    });

    var Callback = function(obj) {

        //private properties
        var _obj = obj,
            _duration = _obj.data('duration'),
            _winLoaded = false,
            _siteScrolled = false,
            _showAnimate = false;

        //private methods
        var _addEvents = function() {

                $(window).on({
                    'load': function() {

                        if ( !_showAnimate ) {
                            _winLoaded = true;

                            if ( _siteScrolled && _winLoaded ) {
                                _startDuration();
                            }
                        }

                    },
                    'scroll': function() {

                        if ( !_showAnimate ) {
                            var curScroll = $(this).scrollTop(),
                                curWinHeight = $(this).height();

                            if ( curScroll > curWinHeight ) {
                                _siteScrolled = true;
                            }

                            if ( _siteScrolled && _winLoaded ) {
                                _startDuration();
                            }
                        }
                    }
                });

            },
            _startDuration = function() {
                setTimeout(function () {
                    _obj.addClass('show');
                }, _duration);
                _showAnimate = true;
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

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

    var Map = function(obj) {

        //private properties
        var _obj = obj,
            _location = _obj.find( '.map__location' ),
            _locationCenter = _location.data('center').slice(',') || [50.848045, 4.318993],
            _locationZoom = _location.data('zoom'),
            _controls = _obj.find( '.map__controls' ),
            _items = _controls.find( '.map__controls-item' ),
            _searchRadius = _controls.data('searchradius'),
            _map = null,
            _mapCenter = {lat: _locationCenter[0], lng: _locationCenter[1]},
            _visibleMarkers = [],
            _infoWindow = null,
            _defaultIcon = 'img/location/location_marker.png',
            _logoMarker = 'img/logo.png',
            _curMarkerIcon = _defaultIcon;

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'click': function() {


                    }
                });

                _items.on({
                    'click': function() {
                        var curElem = $(this),
                        filterType = curElem.data('type').split(','),
                        curMarkerIcon = curElem.data('marker');

                        if ( !curElem.hasClass('active') ) {
                            _items.removeClass('active');
                            curElem.addClass('active');

                            if ( curMarkerIcon ) {
                                _curMarkerIcon = curMarkerIcon;
                            } else {
                                _curMarkerIcon = _defaultIcon;
                            }

                            var service;
                            var request = {
                                location: _mapCenter,
                                radius: _searchRadius,
                                types: filterType
                            };

                            service = new google.maps.places.PlacesService(_map);
                            service.nearbySearch(request, _placeServiceCallback);
                        }
                    }
                });

            },
            _clearMarkers = function () {
                for (var i = 0; i < _visibleMarkers.length; i++) {
                    _visibleMarkers[i].setMap(null);
                }
                _visibleMarkers = [];
            },
            _initMap = function() {
                _map = new google.maps.Map(_location[0], {
                    zoom: _locationZoom,
                    center: _mapCenter,
                    disableDefaultUI: true
                });


                var zoomDiv = document.createElement('div');
                zoomDiv.classList.add('customZoomControls');
                var renderZoomControls = new _customZoomControl(zoomDiv, _map);
                zoomDiv.index = 1;
                _map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomDiv);


                var image = new google.maps.MarkerImage(
                    _logoMarker,
                    new google.maps.Size(179,46),
                    new google.maps.Point(0,0),
                    new google.maps.Point(90,46)
                );

                // var goldStar = {
                //     path: 'M 24 4 C 16.269531 4 10 10.269531 10 18 C 10 25.730469 24 44 24 44 C 24 44 38 25.730469 38 18 C 38 10.269531 31.730469 4 24 4 Z M 24 25 C 20.132813 25 17 21.867188 17 18 C 17 14.132813 20.132813 11 24 11 C 27.867188 11 31 14.132813 31 18 C 31 21.867188 27.867188 25 24 25 Z',
                //     fillColor: '#FF3D00',
                //     strokeColor: '#F00',
                //     fillOpacity: 1
                // };

                var marker = new google.maps.Marker({
                    position: _mapCenter,
                    icon: _logoMarker,
                    map: _map
                });

                marker.setMap(_map);

                _infoWindow = new google.maps.InfoWindow({ map: _map });

                _infoWindow.close();
            },
            _customZoomControl = function (div, map) {
                // Get the control DIV. We'll attach our control UI to this DIV.
                var controlDiv = div,
                    zoomin = document.createElement('div'),
                    zoomout = document.createElement('div');

                zoomin.classList.add('customZoomControls__in');
                zoomout.classList.add('customZoomControls__out');

                controlDiv.appendChild(zoomin);
                controlDiv.appendChild(zoomout);

                google.maps.event.addDomListener(zoomout, 'click', function() {
                    var currentZoomLevel = map.getZoom();
                    if(currentZoomLevel != 0){
                        map.setZoom(currentZoomLevel - 1);}
                });

                google.maps.event.addDomListener(zoomin, 'click', function() {
                    var currentZoomLevel = map.getZoom();
                    if(currentZoomLevel != 21){
                        map.setZoom(currentZoomLevel + 1);}
                });
            },
            _createMarker = function (place) {

                var image = new google.maps.MarkerImage(
                    _curMarkerIcon,
                    new google.maps.Size(36,47),
                    new google.maps.Point(0,0),
                    new google.maps.Point(18,47)
                );
                
                var curMarker = new google.maps.Marker({
                    map: _map,
                    icon: image,
                    position: place.geometry.location
                });
                curMarker.setMap(_map);
                
                _visibleMarkers.push(curMarker);
                
                google.maps.event.addListener(curMarker, 'click', function() {
                    _infoWindow.setContent(place.name);
                    _infoWindow.open(_map, this);
                });
            },
            _placeServiceCallback = function (results, status) {
                _clearMarkers();

                if (status == google.maps.places.PlacesServiceStatus.OK) {

                    for (var i = 0; i < results.length; i++) {
                        _createMarker(results[i]);
                    }
                } else {
                    console.log(status);
                }
            },
            _init = function() {
                _addEvents();
                _initMap();
            };

        //public properties

        //public methods

        _init();
    };

    var Site = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _canMove = true;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    'scroll': function() {
                        var scrollTop = $(window).scrollTop();
                        _move( scrollTop );
                    },
                    'load': function() {
                        var scrollTop = $(window).scrollTop();
                        _changeCanMove();
                        _move( scrollTop );
                    },
                    'resize': function() {
                        _changeCanMove();
                    }
                } );

            },
            _changeCanMove = function() {
                var siteWidth = $('.site').outerWidth();

                if ( siteWidth < 1200 ) {
                    _canMove = false;
                } else {
                    _canMove = true;
                }
            },
            _paralax = function( elem, x, y, koef ) {
                var translate = 'translate3d(' + Math.round(x*koef) + 'px, ' + Math.round(y*koef) + 'px, 0px )';

                if (!_canMove) {
                    translate = 'translate3d(0px, 0px)';
                }

                elem.css( {
                    'transform': translate
                } );
            },
            _move = function( scrollTop ){
                var winHeight = $(window).height();

                $('.architecture').each( function() {
                    var curElem = $(this),
                        items = curElem.find('.architecture__item'),
                        curTop = curElem.offset().top,
                        curHeight = curElem.height(),
                        curKoef = -.05;

                    items.each( function() {
                        var curItem = $(this);

                        curKoef = -curKoef;
                        if ( ( scrollTop <= ( curTop + curHeight ) && ( ( winHeight + scrollTop ) >= curTop ) ) ) {

                            if ( curTop < winHeight ) {
                                _paralax( curItem, 0, scrollTop, curKoef);
                            } else {
                                _paralax( curItem, 0, scrollTop - (curTop - winHeight), curKoef);
                            }
                        }
                    } );
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Show = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _startTime = 0,
            _countObj = $('.project-preview__icons'),
            _countItem = _countObj.find('.project-preview__icons-item');

        //private methods
        var _onEvents = function () {
                _window.on({
                    scroll: function () {

                        _checkScroll();

                    }
                });
            },
            _startAnimation = function (time) {

                if ( (time - _startTime) > 10 ) {
                    _startTime = time;

                    _countItem.each(function () {
                        var curElem = $(this),
                            curMaxCount = curElem.data('count') - 1,
                            curField = curElem.find('> span'),
                            curValue = curField.text();

                        if ( curValue < curMaxCount ) {
                            curField.text(curValue*1 + 1);
                        }


                    });
                }

                window.requestAnimationFrame(_startAnimation);
            },
            _checkScroll = function(){

                var windowH = _window.height();

                _obj.each(function () {

                    var curItem = $(this),
                        topPos = _obj.offset().top;

                    if( ( _window.scrollTop() + windowH*0.9 ) > topPos && !curItem.hasClass( 'is-show' ) ){

                        curItem.addClass( 'is-show' );
                    }
                })
            },
            _init = function () {
                _obj[0].slides = _self;
                _onEvents();
                _checkScroll();
                // _startAnimation();
            };

        //public properties

        //public methods

        _init();
    };

} )();