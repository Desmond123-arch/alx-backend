import { createClient } from "redis";

const client = createClient();

client.on('error', err => console.log('Redis client connected to the server:', err));

client.on('connect', () => {
    console.log('Redis client connected to the server');
    client.subscribe('holberton school channel', (err) => {
        if (err) {
            console.error('Subscripton error');
        }
    })
    client.on('message', (channel, message) => {
        if (message === 'KILL_SERVER') {
            client.unsubscribe(channel,'holberton school channel', (err) => {
                client.quit((err) => {
                    if (err) { console.log(err) }
                })
            })
        }
        console.log(message);
    })
})