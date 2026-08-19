import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";

import General_Modules from "./modules/index";
@Module({
  imports: [
    //! 1. ConfigModule MUST be first
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    //! 2. Use forRootAsync to inject ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<"postgres">("database.postgres.type"),
        host: configService.get<string>("database.postgres.host"),
        port: configService.get<number>("database.postgres.port"),
        username: configService.get<string>("database.postgres.username"),
        password: configService.get<string>("database.postgres.password"),
        database: configService.get<string>("database.postgres.database"),
        synchronize: configService.get<boolean>(
          "database.postgres.synchronize",
        ),

        //! 3. This automatically loads all entities registered via
        //! TypeOrmModule.forFeature() in your User and Todos modules
        autoLoadEntities: true,
      }),
    }),

    ...General_Modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
