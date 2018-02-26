/// <reference types="youtube" />
import { AfterContentInit, Renderer2, EventEmitter } from '@angular/core';
import { YoutubeApiService } from './youtube.api.service';
import { YoutubePlayerService } from './youtube.player.service';
export declare class YoutubeComponent implements AfterContentInit {
    youtubeApi: YoutubeApiService;
    youtubePlayer: YoutubePlayerService;
    private renderer;
    videoId: string;
    ready: EventEmitter<YT.Player>;
    change: EventEmitter<YT.PlayerEvent>;
    ytPlayer: YT.Player;
    changeEvent: YT.PlayerEvent;
    constructor(youtubeApi: YoutubeApiService, youtubePlayer: YoutubePlayerService, renderer: Renderer2);
    ngAfterContentInit(): void;
    onReady(player: YT.Player): void;
    onChange(event: YT.PlayerEvent): void;
}
