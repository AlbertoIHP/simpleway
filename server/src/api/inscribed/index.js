import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Inscribed, { schema } from './model'

const router = new Router()
const { users_id, course_id, date, completed } = schema.tree
// ESTA VARIABLE DETERMINA SI SE PIDE TOKEN O NO
const pedirToken = false






/**
 * @api {post} /inscribeds Create inscribed
 * @apiName CreateInscribed
 * @apiGroup Inscribed
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam users_id Inscribed's users_id.
 * @apiParam course_id Inscribed's course_id.
 * @apiParam date Inscribed's date.
 * @apiParam completed Inscribed's completed.
 * @apiSuccess {Object} inscribed Inscribed's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inscribed not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: pedirToken }),
  body({ users_id, course_id, date, completed }),
  create)

/**
 * @api {get} /inscribeds Retrieve inscribeds
 * @apiName RetrieveInscribeds
 * @apiGroup Inscribed
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} inscribeds List of inscribeds.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: pedirToken }),
  query(),
  index)

/**
 * @api {get} /inscribeds/:id Retrieve inscribed
 * @apiName RetrieveInscribed
 * @apiGroup Inscribed
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} inscribed Inscribed's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inscribed not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: pedirToken }),
  show)

/**
 * @api {put} /inscribeds/:id Update inscribed
 * @apiName UpdateInscribed
 * @apiGroup Inscribed
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam users_id Inscribed's users_id.
 * @apiParam course_id Inscribed's course_id.
 * @apiParam date Inscribed's date.
 * @apiParam completed Inscribed's completed.
 * @apiSuccess {Object} inscribed Inscribed's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inscribed not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: pedirToken }),
  body({ users_id, course_id, date, completed }),
  update)

/**
 * @api {delete} /inscribeds/:id Delete inscribed
 * @apiName DeleteInscribed
 * @apiGroup Inscribed
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Inscribed not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: pedirToken }),
  destroy)

export default router
