import emailTpl from '../../status/emailTpl';
import resUtil from '../../utils/resUtil'

export default async (req, res, next) => {
 res.status(200).send(resUtil(0, emailTpl))
}