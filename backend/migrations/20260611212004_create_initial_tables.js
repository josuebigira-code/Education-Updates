/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('admins', table => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('news', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('excerpt').notNullable();
      table.text('body').notNullable();
      table.string('tag');
      table.string('tagColor');
      table.string('source');
      table.string('date');
      table.string('province');
      table.string('readTime');
      table.string('image');
      table.string('linkUrl');
      table.string('linkLabel');
      table.boolean('featured').defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable('videos', table => {
      table.increments('id').primary();
      table.string('ytId').notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.string('category');
      table.string('duration');
      table.string('views');
      table.string('date');
      table.boolean('featured').defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable('scholarships', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.text('eligibility');
      table.string('provider');
      table.string('country');
      table.string('deadline');
      table.string('level');
      table.string('status');
      table.string('amount');
      table.string('applyUrl');
      table.string('image');
      table.timestamps(true, true);
    })
    .createTable('resources', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('desc');
      table.string('category');
      table.string('icon');
      table.string('count');
      table.string('color');
      table.string('colorPale');
      table.string('pdfUrl');
      table.string('coverImage');
      table.timestamps(true, true);
    })
    .createTable('gallery', table => {
      table.increments('id').primary();
      table.string('label').notNullable();
      table.string('caption');
      table.integer('span').defaultTo(1);
      table.string('image');
      table.string('bg');
      table.timestamps(true, true);
    })
    .createTable('team', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('role');
      table.text('bio');
      table.string('image');
      table.string('grad');
      table.string('email');
      table.string('twitter');
      table.string('linkedin');
      table.timestamps(true, true);
    })
    .createTable('subscribers', table => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.timestamps(true, true);
    })
    .createTable('contacts', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('phone');
      table.string('subject');
      table.text('message');
      table.boolean('is_read').defaultTo(false);
      table.timestamp('submitted_at').defaultTo(knex.fn.now());
    })
    .createTable('stats', table => {
      table.increments('id').primary();
      table.string('subscribers');
      table.string('videos');
      table.integer('provinces');
      table.integer('schools');
      table.integer('scholarships');
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('stats')
    .dropTableIfExists('contacts')
    .dropTableIfExists('subscribers')
    .dropTableIfExists('team')
    .dropTableIfExists('gallery')
    .dropTableIfExists('resources')
    .dropTableIfExists('scholarships')
    .dropTableIfExists('videos')
    .dropTableIfExists('news')
    .dropTableIfExists('admins');
};
