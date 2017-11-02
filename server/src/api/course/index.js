import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Course, { schema } from './model'

const router = new Router()
const { name, date, description, totalvids, users_id } = schema.tree
const requestBody = { name, date, description, totalvids, users_id }
const pedirToken = false

/**
 * @api {post} /courses Create course
 * @apiName CreateCourse
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Course's name.
 * @apiParam date Course's date.
 * @apiParam description Course's description.
 * @apiParam users_id Course's users_id.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: pedirToken }),
  body(requestBody),
  create)

/**
 * @api {get} /courses Retrieve courses
 * @apiName RetrieveCourses
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} courses List of courses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: pedirToken }),
  query(),
  index)

/**
 * @api {get} /courses/:id Retrieve course
 * @apiName RetrieveCourse
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: pedirToken }),
  show)

/**
 * @api {put} /courses/:id Update course
 * @apiName UpdateCourse
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Course's name.
 * @apiParam date Course's date.
 * @apiParam description Course's description.
 * @apiParam users_id Course's users_id.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: pedirToken }),
  body(requestBody),
  update)

/**
 * @api {delete} /courses/:id Delete course
 * @apiName DeleteCourse
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Course not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: pedirToken }),
  destroy)

export default router
