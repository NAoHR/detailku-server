const Admin = require("../model/Admin.model");
const Jobvacancy = require("../model/Job.model");

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
        let errorDetail;
        console.log(e.name);

        switch(e.name){
            case "ValidationError":
                errorDetail = {
                    ok : false,
                    scode : 400,
                    message : e.message
                }
                break
            default:
                errorDetail = {
                    ok : false,
                    scode : 501,
                    message : "internal error"
                }
                break
        }

        return res.status(errorDetail.scode).json({
            ok : errorDetail.ok,
            message : errorDetail.message
        })
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
                runValidators : true,
                upsert : true
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
        return res.status(401).json({
            ok : false,
            message : "job not found"
        })

    } catch (e) {
        console.log(e);

        let errorDetail;
        switch(e.name){
            case "ValidationError":
                errorDetail = {
                    ok : false,
                    scode : 400,
                    message : e.message
                }
                break
            case "CastError":
                errorDetail = {
                    ok : false,
                    scode : 400,
                    message : "format not valid"
                }
                break
            default:
                errorDetail = {
                    ok : false,
                    scode : 501,
                    message : "internal error"
                }
                break
        }

        return res.status(errorDetail.scode).json({
            ok : errorDetail.ok,
            message : errorDetail.message
        })
    }
}

// ==================== ADD - END ==================== \\