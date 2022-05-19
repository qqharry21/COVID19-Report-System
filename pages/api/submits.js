/** @format */

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
        sum: patients?.length + (accompany?.length || 0),
        // patients: patients || [],
        // accompany: accompany || [],
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

      console.log('data', data);

      const params = Object.entries(data)
        .map(([key, value]) => {
          if (key === 'patients' || key === 'accompany') {
          } else {
            return `${key}=${value}`;
          }
        })
        .join('&');

      // 總表
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzlCxBi5kVlvqHDrbVVCnLIet9fw3Owpc5_oCryOjMAdwIy2ELwdE4kwtL7HUcORhFATQ/exec`,
        {
          method: 'POST',
          body: req.body,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          followAllRedirects: true,
        }
      );
      // console.log('response', response);

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
