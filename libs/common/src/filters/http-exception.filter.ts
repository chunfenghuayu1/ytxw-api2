import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()

        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const status = exception.getStatus()
        const exceptionRes: any = exception.getResponse()
        const { error, message } = exceptionRes
        let msg = message
        if (Array.isArray(message)) {
            msg = message.join(',')
        }

        response.status(status).json({
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error,
            data: { message: msg }
        })
    }
}
