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

        $('.plan').each( function() {
            new Plan( $(this) );
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
            _item = _obj.find( '.menu__item, .navigation__item' ),
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
                        _hideMenu();
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
            _items = _list.find( '.language__item' );

        //private methods
        var _addEvents = function() {

                $(window).on({
                    'click': function() {

                        if ( _obj.hasClass( 'open' ) ) {
                            _hideList();
                        }
                    }
                });

                _items.on({
                    'click': function(e) {
                        var curElem = $(this);

                        e.stopPropagation();

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
            _defaultIcon = '../img/location/location_marker.png',
            _logoMarker = '../img/logo.png',
            _curMarkerIcon = _defaultIcon,
            _markerData = {},
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'click': function() {


                    }
                });

                _items.on({
                    'click': function() {

                        var curElem = $(this);

                        _markerData = curElem.data('marker');

                        if ( !curElem.hasClass('active') ) {
                            _items.removeClass('active');
                            curElem.addClass('active');

                            _clearMarkers();

                            _markerData.forEach(function (item) {
                                var filterType = item['type'],
                                    service,
                                    request = {
                                        location: _mapCenter,
                                        radius: _searchRadius,
                                        types: [filterType]
                                    };

                                if ( item['icon'] ) {
                                    _curMarkerIcon = item['icon'];
                                } else {
                                    _curMarkerIcon = _defaultIcon;
                                }

                                service = new google.maps.places.PlacesService(_map);
                                service.nearbySearch(request, _placeServiceCallback);
                            });
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
                    new google.maps.Size(38,49),
                    new google.maps.Point(0,0),
                    new google.maps.Point(19,49)
                );
                
                var curMarker = new google.maps.Marker({
                    map: _map,
                    icon: image,
                    position: place.geometry.location
                });
                curMarker.setMap(_map);

                _visibleMarkers.push(curMarker);

                var directionsDisplay;
                var directionsService;
                var stepDisplay;

                // Instantiate a directions service.
                directionsService = new google.maps.DirectionsService();
                directionsDisplay = new google.maps.DirectionsRenderer(_map)

                var request = {
                    origin: place.geometry.location,
                    destination: 'Kiev',
                    travelMode: 'TRANSIT',
                    transitOptions: {
                        modes: ['BUS']
                    },
                    // unitSystem: google.maps.UnitSystem.IMPERIAL
                    // origin: 'Hoboken NJ',
                    // destination: 'Carroll Gardens, Brooklyn',
                    // travelMode: 'TRANSIT',
                    // transitOptions: {
                    //     departureTime: new Date(1337675679473),
                    //     modes: ['BUS'],
                    //     routingPreference: 'FEWER_TRANSFERS'
                    // },
                    // unitSystem: google.maps.UnitSystem.IMPERIAL
                };

                directionsService.route(request, function(response, status) {
                    if (status == "OK") {
                        console.log(response);
                    } else {
                        console.log(status);
                    }
                });

                google.maps.event.addListener(curMarker, 'click', function() {
                    // console.log(curMarker);
                    _infoWindow.setContent(place.name);
                    _infoWindow.open(_map, this);
                    // curMarker.setIcon("img/location/location_store-hover.png");
                });
            },
            _placeServiceCallback = function (results, status) {

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
            _checkPlatform = function() {
                var platform = window.navigator.platform;

                if ( platform == 'Mac68K' || platform == 'MacPPC' || platform == 'MacIntel') {
                    $('.language__item span').css({ 'padding-top': '3px' });
                    $('.navigation__item i').css({ 'margin-top': '-4px' });
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
                _checkPlatform();
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

    var Plan = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _wrap = _obj.find('.plan__wrap'),
            _back = _obj.find('.plan__back'),
            _build = _obj.find('.plan__build'),
            _floors = _obj.find('.plan__floor'),
            _appartments = _obj.find('.plan__appartment'),

            _buildFloorCanvas = document.createElement('canvas'),
            _buildFloorCanvasCtx = _buildFloorCanvas.getContext('2d'),

            _floorCanvas = document.createElement('canvas'),
            _floorCanvasCtx = _floorCanvas.getContext('2d'),

            _tooltips = _wrap.find('.plan__tooltips-floor'),
            _mouseX = 0,
            _mouseY = 0,
            _activeFloor = -1,
            _activeAppartment = -1,
            _step = 0,
            _canRender = true,
            _alpha = 0;

        _floorCanvas.classList.add('floor');

        //private methods
        var _addEvents = function() {
                _wrap.on( {
                    'mousemove': function(e) {
                        var koef = 1811/$(this).width(),
                            elemTop = $(this).offset().top,
                            elemLeft = $(this).offset().left;

                        _mouseX = (e.pageX - elemLeft)*koef;
                        _mouseY = (e.pageY - elemTop)*koef;

                        switch (_step) {
                            case 0:
                                _updateBuildFloor();
                                break;
                            case 1:
                                _updateFloor();
                                break;
                            case 2:
                                break;
                            default:
                                break;
                        }
                    },
                    'mouseenter': function() {

                        // _canRender = true;
                        // _render();
                    },
                    'mouseleave': function() {

                        // _canRender = false;
                    },
                    'click': function() {

                        switch (_step) {
                            case 0:
                                _openFloor();
                                break;
                            case 1:
                                _openAppartment();
                                break;
                            case 2:
                                break;
                            default:
                                break;
                        }
                    }
                } );

                _back.on({
                    'click': function () {

                        _step = _step - 1;
                        $('.plan__info').removeClass('show');

                        switch (_step) {
                            case 0:
                                _back.addClass('hide');
                                $('.plan__floor').removeClass('active');
                                _updateBuildFloor();
                                break;
                            case 1:
                                $('.plan__appartment').removeClass('active');
                                _openFloor();
                                _updateFloor();
                                break;
                            case 2:
                                _openAppartment();
                                break;
                            default:
                                break;
                        }
                        return false;
                    }
                });
            },
            _render = function (time) {
            console.log(time);
                if (_canRender) {
                    switch (_step) {
                        case 0:
                            _updateBuildFloor();
                            break;
                        case 1:
                            _updateFloor();
                            break;
                        case 2:
                            break;
                        default:
                            break;
                    }
                    window.requestAnimationFrame(_render);
                }
            },
            _createBackground = function (elem) {
                elem.each(function () {
                    var curElem = $(this);

                    curElem.css({ 'background-image': 'url(' + curElem.data('img') + '' });
                });
            },
            _createBuildFloorCanvas = function () {
                _build.prepend(_buildFloorCanvas);
                _buildFloorCanvas.width = 1811;
                _buildFloorCanvas.height = 700;
                _drawBuildFloor();
            },
            _createFloorCanvas = function () {
                _build.prepend(_floorCanvas);
                _floorCanvas.width = 1811;
                _floorCanvas.height = 700;
                _drawFloor();

                _floors.each(function () {
                    var curFloor = $(this),
                        curAppartments = curFloor.find('.plan__appartment'),
                        curIndex = curFloor.index() - 1,
                        curTooltip = _tooltips.eq(curIndex);

                    curAppartments.each(function (i) {
                        var elem = $(this);

                        curTooltip.find('.plan__info').eq(i).css({
                            'left': elem.data('tooltip')[0]/1811*100 + '%',
                            'bottom': (700 - elem.data('tooltip')[1])/700*100 + '%'
                        });
                    });
                });
            },
            _drawBuildFloor = function () {

                _obj.removeClass('pointer');
                _floors.each(function (y) {
                    var curElem = $(this),
                        path = curElem.data('path');

                    _buildFloorCanvasCtx.beginPath();
                    _buildFloorCanvasCtx.moveTo(path[0][0],path[0][1]);
                    for (var i = 1; i < path.length; i++) {
                        _buildFloorCanvasCtx.lineTo(path[i][0],path[i][1]);
                    }
                    _buildFloorCanvasCtx.globalAlpha = 0;
                    if (_buildFloorCanvasCtx.isPointInPath(_mouseX, _mouseY)) {
                        _buildFloorCanvasCtx.globalAlpha = 1;
                        _obj.addClass('pointer');
                        _activeFloor = y;
                    } else {

                    }
                    _buildFloorCanvasCtx.fillStyle = 'rgba(255,78,0,.4)';
                    _buildFloorCanvasCtx.fill();
                    _buildFloorCanvasCtx.closePath();
                    _buildFloorCanvasCtx.restore();
                });
            },
            _updateBuildFloor = function () {
                _buildFloorCanvasCtx.clearRect(0,0,_buildFloorCanvas.width,_buildFloorCanvas.height);
                _activeFloor = null;
                _drawBuildFloor();
            },
            _drawFloor = function () {

                _obj.removeClass('pointer');
                $('.plan__info').removeClass('show');
                _floors.eq(_activeFloor).find('.plan__appartment').each(function (y) {
                    var curElem = $(this),
                        path = curElem.data('path');

                    _floorCanvasCtx.beginPath();
                    _floorCanvasCtx.moveTo(path[0][0],path[0][1]);
                    for (var i = 1; i < path.length; i++) {
                        _floorCanvasCtx.lineTo(path[i][0],path[i][1]);
                    }
                    _floorCanvasCtx.globalAlpha = 0;
                    if (_floorCanvasCtx.isPointInPath(_mouseX, _mouseY)) {
                        _floorCanvasCtx.globalAlpha = 1;
                        _activeAppartment = y;
                        _obj.addClass('pointer');

                        if (!_wrap.find('.plan__tooltips-floor').eq(_activeFloor).find('.plan__info').eq(y).hasClass('show')) {
                            $('.plan__info').removeClass('show');
                            _wrap.find('.plan__tooltips-floor').eq(_activeFloor).find('.plan__info').eq(y).addClass('show');
                        }
                    }
                    _floorCanvasCtx.fillStyle = 'rgba(255,78,0,.4)';
                    _floorCanvasCtx.fill();
                    _floorCanvasCtx.closePath();
                    _floorCanvasCtx.restore();
                });
            },
            _updateFloor = function () {
                _floorCanvasCtx.clearRect(0,0,_floorCanvas.width,_floorCanvas.height);
                _activeAppartment = null;
                _drawFloor();
            },
            _openFloor = function () {

                if (_activeFloor || _activeFloor == 0) {
                    _floors.eq(_activeFloor).addClass('active');
                    _step = 1;
                    _back.removeClass('hide');
                }
            },
            _openAppartment = function () {

                if (_activeAppartment || _activeAppartment == 0) {
                    var openingElem = _floors.eq(_activeFloor).find('.plan__appartment').eq(_activeAppartment);

                    _createBackground(openingElem);
                    openingElem.addClass('active');

                    console.log('open appartament C' + _activeFloor + '.' + (_activeAppartment + 1 ));
                    _mouseX = 0;
                    _mouseY = 0;
                    _step = 2;
                    _updateFloor();
                }
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();

                _createBackground(_build);
                _createBackground(_floors);

                _createFloorCanvas();
                _createBuildFloorCanvas();
            };

        //public properties

        //public methods

        _init();
    };

} )();