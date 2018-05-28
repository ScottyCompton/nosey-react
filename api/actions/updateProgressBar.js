export default function updateProgressBar(req) {
  return Promise.resolve({ percentage: req.body.percentage });
}
