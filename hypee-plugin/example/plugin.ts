import { ChannelEmitter } from "../sdk/channel";
import { Plugin } from "../sdk/plugin";

const start = (channel: ChannelEmitter) => {
  // do stuff...
  let progress = 1;
  channel.send('progress', [progress]);
}

const stop = (channel: any) => {
  // do stuff...
}

const onInitialize = () => {
  const channelRegistry = { register: (channelName: string, subscriber: (channel: any) => void) => {}};
  
  channelRegistry.register('start', start);
  channelRegistry.register('stop', stop);
}

const plugin: Plugin = {
  pluginTitle: 'example-plugin',
  pluginDescription: 'This is example plugin',
  pluginImage: { imageLink: 'https://example.com/some.png' },
  author: "bitflowsoft",
  onInitialize
}

export default plugin;