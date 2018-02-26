import { Component, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import { YoutubeApiService } from './youtube.api.service';
import { YoutubePlayerService } from './youtube.player.service';
var YoutubeComponent = (function () {
    function YoutubeComponent(youtubeApi, youtubePlayer, renderer) {
        this.youtubeApi = youtubeApi;
        this.youtubePlayer = youtubePlayer;
        this.renderer = renderer;
        this.ready = new EventEmitter();
        this.change = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'youtube-component',
                    template: '<div id="playerElement"></div>'
                },] },
    ];
    /** @nocollapse */
    YoutubeComponent.ctorParameters = function () { return [
        { type: YoutubeApiService, },
        { type: YoutubePlayerService, },
        { type: Renderer2, },
    ]; };
    YoutubeComponent.propDecorators = {
        "videoId": [{ type: Input },],
        "ready": [{ type: Output },],
        "change": [{ type: Output },],
    };
    return YoutubeComponent;
}());
export { YoutubeComponent };
//# sourceMappingURL=youtube.component.js.map