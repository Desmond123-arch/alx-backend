import { createClient, print} from "redis";

const client = createClient();

client.on('error', err => console.log('Redis client connected to the server:', err));

client.on('connect', () => {
    console.log('Redis client connected to the server');
    
    displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    displaySchoolValue('HolbertonSanFrancisco');
})
function setNewSchool(schoolName, value) {
    client.set(schoolName, value);
}

function displaySchoolValue(schoolName) {
    const value = client.get(schoolName, (err, val) => {
        if (err) {
            console.log(`Error occured while getting ${schoolName}`);
        }
        else
        {
            console.log(`${val}`)
        }
    });
}