const shuffleArray = <T>(arr: T[]): T[] =>
  arr
    .map((data) => ({ data, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ data }) => data);

export default shuffleArray;
