
//TO DO

exports.submit_metadata = async (req,res,next) => {
    console.log('submit_metadata')
    console.log(req.body)
    res.status(200).json({message: 'metadata submitted'})
}