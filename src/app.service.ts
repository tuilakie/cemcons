import { HttpException, Injectable } from '@nestjs/common';
import { GovReportReq, GovReportRes } from './dto/gov-report.dto';
import { HttpService } from '@nestjs/axios';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getGOVreport(req: GovReportReq): Promise<GovReportRes> {
    const { username, password } = req;
    if (
      username !== this.configService.get('GOV_USERNAME') ||
      password !== this.configService.get('GOV_PASSWORD')
    ) {
      throw new HttpException('Sai tên đăng nhập hoặc mật khẩu', 401);
    }
    try {
      const soNguoiBanMoi = +this.configService.get('SO_NGUOI_BAN_MOI');
      const soNguoiBan = 1 + soNguoiBanMoi;
      const tongSoSanPham = await this.httpService
        .get('/wp-json/wc/v3/reports/products/totals')
        .toPromise()
        .then((res) => _.reduce(res.data, (sum, n) => sum + n?.total, 0));
      const soSanPhamMoi = +this.configService.get('SO_SAN_PHAM_MOI');
      const soLuongGiaoDich = await this.httpService
        .get('/wp-json/wc/v3/reports/orders/totals')
        .toPromise()
        .then((res) => _.reduce(res.data, (sum, n) => sum + n?.total, 0));
      const tongSoDonHangThanhCong = await this.httpService
        .get('/wp-json/wc/v3/reports/orders/totals')
        .toPromise()
        .then((res) => _.find(res.data, { slug: 'completed' })?.total);
      const tongSoDonHangKhongThanhCong =
        (await this.httpService
          .get('/wp-json/wc/v3/reports/orders/totals')
          .toPromise()
          .then((res) => _.reduce(res.data, (sum, n) => sum + n?.total, 0))) -
        tongSoDonHangThanhCong;
      const date_min = this.configService.get('GOV_DATE_MIN');
      const date_max = new Date().toISOString().split('T')[0];
      const tongGiaTriGiaoDich = +(await this.httpService
        .get(
          `https://cemcons.vn/wp-json/wc/v3/reports/sales?date_min=${date_min}&date_max=${date_max}`,
        )
        .toPromise()
        .then((res) => res.data[0]?.total_sales));

      return {
        soLuongTruyCap: +this.configService.get('SO_LUONG_TRUY_CAP'),
        soNguoiBan,
        soNguoiBanMoi,
        tongSoSanPham,
        soSanPhamMoi,
        soLuongGiaoDich,
        tongSoDonHangThanhCong,
        tongSoDonHangKhongThanhCong,
        tongGiaTriGiaoDich,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
