exports.up = function(db) {
  return db.addColumn('raw_stats', 'user', { type: 'text' });
};

exports.down = function(db) {
  return db.removeColumn('raw_stats', 'user');
};