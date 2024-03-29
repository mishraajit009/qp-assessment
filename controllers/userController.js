// Controller logic for API routes
const jwt = require('jsonwebtoken');
const usersModal = require('../modal/users');
//console.log("Consoling env",process.env.JSONTOKEN_SECRET_KEY)
// const secretKey = process.env.JSONTOKEN_SECRET_KEY;
const secretKey ='secret';
exports.listItem = async(req, res) => {
    const list_items = await usersModal.listItems();
    res.send({ products: list_items });
};

exports.bookItems = async (req, res) => {
    try {
      const { userId, items } = req.body;
  
      // Call the modal function to book items
      const invoiceNumber = await usersModal.bookItems(userId, items);
      if(typeof invoiceNumber !== "string"){
        return res.json({ success: true,message: 'Failed to Book' ,error: invoiceNumber });
      }
      return res.json({ success: true, message: 'Items booked successfully', invoiceNumber });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};
exports.login = async (req,res)=>{
    const { username, password } = req.body;

    //const user = users.find((u) => u.username === username && u.password === password);
    const user_detail =await usersModal.login(username,password)
    if (!user_detail) {
        return res.status(401).send('Invalid username or password.');
    }

    const token = jwt.sign({ username: user_detail[0].userId, role: user_detail[0].role }, secretKey);
   // res.json({ token });
    res.send({message:"Login Succesfull",token:token})
}

exports.schdeuleAppointment = async (req,res) => {
  const data = req.body;
  
}
  