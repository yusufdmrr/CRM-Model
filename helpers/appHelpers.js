const { Apartment } = require('../models/apartment')
const { Project } = require('../models/project')
const { Task } = require('../models/task')

const excelKeys = ['GOREV_ACIKLAMASI', 'GOREV_KATEGORISI', 'GOREV_ADI']

async function controlExcelParams(allData, res, next) {
  let error

  for (const data of allData) {
    for (const key in data) {
      const accept = excelKeys.includes(key)
      if (!accept) {
        error = {
          errorCode: 3000,
          params: key,
        }
      }
    }
  }
  return error
}

async function updateStructureCompletion(type, structureId) {
  try {
    let structure

    //console.log("type", type);
    //console.log("structureId", structureId);

    // 1. Type parametresine göre ilgili yapıyı sorgula
    switch (type) {
      case 'apartment':
        // Apartment modelini sorgularken structureId bir nesne olmalı
        structure = await Apartment.findById(structureId)
        if (!structure) throw new Error('Apartman bulunamadı')
        break

      case 'floor':
        // Floor, Project modelinde yer alıyor ve iç içe alt belgelerden çekilmeli
        let projectWithFloor = await Project.findOne({
          'blocks.floors._id': structureId,
        })

        // Yapının içindeki uygun floor'ı bul
        let foundFloor = null

        // blocks içinde dolaşarak uygun floor'ı bul
        for (const block of projectWithFloor.blocks) {
          for (const floor of block.floors) {
            if (floor._id.toString() === structureId) {
              foundFloor = floor

              break
            }
          }
          if (foundFloor) break
        }

        if (!foundFloor) throw new Error('Kat içeriği bulunamadı')

        structure = foundFloor
        //console.log("structure", structure);
        if (!structure) throw new Error('Kat içeriği bulunamadı')
        break

      case 'block':
        // Block, Project modelinde yer alıyor ve iç içe alt belgelerden çekilmeli
        let projectWithBlock = await Project.findOne({
          'blocks._id': structureId,
        })

        // Yapının içindeki uygun floor'ı bul
        let foundBlock = null

        // blocks içinde dolaşarak uygun floor'ı bul
        for (const block of projectWithBlock.blocks) {
          if (block._id.toString() === structureId) {
            foundBlock = block
            //console.log("foundFloor", foundFloor);
            break
          }
          if (foundBlock) break
        }

        if (!foundBlock) throw new Error('Kat içeriği bulunamadı')

        structure = foundBlock
        //console.log("structure", structure);
        if (!structure) throw new Error('Kat içeriği bulunamadı')

        break

      case 'project':
        structure = await Project.findById(structureId)
        if (!structure) throw new Error('Proje bulunamadı')
        break

      default:
        throw new Error('Geçersiz yapı türü')
    }

    //     console.log("structure.tasks", structure.tasks);

    const tasks = await Task.find({
      _id: { $in: structure.tasks },
    })
      .lean()
      .exec()

    console.log('tasks', tasks)

    // 2. Yapının tamamlanma yüzdesini hesapla
    let totalWeightedCompletion = 0
    let totalDifficultyLevel = 0

    tasks.forEach((task) => {
      totalWeightedCompletion += task.difficultyLevel * task.percentComplete
      totalDifficultyLevel += task.difficultyLevel
    })

    const overallCompletionPercentage =
      totalWeightedCompletion / totalDifficultyLevel

    // console.log("overallCompletionPercentage", overallCompletionPercentage);

    // 3. Tamamlanma yüzdesini yapıya kaydet ve güncelle
    structure.percentageCompletion = overallCompletionPercentage

    // console.log("totalWeightedCompletion",totalWeightedCompletion)
    // console.log("totalDifficultyLevel",totalDifficultyLevel)

    if (type === 'apartment') {
      await structure.save() // Apartment modelinde kaydetme
    } else if (type === 'floor') {
      await Project.findOneAndUpdate(
        { 'blocks.floors._id': structureId }, // Yapının içindeki floor'ı bul
        {
          $set: {
            'blocks.$[block].floors.$[floor].percentageCompletion':
              overallCompletionPercentage,
          },
        }, // Dinamik olarak floor'un tamamlanma yüzdesini güncelle
        {
          arrayFilters: [
            { 'block.floors._id': structureId }, // İç içe blok içindeki doğru floor'u hedefle
            { 'floor._id': structureId }, // Floor içindeki doğru floor'u hedefle
          ],
          new: true,
        },
      )
    } else if (type === 'block') {
      await Project.findOneAndUpdate(
        { 'blocks._id': structureId }, // Yapının içindeki floor'ı bul
        {
          $set: {
            'blocks.$[block].percentageCompletion': overallCompletionPercentage,
          },
        }, // Dinamik olarak floor'un tamamlanma yüzdesini güncelle
        {
          arrayFilters: [
            { 'block._id': structureId }, // İç içe blok içindeki doğru floor'u hedefle
          ],
          new: true,
        },
      )
    } else if (type === 'project') {
      await structure.save()
    }

    console.log(
      `${type} başarıyla güncellendi ve tamamlanma yüzdesi kaydedildi.`,
    )
  } catch (error) {
    console.error('Güncelleme hatası:', error.message)
  }
}

module.exports = {
  updateStructureCompletion,
  controlExcelParams,
}
