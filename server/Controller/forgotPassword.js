const api_key =  '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'
const Sib =  require('sib-api-v3-sdk')

const Client = Sib.ApiClient.instance;

const apiKey = Client.authentications['api-key'];
apiKey.apiKey = api_key

exports.sendEmail = async (req,res,next)=>{
       const user = req.body.email
    try{
        const transEmailApi = new Sib.TransactionalEmailsApi()
        
        const sender = {
          email:'prajwal1majjigi@gmail.com',
          name : 'Prajwal G Majjigi'
        }

        const reciever = [
          {
            email : user
          }
        ]

       const response = await  transEmailApi.sendTransacEmail({
             sender,
             to:reciever,
             subject:'Reset Password',
             textContent:'Forgot your password please click on the below link to change password',
             htmlContent :`<h1>RESET PASSWORD   </h1>`,
             params :{
              user : 'prajwal'
             }
        })
        console.log(response)

    }
    catch(error){

      console.log(error)

    }
}