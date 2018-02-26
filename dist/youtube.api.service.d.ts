import { EventEmitter } from '@angular/core';
export declare class YoutubeApiService {
    apiEmitter: EventEmitter<any>;
    private _window;
    private hasLoaded;
    constructor();
    loadApi(): void;
}
