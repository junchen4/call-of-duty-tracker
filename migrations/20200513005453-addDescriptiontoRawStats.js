exports.up = function(db) {
  return db.addColumn('raw_stats', 'description', { type: 'text' });
};

exports.down = function(db) {
  return db.removeColumn('raw_stats', 'description');
};