import { ChannelEmitter, ChannelRegister } from "../sdk/channel";
import { Plugin } from "../sdk/plugin";

const start = (channel: ChannelEmitter, data: any) => {
  // do stuff...
  console.log(data);
  let progress = 1;
  channel.send('progress', [progress]);
}

const stop = (channel: ChannelEmitter) => {
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
  onInitialize,
}

export default plugin;