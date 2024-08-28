import { createClient, print} from "redis";


const client = createClient();

client.on('error', err => console.log('Redis client connected to the server:', err));

client.on('connect', async () => {
    console.log('Redis client connected to the server');
    client.hset('City1', 'Portland', 50,print );
    client.hset('City1', 'Seattle', 80, print);
    client.hset('City1', 'New York', 20,print );
    client.hset('City1', 'Bogota', 20,print );
    client.hset('City1', 'Cali', 40, print);
    client.hset('City1', 'Paris', 2,print );
    client.hgetall('City1', (err, cities) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(cities);
        }
    })
})