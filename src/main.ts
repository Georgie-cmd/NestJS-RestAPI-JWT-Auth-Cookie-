import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const PORT = process.env.PORT || 2019

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  await app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
  });
}
bootstrap();
