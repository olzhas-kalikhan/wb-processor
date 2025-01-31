import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("commissions", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid());
        table.integer("subject_id").unique();
        table.string("subject_name");
        table.integer("parent_id");
        table.string("parent_name");
        table.float("kgvp_marketplace");
        table.float("kgvp_supplier");
        table.float("kgvp_supplierExpress");
        table.float("paid_storageKgvp");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("commissions");
}
