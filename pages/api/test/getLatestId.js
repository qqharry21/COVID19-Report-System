/** @format */
import axios from '../../lib/config/axios';

/**
 *
 * @param {*} req
 * @param {*} res
 * @description Get the latest id from google sheet
 * @returns
 */

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    const data = await axios
      .get(
        `https://script.google.com/macros/s/AKfycbzxxO7AeMXZBj10yXY4IfZRbCtUac48VXFP82co5qzpyPc2AOidn4hgn6lG60Ay2ded/exec`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then(res => res.data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
