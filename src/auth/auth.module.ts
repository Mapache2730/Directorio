import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';

import * as fs from 'fs';
import * as path from 'path';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({

      privateKey: fs.readFileSync(
        path.join(
          process.cwd(),
          'src/auth/keys/private.pem',
        ),
        'utf8',
      ),

      publicKey: fs.readFileSync(
        path.join(
          process.cwd(),
          'src/auth/keys/public.pem',
        ),
        'utf8',
      ),

      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1d',
      },

    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],

  exports: [JwtModule],

})
export class AuthModule {}