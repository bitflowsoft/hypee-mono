
export const useHypee = () => {
  return {
    subscribe: (channelName, subscribeFunction) => {
      window.hypee.channel.register.subscribe(channelName, subscribeFunction)
    },
    call: (channelName, argv) => {
      window.hypee.channel.sender.send(channelName, argv);
    },
  }
}