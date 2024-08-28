import kue from "kue";
const queue= kue.createQueue();

const job = queue.create('push_notification_code',
    {
        'phoneNumber': '00011122344',
        'message': 'Hello World',
    }).on('enqueue', () => {
        console.log(`Notification job created: ${job.id}`)
    })
    .on('complete', () => {
        console.log("Notification job completed")
    })
    .on('failed attempt', () => {
        console.log("Notification job failed");
    })
    .save()