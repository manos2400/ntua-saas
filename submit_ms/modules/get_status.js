
//TO DO 

exports.get_status = async (req,res,next) => {
    console.log('get_status')
    res.status(200).json({message: 'status'})
}
