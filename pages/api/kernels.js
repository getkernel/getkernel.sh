import { fetchIndex } from '../../utils';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const results = await fetchIndex();
      res.status(200).json(results);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};