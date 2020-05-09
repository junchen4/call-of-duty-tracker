exports.up = function(db) {
  return db.createTable('raw_stats', {
    id: { type: 'int', primaryKey: true },
    data: 'json',
    download_time: 'timestamptz'
  });
};

exports.down = function(db) {
  return db.dropTable('raw_stats');
};