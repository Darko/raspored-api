import User from '../../models/user';

export function profile(req, res, next) {
  const { userId } = req.params;
  const query = { _id: userId };

  User.findOne(query, '_id avatar name email')
  .then(user => {
    if (!user) return res.boom.notFound();

    return res.send(user);
  })
  .catch(next);
}