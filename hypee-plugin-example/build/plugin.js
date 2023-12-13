"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start = (channel) => {
    // do stuff...
    let progress = 1;
    channel.send('progress', [progress]);
};
const stop = (channel) => {
    // do stuff...
};
const onInitialize = (channelRegister) => {
    channelRegister.subscribe('start', start);
    channelRegister.subscribe('stop', stop);
};
const plugin = {
    pluginTitle: 'example-plugin',
    pluginDescription: 'This is example plugin',
    pluginImage: { imageLink: 'https://example.com/some.png' },
    author: "bitflowsoft",
    onInitialize
};
exports.default = plugin;
