import {
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  HttpException
} from '@nestjs/common';
import { Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs';
import { Observable } from 'rxjs';
import {Connection, DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const queryRunner: QueryRunner = await this.dbInit();

    req.queryRunnerManager = queryRunner.manager;

    return next.handle().pipe(
      catchError(async (e) => {
        console.log(e)
        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        if (e instanceof HttpException) {
          throw new HttpException(e.message, e.getStatus());
        } else {
          throw new InternalServerErrorException(e.message);
        }
      }),
      tap(async () => {
        await queryRunner.commitTransaction();
        await queryRunner.release();
      }),
    );
  }

  private async dbInit(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    return queryRunner;
  }
}