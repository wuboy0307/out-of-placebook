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

ActiveRecord::Schema.define(version: 20170313022713) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_trgm"

  create_table "activities", force: :cascade do |t|
    t.integer  "user_id",              null: false
    t.string   "activity_source_type", null: false
    t.integer  "activity_source_id",   null: false
    t.string   "activity_parent_type", null: false
    t.integer  "activity_parent_id",   null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["activity_parent_id", "activity_source_type", "activity_parent_type", "created_at"], name: "activity_index", using: :btree
    t.index ["activity_parent_type", "activity_parent_id"], name: "index_activities_on_activity_parent_type_and_activity_parent_id", using: :btree
    t.index ["activity_source_type", "activity_source_id"], name: "index_activities_on_activity_source_type_and_activity_source_id", using: :btree
    t.index ["user_id", "created_at"], name: "index_activities_on_user_id_and_created_at", using: :btree
  end

  create_table "channel_subs", force: :cascade do |t|
    t.integer  "participant_id",  null: false
    t.integer  "channel_id",      null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.datetime "last_fetch_time"
    t.index ["channel_id"], name: "index_channel_subs_on_channel_id", using: :btree
    t.index ["participant_id"], name: "index_channel_subs_on_participant_id", using: :btree
  end

  create_table "channels", force: :cascade do |t|
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "author_id",    null: false
    t.integer  "post_id",      null: false
    t.integer  "parent_id"
    t.text     "body",         null: false
    t.string   "content_type"
    t.integer  "content_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["author_id"], name: "index_comments_on_author_id", using: :btree
    t.index ["content_type", "content_id"], name: "index_comments_on_content_type_and_content_id", using: :btree
    t.index ["parent_id"], name: "index_comments_on_parent_id", using: :btree
    t.index ["post_id"], name: "index_comments_on_post_id", using: :btree
  end

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.integer  "friend_id",                  null: false
    t.boolean  "completed",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["completed"], name: "index_friendships_on_completed", using: :btree
    t.index ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
    t.index ["user_id"], name: "index_friendships_on_user_id", using: :btree
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "liker_id",      null: false
    t.string   "likeable_type", null: false
    t.integer  "likeable_id",   null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id", using: :btree
    t.index ["liker_id"], name: "index_likes_on_liker_id", using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id",  null: false
    t.integer  "channel_id", null: false
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_messages_on_channel_id", using: :btree
    t.index ["created_at"], name: "index_messages_on_created_at", using: :btree
    t.index ["sender_id"], name: "index_messages_on_sender_id", using: :btree
  end

  create_table "photos", force: :cascade do |t|
    t.integer  "user_id",            null: false
    t.integer  "album_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.index ["album_id"], name: "index_photos_on_album_id", using: :btree
    t.index ["user_id"], name: "index_photos_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "wall_id",      null: false
    t.integer  "author_id",    null: false
    t.integer  "parent_id"
    t.text     "body"
    t.string   "content_type"
    t.integer  "content_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["author_id"], name: "index_posts_on_author_id", using: :btree
    t.index ["content_type", "content_id"], name: "index_posts_on_content_type_and_content_id", using: :btree
    t.index ["parent_id"], name: "index_posts_on_parent_id", using: :btree
    t.index ["wall_id"], name: "index_posts_on_wall_id", using: :btree
  end

  create_table "urls", force: :cascade do |t|
    t.string   "url",         null: false
    t.text     "title"
    t.text     "description"
    t.string   "image"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "fname",               null: false
    t.string   "lname",               null: false
    t.string   "email",               null: false
    t.string   "session_token",       null: false
    t.string   "password_digest",     null: false
    t.text     "home"
    t.text     "work"
    t.text     "from"
    t.text     "intro"
    t.text     "description"
    t.string   "cover_url"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "avatar_url"
    t.datetime "last_fetch_time"
    t.datetime "last_friend_fetch"
    t.datetime "last_message_fetch"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "cover_file_name"
    t.string   "cover_content_type"
    t.integer  "cover_file_size"
    t.datetime "cover_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["fname"], name: "index_users_on_fname", using: :btree
    t.index ["lname"], name: "index_users_on_lname", using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  end

end
