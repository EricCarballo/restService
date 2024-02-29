import { Module } from '@nestjs/common';
import { AutosService } from './autos.service';
import { AutosController } from './autos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auto, AutoSchema } from './entities/auto.entity';

@Module({
  controllers: [AutosController],
  providers: [AutosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Auto.name,
        schema: AutoSchema,
      }
    ])
  ]
})
export class AutosModule {}
