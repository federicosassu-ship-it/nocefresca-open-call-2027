const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parts = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m: m - 1, d };
};
/** "7 September 2026" */
export const longDate = (iso: string) => { const { y, m, d } = parts(iso); return `${d} ${months[m]} ${y}`; };
/** "17 Mar" */
export const shortDate = (iso: string) => { const { m, d } = parts(iso); return `${d} ${short[m]}`; };
/** "€1,650" */
export const euro = (n: number) => `€${n.toLocaleString('en-GB')}`;
/** Days between two ISO dates (inclusive of start, exclusive of end) */
export const nights = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
