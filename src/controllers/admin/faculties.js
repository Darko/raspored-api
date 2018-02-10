import Faculty from '../../models/faculty';

export function index(req, res, next) {
  Faculty.find()
  .then((faculties = []) => res.send(faculties))
  .catch(next);
}

export function create(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.boom.badRequest('Missing property: name', req.body);
  }

  const newFaculty = new Faculty({
    name
  });

  newFaculty.save()
  .then(faculty => res.send(faculty))
  .catch(next);
}