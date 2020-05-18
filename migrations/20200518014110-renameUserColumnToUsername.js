exports.up = function(db) {
  return db.renameColumn('raw_stats', 'user', 'username')

};

exports.down = function(db) {
  return db.renameColumn('raw_stats', 'username', 'user')
};

