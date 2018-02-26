import { NgZone } from '@angular/core';
import { YoutubeApiService } from "./youtube.api.service";
import { PlayerConfig } from './youtube.interface';
export declare class YoutubePlayerService {
    private zone;
    private youtubeApi;
    private _window;
    private player;
    constructor(zone: NgZone, youtubeApi: YoutubeApiService);
    initialise(config: PlayerConfig): void;
    private newPlayer(config);
}
