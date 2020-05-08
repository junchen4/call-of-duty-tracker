'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('raw_stats', {
    id: { type: 'int', primaryKey: true },
    data: 'json'
  }, callback);
};

exports.down = function(db) {
  db.dropTable('raw_stats', callback);
};

exports._meta = {
  "version": 1
};