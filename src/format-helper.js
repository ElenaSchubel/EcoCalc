export function formatCurrency(money) {
  if (money >= 0) {
    return "$" + money.toFixed(2)
  } else {
    return "-$" + Math.abs(money).toFixed(2)
  }
}

export function formatTime(time) {
  return "" + time.toFixed(2) + " hr"
}

export function formatPoints(points) {
  if (points > 0) {
    return "-" + points.toFixed(2)
  } else {
    return "+" + Math.abs(points).toFixed(2)
  }
}
