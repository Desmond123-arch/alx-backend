import { response } from "express";
import { createClient, print } from "redis";

const client = createClient();

client.on('error', err => console.log('Redis client connected to the server:', err));

client.on('connect', async () => {
    console.log('Redis client connected to the server');
    
    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
})
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, print);
}

async function  displaySchoolValue(schoolName) {
    const val = await new Promise((resolve, reject) => {
        client.get(schoolName, (err, val) => {
            if (err) {
                reject(err);
            } else {
                resolve(val);
            }
        })
    })
    console.log(val);
}