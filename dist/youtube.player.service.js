import { Injectable, NgZone } from '@angular/core';
import { YoutubeApiService } from "./youtube.api.service";
var getWindow = function () { return window; };
var ɵ0 = getWindow;
var YoutubePlayerService = (function () {
    function YoutubePlayerService(zone, youtubeApi) {
        this.zone = zone;
        this.youtubeApi = youtubeApi;
        this._window = getWindow();
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
        { type: Injectable },
    ];
    /** @nocollapse */
    YoutubePlayerService.ctorParameters = function () { return [
        { type: NgZone, },
        { type: YoutubeApiService, },
    ]; };
    return YoutubePlayerService;
}());
export { YoutubePlayerService };
export { ɵ0 };
//# sourceMappingURL=youtube.player.service.js.map