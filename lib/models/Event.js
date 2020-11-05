const pool = require('../utils/pool');

module.exports = class Event {
  id;
  title;
  description;
  start;
  end;
  allDay;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.event_description;
    this.start = row.start;
    this.end = row.end;
    this.allDay = row.all_day;
  }

  static async insert(event) {
    const { rows } = await pool.query(
      'INSERT INTO events (title, event_description, start, end, all_day) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [event.title, event.description, event.start, event.end, event.allDay]
    );

    return new Event(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM events'
    );

    return rows.map(row => new Event(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM events WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Event(rows[0]);
  }

  static async update(event) {
    const { rows } = await pool.query(
      `UPDATE events
       SET title=$1,
           event_description=$2,
           start=$3,
           end=$4,
           all_day=$5
       WHERE id=$6
       RETURNING *
       `,
      [event.title, event.description, event.start, event.end, event.allDay, event.id]
    );

    return new Event(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM events WHERE id=$1 RETURNING *',
      [id]
    );

    return new Event(rows[0]);
  }
};
