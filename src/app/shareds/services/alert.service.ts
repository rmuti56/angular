import { Injectable } from '@angular/core';
declare let $;
declare let Swal;
@Injectable()
export class AlertService {

  // แจ้งเตือนระบบ Default function
  notify(message: string, type: string = 'warning') {
    $.notify({
      // options

      title: 'แจ้งเตือนจากระบบ',
      message: message,

    }, {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
          from: "top",
          align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  // แจ้งเตือนข้อผิดพลาด
  someting_wrong(message: string = 'ข้อมูลบางอย่างไม่ถูกต้อง กรุณาลองอีกครั้ง') {
    this.notify(message);
  }

  // แจ้งเตือนยืนยัน
  confirm(message: string = 'คุณต้องการทำรายการต่อไปหรือไม่'): Promise<any> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    return swalWithBootstrapButtons.fire({
      title: 'คำยืนยัน',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยน!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'ข้อมูลถูกลบเรียบร้อย.',
          'success'
        )
        return true
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'การลบข้อมูลถูกยกเลิก',
          'error'
        )
      }
    })
  }
}