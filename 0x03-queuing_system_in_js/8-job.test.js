import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';  // Adjust the path if necessary
import { expect } from 'chai';

const queue = kue.createQueue();

describe('createPushNotificationsJobs', () => {
    beforeEach(() => {
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.clear();
        queue.testMode.exit();
    });

    it('should create the correct number of jobs', () => {
        const jobs = [
            { phoneNumber: '4153518780', message: 'Message 1' },
            { phoneNumber: '4153518781', message: 'Message 2' },
        ];

        createPushNotificationsJobs(jobs, queue);

        const createdJobs = queue.testMode.jobs;
        expect(createdJobs).to.have.lengthOf(jobs.length);
    });

    it('should correctly set job data', () => {
        const jobs = [
            { phoneNumber: '4153518780', message: 'Message 1' },
            { phoneNumber: '4153518781', message: 'Message 2' },
        ];

        createPushNotificationsJobs(jobs, queue);

        const createdJobs = queue.testMode.jobs;
        createdJobs.forEach((job, index) => {
            expect(job.data).to.deep.equal(jobs[index]);
        });
    });

    it('should fire the correct events for each job', () => {
        const jobs = [
            { phoneNumber: '4153518780', message: 'Message 1' },
        ];


    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs(null, queue)).to.throw('Jobs is not an array');
        expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
    });

    it('should handle an empty jobs array', () => {
        createPushNotificationsJobs([], queue);

        const createdJobs = queue.testMode.jobs;
        expect(createdJobs).to.have.lengthOf(0);
    });

    it('should handle duplicate jobs correctly', () => {
        const jobs = [
            { phoneNumber: '4153518780', message: 'Message 1' },
            { phoneNumber: '4153518780', message: 'Message 1' },  // Duplicate
        ];

        createPushNotificationsJobs(jobs, queue);

        const createdJobs = queue.testMode.jobs;
        expect(createdJobs).to.have.lengthOf(jobs.length);
        // Verify that duplicates are handled if necessary
        createdJobs.forEach((job, index) => {
            expect(job.data).to.deep.equal(jobs[index]);
        });
    });
});
