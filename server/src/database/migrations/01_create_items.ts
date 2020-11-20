import Knex from 'knex';

export async function up(knex: Knex) {
    //Create sripts
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
    });
}
export async function down(knex: Knex) {
    //Delete scripts
    return knex.schema.dropTableIfExists('items');
}