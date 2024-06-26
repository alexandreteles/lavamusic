import { Player } from 'shoukaku';

import { Song } from '../../structures/Dispatcher.js';
import { Dispatcher, Event, Lavamusic } from '../../structures/index.js';

export default class TrackEnd extends Event {
    constructor(client: Lavamusic, file: string) {
        super(client, file, {
            name: 'trackEnd',
        });
    }
    public async run(player: Player, track: Song, dispatcher: Dispatcher): Promise<void> {
        dispatcher.previous = dispatcher.current;
        dispatcher.current = null;
        const m = await dispatcher.nowPlayingMessage?.fetch().catch(() => {});
        if (dispatcher.loop === 'repeat') dispatcher.queue.unshift(track);
        if (dispatcher.loop === 'queue') dispatcher.queue.push(track);
        await dispatcher.play();
        if (dispatcher.autoplay) {
            await dispatcher.Autoplay(track);
        }
        if (m && m.deletable) await m.delete().catch(() => {});
    }
}

/**
 * Project: lavamusic
 * Author: Appu
 * Company: Coders
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
