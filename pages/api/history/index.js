// import dbConnect from '../../../utils/dbConnect';
import History from '../../../models/History';

export default async function handler(req, res) {
  const { method } = req;

  // TODO: MONGO_URL unfound error

  // await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const history = await History.find({});
        /* find all the data DB */
        res.status(200).json({ success: true, data: history });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
