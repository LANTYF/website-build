import { Module, forwardRef } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { DbModule } from '@libs/db';
import { AppService } from '../app.service';

@Module({
  imports: [DbModule],
  controllers: [EpisodesController],
  providers: [AppService]
})
export class EpisodesModule {}
