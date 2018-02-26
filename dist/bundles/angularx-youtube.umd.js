(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['angularx-youtube'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var getWindow = function () { return window; };
var YoutubeApiService = (function () {
    function YoutubeApiService() {
        this.apiEmitter = new core.EventEmitter();
        this.hasLoaded = false;
        this._window = getWindow();
    }
    YoutubeApiService.prototype.loadApi = function () {
        var _this = this;
        if (!this.hasLoaded) {
            // console.log('loadApi')
            var scriptTag = this._window.document.createElement("script");
            scriptTag.type = "text/javascript";
            scriptTag.src = "https://www.youtube.com/iframe_api";
            this._window.document.body.appendChild(scriptTag);
            this._window['onYouTubeIframeAPIReady'] = function () {
                _this.apiEmitter.emit(_this._window["YT"]);
            };
            this.hasLoaded = true;
        }
    };
    YoutubeApiService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    YoutubeApiService.ctorParameters = function () { return []; };
    return YoutubeApiService;
}());

var getWindow$1 = function () { return window; };
var YoutubePlayerService = (function () {
    function YoutubePlayerService(zone, youtubeApi) {
        this.zone = zone;
        this.youtubeApi = youtubeApi;
        this._window = getWindow$1();
    }
    YoutubePlayerService.prototype.initialise = function (config) {
        var _this = this;
        if (this._window["YT"] === undefined) {
            this.youtubeApi.apiEmitter.subscribe(function () { return _this.zone.run(function () { return _this.newPlayer(config); }); });
        }
        else {
            this.zone.run(function () { return _this.newPlayer(config); });
        }
    };
    YoutubePlayerService.prototype.newPlayer = function (config) {
        return this.player = new this._window["YT"]["Player"](config.elementId, {
            width: config.width,
            height: config.height,
            videoId: config.videoId,
            events: {
                onReady: function (event) {
                    config.outputs.ready(event.target);
                },
                onStateChange: function (event) {
                    config.outputs.change(event);
                }
            }
        });
    };
    YoutubePlayerService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    YoutubePlayerService.ctorParameters = function () { return [
        { type: core.NgZone, },
        { type: YoutubeApiService, },
    ]; };
    return YoutubePlayerService;
}());

var YoutubeComponent = (function () {
    function YoutubeComponent(youtubeApi, youtubePlayer, renderer) {
        this.youtubeApi = youtubeApi;
        this.youtubePlayer = youtubePlayer;
        this.renderer = renderer;
        this.ready = new core.EventEmitter();
        this.change = new core.EventEmitter();
        this.youtubeApi.loadApi();
    }
    YoutubeComponent.prototype.ngAfterContentInit = function () {
        var elementId = 'player-' + this.videoId, elementContainer = this.renderer.selectRootElement('#playerElement');
        this.renderer.setAttribute(elementContainer, 'id', elementId);
        var config = {
            elementId: elementId,
            width: 300,
            height: 200,
            videoId: '',
            outputs: {
                ready: this.onReady.bind(this),
                change: this.onChange.bind(this)
            }
        };
        this.youtubePlayer.initialise(config);
    };
    YoutubeComponent.prototype.onReady = function (player) {
        this.ytPlayer = player;
        this.ytPlayer.loadVideoById(this.videoId);
        this.ready.emit(this.ytPlayer);
    };
    YoutubeComponent.prototype.onChange = function (event) {
        this.change.emit(event);
    };
    YoutubeComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'youtube-component',
                    template: '<div id="playerElement"></div>'
                },] },
    ];
    /** @nocollapse */
    YoutubeComponent.ctorParameters = function () { return [
        { type: YoutubeApiService, },
        { type: YoutubePlayerService, },
        { type: core.Renderer2, },
    ]; };
    YoutubeComponent.propDecorators = {
        "videoId": [{ type: core.Input },],
        "ready": [{ type: core.Output },],
        "change": [{ type: core.Output },],
    };
    return YoutubeComponent;
}());

var YoutubeModule = (function () {
    function YoutubeModule() {
    }
    YoutubeModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    providers: [
                        YoutubeApiService,
                        YoutubePlayerService
                    ],
                    declarations: [
                        YoutubeComponent
                    ],
                    exports: [
                        YoutubeComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    YoutubeModule.ctorParameters = function () { return []; };
    return YoutubeModule;
}());

exports.YoutubeModule = YoutubeModule;
exports.YoutubeApiService = YoutubeApiService;
exports.YoutubePlayerService = YoutubePlayerService;
exports.YoutubeComponent = YoutubeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
