export function isMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /(Android|iPad|iPhone|iPod)/i.test(userAgent);
}

export default {
  isMobileOS,
};
