import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import interviewController from '../controller/interview.controller.js'
import upload from '../middleware/file.middleware.js'

const interviewRouter =express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description ,resume pdf and job description
 * @access private 
 */

interviewRouter.post('/',authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)


/**
 * @route POST /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private 
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportById)

/**
 * @route POST /api/interview/
 * @description get all interview report of logged in user
 * @access private 
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportscontroller)

/**
 * @route POST /api/interview/resume/pdf
 * @description get all interview report of logged in user
 * @access private 
 */

interviewRouter.post('/resume/pdf/:interviewReportId',authMiddleware.authUser,interviewController.generateResumePdfController)


export default interviewRouter