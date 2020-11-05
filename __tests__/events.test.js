const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Event = require('../lib/models/Event');

describe('lab-35-fullstack-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates an Event via POST', () => {
    return request(app)
      .post('/api/v1/events')
      .send({
        title: 'test title',
        description: 'test description',
        start: '2020-11-6 22:00:00 -8:00',
        end: '2020-11-6 24:00:00 -8:00',
        allDay: false
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          title: 'test title',
          description: 'test description',
          start: '2020-11-07T06:00:00.000Z',
          end: '2020-11-07T08:00:00.000Z',
          allDay: false
        });
      });
  });
});
