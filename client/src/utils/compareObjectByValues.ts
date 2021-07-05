export const compare = (obj1: any, obj2: any) => {
  for (let p in obj1) {
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof (obj1[p])) {
      case 'object':
        if (compare(obj1[p], obj2[p])) return false;
        break;
      case 'function':
        if (typeof (obj2[p]) === 'undefined' || obj1[p].toString() !== obj2[p].toString()) return false;
        break;
      default:
        if (obj1[p] !== obj2[p]) return false;
    }
  }

  for (let p in obj2) {
    if (typeof (obj1[p]) === 'undefined') return false;
  }

  return true;
}