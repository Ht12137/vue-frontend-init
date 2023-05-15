/**
 * @description 创建实例并
 * @param {*} topic topic
 * @returns websocket实例
 */
let client = null
const connectSocket = () => {
    const baseUrl = "127.0.0.1:8880"
    const topic = "api/websocket/test"
    const wsUrl = `ws://${baseUrl}/${topic}`
    if (client) {
        console.log(client);
        return client
    } else {
        client = new WebSocket(wsUrl)
    }
    return client

}

export default connectSocket
