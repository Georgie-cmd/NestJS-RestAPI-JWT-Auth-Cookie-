import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from './pipes/validation.pipe';


async function bootstrap() {
  const PORT = process.env.PORT || 2019

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', `Server has been started on port: ${PORT}`)
  });
}
bootstrap();
