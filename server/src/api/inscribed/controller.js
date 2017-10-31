import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Inscribed } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Inscribed.create(body)
    .then((inscribed) => inscribed.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Inscribed.find(query, select, cursor)
    .then((inscribeds) => inscribeds.map((inscribed) => inscribed.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Inscribed.findById(params.id)
    .then(notFound(res))
    .then((inscribed) => inscribed ? inscribed.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Inscribed.findById(params.id)
    .then(notFound(res))
    .then((inscribed) => inscribed ? _.merge(inscribed, body).save() : null)
    .then((inscribed) => inscribed ? inscribed.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Inscribed.findById(params.id)
    .then(notFound(res))
    .then((inscribed) => inscribed ? inscribed.remove() : null)
    .then(success(res, 204))
    .catch(next)
