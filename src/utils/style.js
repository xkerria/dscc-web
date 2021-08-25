export default {
  unit(val) {
    const str = val + ''
    const units = ['px', '%', 'em', 'rem']
    for (let i = 0; i < units.length; i++) {
      if (str.includes(units[i])) return str
    }
    return val + 'px'
  }
}
