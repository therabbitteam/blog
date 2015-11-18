/*
 * Debug a object from template
 */
module.exports = function(object, info) {
  console.log("=================")
  console.log(info);
  console.log(object);
  console.log("=================")
  return object;
}
