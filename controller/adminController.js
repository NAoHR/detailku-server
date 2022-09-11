const Admin = require("../model/Admin.model");
const Jobvacancy = require("../model/Job.model");
const Pkl = require("../model/Pkl.model");
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

exports.addPkl = async (req, res) => {
    try{
        const {body} = req;
        const pkl = new Pkl(body);

        await pkl.save();
        return res.status(200).json({
            ok: true,
            message: "data added",
            data: pkl
        })
    }catch(e){
        return errorHandler(e, res);
    }
}
// ==================== ADD - END ==================== \\


// ==================== ADD - BEGIN ==================== \\

exports.editJob = async (req,res) => {
    try {
        const {jobId} = req.params;
        const {body} = req;
        const updateJob = await Jobvacancy.updateOne({
            _id : jobId
        },
        body
        ,{
            runValidators : true
        })
        
        if(updateJob.matchedCount !== 0){
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

exports.editPkl = async(req, res) => {
    const {pklId} = req.params;
    const {body} = req;

    try{
        const updatePkl = await Pkl.updateOne({
            _id: pklId
        },
        body
        ,{
            runValidators: true
        })
        
        if(updatePkl.matchedCount !== 0){
            if(updatePkl.modifiedCount || updatePkl.upsertedCount){
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

    }catch(e){
        return errorHandler(e, res);
    }
}
// ==================== ADD - END ==================== \\