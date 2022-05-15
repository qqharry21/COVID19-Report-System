/** @format */

// const { connectToDatabase } = require('../../lib/mongodb');
// const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  //request方式
  switch (req.method) {
    case 'POST': {
      return postForm(req, res);
    }
  }

  async function postForm(req, res) {
    // try {
    //   const data = req.body;
    //   let { db } = await connectToDatabase();
    //   await db.collection('forms').insertOne(data);
    //   return res.json({
    //     message: 'Form posted successfully',
    //     success: true,
    //   });
    // } catch (error) {
    //   return res.json({
    //     message: new Error(error).message,
    //     success: false,
    //   });
    // }
  }
}
