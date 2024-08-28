function createPushNotificationsJobs(jobs, queue)
    {
        if (!Array.isArray(jobs))
        {
            throw new Error('Jobs is not an array');
        }
        jobs.forEach((jobData) => {
            const job = queue.create('push_notification_code_3', jobData,)
            .on('enqueue', () => {
                console.log(`Notification job created: ${job.id}`)
            })
            .on('failed attempt', (err) =>{
                if(err) {console.log(`Notification job JOB_ID failed: ${err}`)}
            })
            .on('progress', (progress) => {
              console.log(`Notification job ${job.id} ${progress}% complete`)  
            })
            .on('complete', () => {
                console.log(`Notification job ${job.id} completed`);
            })
            .save()
          })
    }
module.exports=createPushNotificationsJobs;