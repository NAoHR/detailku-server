const Admin = require("../model/Admin.model");
const Jobvacancy = require("../model/Job.model");

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
        console.log(e);
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