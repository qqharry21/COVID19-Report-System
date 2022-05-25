/** @format */

import axios from 'axios';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only for POST requests' });
  }

  try {
    const { deleteList } = req.body;
    console.log('deleteList', deleteList);

    for (let i = 0; i < deleteList.length; i++) {
      let res = await axios.get(
        `https://script.google.com/macros/s/AKfycbwnSCZkYQzHAdnbuRw5-rsQMRi4I6ZF-ArAn1r0819wDzEL4IrcmM-fHiKAxiERmhh9HQ/exec?reportId=${deleteList[i]}`
      );

      console.log('delete', res);
    }
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
