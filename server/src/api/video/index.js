import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Video, { schema } from './model'

const router = new Router()
const { url, name, description, number, course_id } = schema.tree

// ESTA VARIABLE DETERMINA SI SE PIDE TOKEN O NO
const pedirToken = true






/**
 * @api {post} /videos Create video
 * @apiName CreateVideo
 * @apiGroup Video
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam url Video's url.
 * @apiParam name Video's name.
 * @apiParam description Video's description.
 * @apiParam number Video's number.
 * @apiParam course_id Video's course_id.
 * @apiSuccess {Object} video Video's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Video not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: pedirToken }),
  body({ url, name, description, number, course_id }),
  create)

/**
 * @api {get} /videos Retrieve videos
 * @apiName RetrieveVideos
 * @apiGroup Video
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} videos List of videos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: pedirToken }),
  query(),
  index)

/**
 * @api {get} /videos/:id Retrieve video
 * @apiName RetrieveVideo
 * @apiGroup Video
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} video Video's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Video not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: pedirToken }),
  show)

/**
 * @api {put} /videos/:id Update video
 * @apiName UpdateVideo
 * @apiGroup Video
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam url Video's url.
 * @apiParam name Video's name.
 * @apiParam description Video's description.
 * @apiParam number Video's number.
 * @apiParam course_id Video's course_id.
 * @apiSuccess {Object} video Video's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Video not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: pedirToken }),
  body({ url, name, description, number, course_id }),
  update)

/**
 * @api {delete} /videos/:id Delete video
 * @apiName DeleteVideo
 * @apiGroup Video
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Video not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: pedirToken }),
  destroy)

export default router
