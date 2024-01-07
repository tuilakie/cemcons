import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GovReportReq {
  @ApiProperty({ required: true, description: 'Tên đăng nhập' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;
  @ApiProperty({ required: true, description: 'Mật khẩu' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}

export class GovReportRes {
  soLuongTruyCap: number;
  soNguoiBan: number;
  soNguoiBanMoi: number;
  tongSoSanPham: number;
  soSanPhamMoi: number;
  soLuongGiaoDich: number;
  tongSoDonHangThanhCong: number;
  tongSoDonHangKhongThanhCong: number;
  tongGiaTriGiaoDich: number;
}
