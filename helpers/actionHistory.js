const makeActionHistory = async (schema, objectId, actionType, userId) => {
    let error
    try {
        const QuestionsResult = await schema.findOneAndUpdate({ _id: objectId }, {
            $push: {
                actions: {
                    userId,
                    type: actionType,
                    time: Date.now()
                },
            },
        }, { upsert: true, new: true })

        if (QuestionsResult === null || QuestionsResult.length === 0) {
            error = {
                errorCode: 2000,
            }
        }
    } catch (err) {
        console.log(error)
        error = {
            errorCode: 9000,
        }
    }
    return { error }
}


module.exports = {
    makeActionHistory
}