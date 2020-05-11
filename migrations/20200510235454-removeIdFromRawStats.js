exports.up = function(db) {
  return db.removeColumn('raw_stats', 'id');
};

exports.down = function(db) {
  return db.addColumn('raw_stats', 'id', { type: 'int', primaryKey: true });
};