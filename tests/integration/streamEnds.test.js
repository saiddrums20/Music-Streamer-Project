const {Stream} = require('../../models/stream');
const mongoose = require('mongoose');
const request = require('supertest');
const {User} = require('../../models/user');

let server;
let customerId; 
let trackId;
let stream;
let token;

describe('/api/streamEnds', () => {
    
    const exec = () => {
        return request(server)
            .post('/api/streamEnds')
            .set('x-auth-token', token)
            .send({ customerId: customerId, trackId: trackId});
    };
    
    beforeEach( async () => { 
        server = require('../../index');

        customerId = mongoose.Types.ObjectId();
        trackId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        stream = new Stream({
            customer: {
                _id: customerId,
                name: '12345',
                email: '123456789'
            },
            track: {
                _id: trackId,
                title: '12345',
                dailyStreamRate: 2
            }
        });
        await stream.save();
    });
    afterEach( async () => { 
        await server.close();
        await Stream.deleteMany({});
    });

    it('should return 401 if client is not logged in', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 400 if trackId is not provided', async () => {
        trackId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 404 if no stream found for this customer/track', async () => {
        await Stream.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(404);
    });
    it('should return 200 if request is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
    it('should return Stream if input is valid', async () => {
        const res = await exec();
        const streamInDb = await Stream.findById(stream._id);

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateStreamed','customer','track']));
    });
});