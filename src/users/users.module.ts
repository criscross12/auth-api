import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registra el modelo aquí
  ],
  providers: [UsersService],
  exports: [UsersService], // Exporta si se necesita usar en otros módulos
})
export class UsersModule {}
