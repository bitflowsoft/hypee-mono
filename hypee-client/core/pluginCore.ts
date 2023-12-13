import { channelRegister } from "./sdk/channel";
import { pluginRegistry } from "./sdk/plugin";

const loadPlugin = (pluginPath: string) => {
  const plugin = require(pluginPath);
  plugin.onInitialize(channelRegister);
  pluginRegistry.register(plugin.pluginTitle, plugin);
}

