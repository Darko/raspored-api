import mongoose from 'mongoose';
import Subject from '../../models/subject';
import { Exam } from '../../models/subject';
import _ from 'lodash';

export function index(req, res, next) {
  const { faculty } = req.query;

  if (!faculty) return res.boom.badRequest('Missing query param "faculty"');

  Subject.find({ faculty })
  .then((subjects = []) => res.send(subjects))
  .catch(next);
}

export function create(req, res, next) {
  const newSubject = new Subject(req.body);

  newSubject.save()
  .then(subject => res.send(subject))
  .catch(next);
}

export function createExam(req, res, next) {
  const { subject } = req.params;

  Subject.findOne({ _id: subject })
  .then(subject => {
    if (!subject) return res.boom.notFound('Subject not found');

    const exam = new Exam(req.body);
    subject.exams.push(exam);
    return subject.save();
  })
  .then(subject => res.send(subject))
  .catch(next);
}

export function updateExam(req, res, next) {
  const { subject, exam } = req.params;

  if (!subject || !exam) return res.boom.badRequest();

  Subject.findOne({ _id: subject })
  .then(subject => {
    const examToUpdate = subject.exams.id(exam);
    examToUpdate.set({ isFinal: req.body.isFinal });

    return subject.save();
  })
  .then(subject => res.send(subject))
  .catch(next);
}

export function removeExam(req, res, next) {
  const { subject, exam } = req.params;

  if (!subject || !exam) return res.boom.badRequest();

  Subject.findOne({ _id: subject })
  .then(subject => {
    const doc = subject.exams.id(exam).remove();

    return subject.save();
  })
  .then(subject => res.send(subject))
  .catch(next);
}