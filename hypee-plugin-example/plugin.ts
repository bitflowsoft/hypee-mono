import { ChannelEmitter, ChannelRegister } from "hypee-sdk/dist/sdk/channel";
import { Plugin } from "hypee-sdk/dist/sdk/plugin";

const start = (channel: ChannelEmitter) => {
  // do stuff...
  let progress = 1;
  channel.send('progress', [progress]);
}

const stop = (channel: any) => {
  // do stuff...
}

const onInitialize = (channelRegister: ChannelRegister) => {  
  channelRegister.subscribe('start', start);
  channelRegister.subscribe('stop', stop);
}

const plugin: Plugin = {
  pluginTitle: 'example-plugin',
  pluginDescription: 'This is example plugin',
  pluginImage: { imageLink: 'https://example.com/some.png' },
  author: "bitflowsoft",
  onInitialize
}

export default plugin;