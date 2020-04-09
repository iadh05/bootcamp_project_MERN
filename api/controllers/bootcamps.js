import Bootcamp from '../models/Bootcamp.js';

import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';
// @desc  Get all bootcamps
// @route  Get api/v1/bootcamps
// @access  Public
export const getBootcamps = asyncHandler(async function (req, res, next) {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    data: bootcamps,
  });
});

// @desc  add bootcamps
// @route  post api/v1/bootcamps
// @acces  Public
export const postBootcamps = asyncHandler(async function (req, res, next) {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc  update  bootcamps
// @route  PUT api/v1/bootcamps/:id
// @access  Public
export const updateBootcamps = asyncHandler(async function (req, res, next) {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Ressource not found with the  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc  get one  bootcamps
// @route  get one api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = asyncHandler(async function (req, res, next) {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Ressource not found with the  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc  delete  bootcamps
// @route  DELETE api/v1/bootcamps/:id
// @access  Public
export const deleteBootcamps = asyncHandler(async function (req, res, next) {
  await Bootcamp.findByIdAndRemove(req.params.id);

  res.status(204).json({
    success: true,
  });
});
