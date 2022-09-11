const Admin = require("../model/Admin.model");
const Jobvacancy = require("../model/Job.model");
const {errorHandler} = require("../utils/utils");

// ==================== ADD - BEGIN ==================== \\
exports.addJob = async (req,res) => {
    try{
        const {body} = req;
        const jobDetail = new Jobvacancy({
            ...body
        })
        await jobDetail.save();
        return res.status(200).json({
            ok : true,
            message : "data added",
            data :jobDetail
        })
    }catch(e){
        return errorHandler(e,res);
    }
}

// ==================== ADD - END ==================== \\


// ==================== ADD - BEGIN ==================== \\

exports.editJob = async (req,res) => {
    try {
        const {jobId} = req.params;
        const {body} = req;

        const findJob = await Jobvacancy.findOne({ _id : jobId});
        if(findJob){
            const updateJob = await Jobvacancy.updateOne({
                _id : jobId
            },
            body
            ,{
                runValidators : true
            })
            console.log(updateJob);
            if(updateJob.modifiedCount || updateJob.upsertedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }
        throw({name : "DNF"});

    } catch (e) {
        return errorHandler(e,res);
    }
}

// ==================== ADD - END ==================== \\