import Subject from '../../models/subject';

export function index(req, res, next) {
  Subject.find()
  .then((subjects = []) => res.json(subjects))
  .catch(next);
}

export function create(req, res, next) {
  const { name, start, duration } = req.body;

  if (!name) {
    return res.boom.badRequest('Missing property: name', req.body);
  }

  const newSubject = new Class({
    name,
    start,
    duration
  });

  newSubject.save()
  .then(subject => res.json(subject))
  .catch(next);
}