const { Notification } = require('../models/notification')
const { Project } = require('../models/project')
const cron = require('node-cron')
const { TaskGroup } = require('../models/taskGroup')
const { Task } = require('../models/task')
const { sendEmail } = require('./mail')

cron.schedule('* * * * *', async () => {
  try {
    const today = Date.now() // Şu anki zamanı al (epoch formatında)
    const oneWeekFromNow = today + 7 * 24 * 60 * 60 * 1000 // Bugünden 1 hafta sonrası (epoch formatında)

    // Projeleri al
    const projects = await Project.find({
      endDate: { $gte: today, $lte: oneWeekFromNow }, // EndDate bugünden 1 hafta sonrası arasında olan projeler
    })

    // Bildirim oluştur
    for (const project of projects) {
      const notificationExists = await Notification.findOne({
        userId: project.userId, // Projeye ait kullanıcı
        projectId: project._id, // Projeye ait ID
      })

      // Eğer bildirim zaten varsa yeni bildirim oluşturma
      if (!notificationExists) {
        // Bu projeye ait taskGroupları bul
        const taskGroups = await TaskGroup.find({ projectId: project._id })

        let totalMaterialPrice = 0
        let totalLaborPrice = 0
        let totalAmount = 0
        let totalCompletionCount = 0
        let totalCount = 0

        // Her bir taskGroup için işlemleri yap
        for (let taskGroup of taskGroups) {
          // taskGroup içindeki task'leri bul
          for (let taskEntry of taskGroup.tasks) {
            const task = await Task.findById(taskEntry.taskId)

            if (task) {
              if (task.taskNo !== 'T') {
                totalMaterialPrice += task.materialPrice
                totalLaborPrice += task.laborPrice
                totalAmount += task.totalAmount
                totalCompletionCount += task.completionCount
                totalCount += task.count
              }

              // Task'ın varsa alt görevlerini hesapla
              if (task.children && task.children.length > 0) {
                for (let childTask of task.children) {
                  totalMaterialPrice += childTask.materialPrice
                  totalLaborPrice += childTask.laborPrice
                  totalAmount += childTask.totalAmount
                  totalCompletionCount += childTask.completionCount
                  totalCount += childTask.count

                  // Eğer alt görevlerin de alt görevi varsa, onları da hesapla
                  if (childTask.children && childTask.children.length > 0) {
                    for (let subChildTask of childTask.children) {
                      totalMaterialPrice += subChildTask.materialPrice
                      totalLaborPrice += subChildTask.laborPrice
                      totalAmount += subChildTask.totalAmount
                      totalCompletionCount += subChildTask.completionCount
                      totalCount += subChildTask.count
                    }
                  }
                }
              }
            }
          }
        }

        const notification = new Notification({
          userId: project.userId,
          projectId: project._id,
          message: `Projeniz "${project.name}" için süre 1 haftadan az kaldı!`,
          description: `Projenizde tamamlanmayı bekleyen ${
            totalCount - totalCompletionCount
          } görev var!`,
          notifyAt: oneWeekFromNow, // Bildirimin gönderileceği tarih
        })

        const mailInfo = {
          projectName: project.name,
          message: `Projeniz "${project.name}" için süre 1 haftadan az kaldı!`,
          description: `Projenizde tamamlanmayı bekleyen ${
            totalCount - totalCompletionCount
          } görev var!`,
        }

        await sendEmail('halilkaya17@gmail.com', '', '', '', '', mailInfo)

        await notification.save()
      } else {
      }
    }
  } catch (error) {
    console.error('Cron görevinde hata:', error)
  }
})

const completedPercent = async (projectId, deversedPrice) => {
  const project = await Project.findById(projectId)

  if (!project) {
    return next(createCustomError(1103, errorRoute.Enum.admin))
  }

  let { advance, name, userId } = project

  if (advance) {
    const threshold = advance * 0.8

    // Eğer deversedPrice, %80'in altına düşmüşse
    if (deversedPrice >= threshold) {
      const notification = new Notification({
        userId: userId,
        projectId: project._id,
        message: `Projeniz ${name}'nin avansının %80'inden fazlası tamamladı.`,
        description: `Projenizin avans miktarı:${advance}, Tamamlanan tutar: ${deversedPrice} `,
        notifyAt: Date.now(), // Bildirimin gönderileceği tarih
      })

      await notification.save()
    } else {
      console.log('Bildirim atılmadı.')
      return
    }
  } else {
    console.log('Bildirim atılmadı.')
    return
  }
}

module.exports = {
  completedPercent,
}
