import { Injectable } from "@angular/core";

@Injectable()
export class SharedsService {

  //ตำแหน่งของสมาชิก
  positionItem: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ]

  // แปลงรูปภาพเป็น Base64
  onConvertImage(input: HTMLInputElement) {
    return new Promise((resolve, reject) => {
      const imageType = ['image/jpeg', 'image/png'];
      const imageSize = 500;
      // หากไม่มีการอัพโหลดภาพ
      if (input.files.length == 0)
        return resolve(null);
      //ตรวจสอบชนิดไฟล์ที่อัพโหลดเข้ามา(แต่ดักไว้ตั้งแต่ html แล้วเขียนอีกเฉยๆ)
      if (imageType.indexOf(input.files[0].type) < 0) {
        return reject({
          Message: 'กรุณาอัพโหลดรูปภาพเท่านั้น'
        });
      }
      //ตรวจสอบขนาดภาพ
      if ((input.files[0].size / 1024) > imageSize) {
        return reject({
          Message: 'ขนาดรูปภาพใหญ่กว่าขนาดที่กำหนด(500KB)'
        })
      }
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      //คืนค่า base64 ออกไป
      reader.addEventListener('load', () => {
        resolve(reader.result);
      })
    })

  }
}