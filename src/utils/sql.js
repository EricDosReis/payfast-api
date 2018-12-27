module.exports = {
  prepareInsert(entity) {
    return Object.keys(entity).join(',');
  },

  prepareUpdate(entity) {
    return `${Object.keys(entity).join(' = ?, ')} = ?`;
  },
}