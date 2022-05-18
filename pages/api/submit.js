/** @format */

import { compareObject } from '../../utils/CommonUtils';
import { initialAddValues } from '../../utils/data';

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
    try {
      const {
        reportId,
        method,
        category,
        date,
        time,
        address,
        patients,
        accompany,
        car,
        hospital,
        emergency,
        member,
        caption,
        time1,
        time2,
        time3,
        time4,
        time5,
        time6,
      } = req.body;

      const data = {
        reportId: reportId,
        date: date,
        time: time,
        method: method,
        category: category,
        car: car,
        member: member,
        caption: caption,
        sum: patients?.length + accompany?.length,
        patients: patients,
        accompany: accompany,
        address: address,
        caption: caption,
        hospital: hospital,
        emergency: emergency,
        status: 0, //在送來後端之前要做判斷
        time1: time1,
        time2: time2,
        time3: time3,
        time4: time4,
        time5: time5,
        time6: time6,
      };

      const params = Object.entries(body)
        .map(([key, value]) => {
          if (key === 'patients' || key === 'accompany') {
          } else {
            return `${key}=${value}`;
          }
        })
        .join('&');

      // 總表
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwsRq03JhgfqPpi2lE1Fte0FUDF_OHgbqDKv0zs80uF8qg3rxQ765Vd_EXpxmV4YYje_g/exec`,
        {
          method: 'POST',
          body: data,
          followAllRedirects: true,
        }
      );
      console.log('response', response);

      // 患者資料

      return res.status(200).json({
        status: 'success',
        message: '提交成功',
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}
