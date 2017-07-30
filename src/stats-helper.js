import some from "lodash/some"
import every from "lodash/every"

export function hasStats(groups) {
  return some(groups.filter(group => group.expanded), allBaselines)
}

export function allBaselines(group) {
  return every(group.items, item => item.baseline !== null)
}
