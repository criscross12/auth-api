import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';  // Asegúrate de que este es tu esquema de usuario

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(userEmail: string, password: string): Promise<{ access_token: string }> {
    // 1. Buscar al usuario por email
    const user = await this.userModel.findOne({ email: userEmail });
    if (!user) {
      throw new Error('Invalid credentials'); // Manejo de error si el usuario no existe
    }

    // 2. Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials'); // Error si la contraseña no coincide
    }

    // 3. Generar el token JWT
    const payload = { username: user.email, sub: user._id, roles: user.role };  // Puedes incluir los roles u otros datos si es necesario
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
