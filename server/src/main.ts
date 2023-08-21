import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api', { exclude: [{ path: 'health', method: RequestMethod.GET }] });
  app.enableCors();
  app.use('/image', createProxyMiddleware({
    changeOrigin: true,
    pathRewrite: (path) => path.replace('/image/', ''),
    router: (req) => new URL(req.path.replace('/image/', '')).origin,
  }));
  await app.listen(3000);
}
bootstrap();
