import Subscription from '../../models/subscription';

export function index(req, res, next) {
  Subscription.find({ user: req.user._id })
  .populate('subject')
  .then((subscriptions = []) => res.send(subscriptions))
  .catch(next);
}

export function show(req, res, next) {
  const { subscriptionId } = req.query;
  Subscription.findOne({ _id: subscriptionId })
  .then(subscription => {
    if (!subscription) {
      return res.boom.notFound();
    }

    return res.send(subscription);
  })
  .catch(next);
}

export function subscribe(req, res, next) {
  const { subjectId } = req.body;

  const newSubscription = new Subscription({
    user: req.user._id,
    subject: subjectId
  });

  newSubscription.save()
  .then(subscription => res.send(subscription))
  .catch(next);
}

export function unsubscribe(req, res, next) {
  const { subscriptionId } = req.query;

  Subscription.findOne({ _id: subscriptionId })
  .then(subscription => {
    if (!subscription) return res.boom.notFound();

    return subscription.remove();
  })
  .then(() => res.sendStatus(204))
  .catch(next);
}