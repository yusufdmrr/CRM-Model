/* eslint-disable no-unused-vars */
const { createCustomError, errorRoute } = require('../../errors/custom-error')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const mongoose = require('mongoose')
const crypto = require('crypto')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const { createSuccessMessage } = require('../../success/custom-success')
const fs = require('fs').promises
const xlsx = require('xlsx')
const { Project } = require('../../models/project')
const { Task } = require('../../models/task')
const { Authority } = require('../../models/user')
const { sendEmail } = require('../../helpers/mail')
const { TaskGroup } = require('../../models/taskGroup')
const { Notification } = require('../../models/notification')
const {projectExpenseType, projectExpense,} = require('../../models/projectExpense')
const { Customer } = require('../../models/customer')
const { authorizedPerson } = require('../../models/customer')
const { completedPercent } = require('../../helpers/notificationCron')

const setCustomer = async (input, res, next) => {
  try {
    const {
      companyName,
      companyType,
      taxNumber,
      taxOffice,
      address,
      email,
      phone,
      sector,
      workingLanguage,
      customerStatus,
      customerNotes,
      isActive,
      authorizedPerson,
    } = input

    const newCustomer = new Customer({
      companyName,
      companyType,
      taxNumber,
      taxOffice,
      address,
      email,
      phone,
      sector,
      workingLanguage,
      customerStatus,
      customerNotes,
      isActive: isActive !== undefined ? isActive : true,
      authorizedPerson,
    })

    const result = await newCustomer.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.custom))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deleteCustomer = async (input, res, next) => {
  try {
    const { customerId } = input

    const result = await Customer.findByIdAndUpdate(
      customerId,
      { isActive: false },
      { new: true },
    )

    if (!result) {
      return next(createCustomError(1002, errorRoute.Enum.custom))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getCustomer = async (input, res, next) => {
  try {
    const { customerId } = input
    let result

    if (customerId) {
      result = await Customer.findOne({ _id: customerId })
      if (!result) {
        return next(createCustomError(1002, errorRoute.Enum.custom))
      }
    } else {
      result = await Customer.find({ isActive: true })
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const updateCustomer = async (input, res, next) => {
  try {
    const {
      customerId,
      companyName,
      companyType,
      taxNumber,
      taxOffice,
      address,
      email,
      phone,
      sector,
      workingLanguage,
      customerStatus,
      customerNotes,
      isActive,
      authorizedPerson,
    } = input

    const customer = await Customer.findById(customerId)

    if (!customer) {
      return next(createCustomError(1002, errorRoute.Enum.custom))
    }

    const updateData = {
      companyName,
      companyType,
      taxNumber,
      taxOffice,
      address,
      email,
      phone,
      sector,
      workingLanguage,
      customerStatus,
      customerNotes,
      isActive: isActive !== undefined ? isActive : customer.isActive,
      authorizedPerson,
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    if (!updatedCustomer) {
      return next(createCustomError(1002, errorRoute.Enum.custom))
    }

    return next(createSuccessMessage(2006, updatedCustomer))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const setAuthorizedPerson = async (input, res, next) => {
  try {
    const { name, phone, email } = input

    const newAuthorizedPerson = new authorizedPerson({ name, phone, email })

    const result = await newAuthorizedPerson.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.custom))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getAuthorizedPerson = async (input, res, next) => {
  try {
    const { authorizedPersonId } = input
    let result

    if (authorizedPersonId) {
      result = await authorizedPerson.findOne({ _id: authorizedPersonId })
      if (!result) {
        return next(createCustomError(1002, errorRoute.Enum.custom))
      }
    } else {
      result = await authorizedPerson.find({ isActive: true })
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deleteAuthorizedPerson = async (input, res, next) => {
  try {
    const { authorizedPersonId } = input

    const result = await authorizedPerson.findByIdAndDelete(authorizedPersonId)

    if (!result) {
      return next(createCustomError(1002, errorRoute.Enum.custom))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

module.exports = {
  setCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  setAuthorizedPerson,
  deleteAuthorizedPerson,
  getAuthorizedPerson,
}
