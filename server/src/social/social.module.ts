import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          baseURL: configService.get('baseUrl'),
          headers: new AxiosHeaders({
              "authkey": configService.get('apiKey')
          })
      }),
      inject: [ConfigService]
  }),
  ],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
