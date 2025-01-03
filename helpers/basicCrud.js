const { default: mongoose } = require('mongoose')
const { createCustomError, errorRoute } = require('../errors/custom-error')
const { createSuccessMessage } = require('../success/custom-success')
const { makeActionHistory } = require('./actionHistory')
const { compareValues } = require('./compareValues')

class basicCrud {
  async set(input, res, next, results, req, schema, existControl, filterValue) {
    try {
      console.log('innn-----', input)

      if (Object.keys(existControl).length > 0) {
        for (const key in existControl) {
          if (input.hasOwnProperty(key)) {
            const query = { isActive: true }
            query[key] = { $regex: new RegExp(`^${input[key]}$`, 'i') }
            const existDepartmant = await schema.findOne(query)

            if (existDepartmant) {
              return next(
                createCustomError(2011, errorRoute.Enum.admin, input[key]),
              )
            }
          }
        }
      }

      const newDepartman = new schema({
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...input,
      })

      const insertDepartman = await newDepartman.save()
      return next(createSuccessMessage(2007, insertDepartman))
    } catch (error) {
      console.log('errrr', error)
      return next(createCustomError(9000, errorRoute.Enum.general))
    }
  }

  async update(
    input,
    res,
    next,
    results,
    req,
    schema,
    existControl,
    filterValue,
  ) {
    console.log('innnn', input)

    const { userId, updatedId, ...updatedValues } = input
    try {
      const checkExistValue = await schema.findOne({
        _id: updatedId,
        isActive: true,
      })

      if (!checkExistValue) {
        return next(createCustomError(2011, errorRoute.Enum.admin))
      }

      if (Object.keys(existControl).length > 0) {
        for (const key in existControl) {
          if (input.hasOwnProperty(key)) {
            const query = { isActive: true }
            query[key] = { $regex: new RegExp(`^${input[key]}$`, 'i') }
            const existDepartmant = await schema.find(query)

            // if (existDepartmant.length >= 1 && (existDepartmant[0]._id != updatedId)) {
            //     return next(createCustomError(2011, errorRoute.Enum.admin, input[key]));
            // }
          }
        }
      }

      let updateResult = await schema.findOneAndUpdate(
        { _id: updatedId, isActive: true },
        {
          $set: updatedValues,
        },
        { new: true },
      )

      let differences = await compareValues(checkExistValue, updateResult._doc)

      await makeActionHistory(schema, updatedId, 'update', userId, differences)

      return next(createSuccessMessage(2003))
    } catch (error) {
      console.log(error)
      return next(createCustomError(9000, errorRoute.Enum.general))
    }
  }

  async delete(input, res, next, results, req, schema) {
    const { userId, deletedId } = input
    try {
      const checkExistValue = await schema.findOne({
        _id: deletedId,
        isActive: true,
      })

      if (!checkExistValue) {
        return next(createCustomError(2011, errorRoute.Enum.admin))
      }

      let updateResult = await schema.findOneAndUpdate(
        { _id: deletedId },
        { isActive: false },
        { new: true },
      )

      let differences = await compareValues(checkExistValue, updateResult._doc)

      await makeActionHistory(schema, deletedId, 'delete', userId, differences)

      return next(createSuccessMessage(2016))
    } catch (error) {
      console.log(error)
      return next(createCustomError(9000, errorRoute.Enum.general))
    }
  }

  async get(input, res, next, results, req, schema, existControl, filterValue) {
    try {
      const query = { isActive: true }

      for (const key in input) {
        if (key !== 'userId') {
          if (key == 'dataId') {
            query['_id'] = input[key]
          } else {
            query[key] = input[key]
          }
        }
      }

      const values = await schema.find(query)

      //TO DO
      //Bunu da metod haline getir , dışardan alsın neleri dönmek istemediğini bu get metodu

      return next(createSuccessMessage(2000, values))
    } catch (error) {
      console.log(error)
      return next(createCustomError(9000, errorRoute.Enum.general))
    }
  }
}

module.exports = new basicCrud()
