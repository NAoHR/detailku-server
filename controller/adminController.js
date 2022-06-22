const Admin = require("../model/Admin.model");
const Jobvacancy = require("../model/Job.model");
const {errorHandler} = require("../utils/utils");

// ==================== ADD - BEGIN ==================== \\
exports.addJob = async (req,res) => {
    try{

        const {
            title,description,reqruiter,
            region,category,salary,more
        } = req.body;

        const jobDetail = new Jobvacancy({
            title : title,
            description : description,
            reqruiter : reqruiter,
            region : region,
            category : category,
            salary : {
                from : salary.from,
                to : salary.to
            },
            more : more
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
        const {jobId} = req.params
        const {
            title,description,reqruiter,
            region,category,salary,more
        } = req.body;
        const findJob = await Jobvacancy.findOne({ _id : jobId});
        if(findJob){
            const updateJob = await Jobvacancy.updateOne({
                _id : jobId
            },
            {
                title : title,
                description : description,
                reqruiter : reqruiter,
                region :region,
                category : category,
                salary : {
                    from : salary.from,
                    to : salary.to
                },
                more : more
            },{
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