import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Video } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Video.create(body)
    .then((video) => video.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Video.find(query, select, cursor)
    .then((videos) => videos.map((video) => video.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Video.findById(params.id)
    .then(notFound(res))
    .then((video) => video ? video.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Video.findById(params.id)
    .then(notFound(res))
    .then((video) => video ? _.merge(video, body).save() : null)
    .then((video) => video ? video.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Video.findById(params.id)
    .then(notFound(res))
    .then((video) => video ? video.remove() : null)
    .then(success(res, 204))
    .catch(next)
