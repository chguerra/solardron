# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151215114138) do

  create_table "clients", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hotspots", force: :cascade do |t|
    t.integer  "report_id"
    t.integer  "date"
    t.integer  "hotspot_id"
    t.float    "coord_x"
    t.float    "coord_y"
    t.float    "max_temp"
    t.float    "min_temp"
    t.integer  "hotspot_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "hidden"
  end

  add_index "hotspots", ["report_id"], name: "index_hotspots_on_report_id"

  create_table "reports", force: :cascade do |t|
    t.datetime "date"
    t.integer  "solarplant_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "reports", ["solarplant_id"], name: "index_reports_on_solarplant_id"

  create_table "solarplants", force: :cascade do |t|
    t.float    "coord_x"
    t.float    "coord_y"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "zoom"
    t.integer  "client_id"
  end

  add_index "solarplants", ["client_id"], name: "index_solarplants_on_client_id"

end
