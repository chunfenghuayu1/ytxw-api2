import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Data<T> {
    data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(
            map(data => {
                return {
                    code: 200,
                    data,
                    message: '操作成功'
                }
            })
        )
    }
}
