const path = require('path');
import fileUtil from '../utils/fileUtil';

export default async (req, res, next) => {
  const { data } = req.body;
  const unx = new Date().getTime();
  const catchPath = path.join(
    path.resolve(
      './src/catch/email',
      `1500690094@qq.com.txt`
    )
  );
  const EmeialFile = new fileUtil(catchPath)
}
