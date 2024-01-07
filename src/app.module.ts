import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: 'https://cemcons.vn',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
        maxRedirects: 5,
        auth: {
          username: 'ck_058fc5d74380e629ba973aadf3b0e56b2ed47d8d',
          password: 'cs_f1444efab5ffa29a08e8f30273c2d847ed3079b3',
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
